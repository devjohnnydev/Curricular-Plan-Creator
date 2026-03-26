import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import {
  aulasTable,
  aulaCapacidadesTable,
  aulaConhecimentosTable,
  atividadesTable,
  createAulaSchema,
} from "@workspace/db/schema";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function getAulaComRelacoes(aulaId: number) {
  const [aula] = await db.select().from(aulasTable).where(eq(aulasTable.id, aulaId));
  if (!aula) return null;

  const [capacidades, conhecimentos, atividades] = await Promise.all([
    db.select().from(aulaCapacidadesTable).where(eq(aulaCapacidadesTable.aulaId, aulaId)),
    db.select().from(aulaConhecimentosTable).where(eq(aulaConhecimentosTable.aulaId, aulaId)),
    db.select().from(atividadesTable).where(eq(atividadesTable.aulaId, aulaId)),
  ]);

  return { ...aula, capacidades, conhecimentos, atividades };
}

// ─── GET /cronograma — Resumo de todas as UCs (para barras de progresso) ──────
router.get("/cronograma", async (_req: Request, res: Response) => {
  try {
    const aulas = await db.select().from(aulasTable);

    // Agrupar horas por ucId
    const resumo: Record<string, number> = {};
    for (const aula of aulas) {
      resumo[aula.ucId] = (resumo[aula.ucId] ?? 0) + aula.duracao;
    }

    return res.json({ resumo }); // { resumo: { logica: 240, banco: 120, ... } } (minutos)
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar resumo do cronograma", details: String(err) });
  }
});

// ─── GET /cronograma/:ucId — Lista de aulas de uma UC ─────────────────────────
router.get("/cronograma/:ucId", async (req: Request, res: Response) => {
  try {
    const ucId = req.params.ucId as string;
    const aulas = await db
      .select()
      .from(aulasTable)
      .where(eq(aulasTable.ucId, ucId));

    const aulasIds = aulas.map((a) => a.id);

    if (aulasIds.length === 0) {
      return res.json({ aulas: [] });
    }

    const [capacidades, conhecimentos, atividades] = await Promise.all([
      db.select().from(aulaCapacidadesTable).where(inArray(aulaCapacidadesTable.aulaId, aulasIds)),
      db
        .select()
        .from(aulaConhecimentosTable)
        .where(inArray(aulaConhecimentosTable.aulaId, aulasIds)),
      db.select().from(atividadesTable).where(inArray(atividadesTable.aulaId, aulasIds)),
    ]);

    const aulasCompletas = aulas.map((aula) => ({
      ...aula,
      capacidades: capacidades.filter((c) => c.aulaId === aula.id),
      conhecimentos: conhecimentos.filter((c) => c.aulaId === aula.id),
      atividades: atividades.filter((a) => a.aulaId === aula.id),
    }));

    // Ordenar por data
    aulasCompletas.sort((a, b) => a.data.localeCompare(b.data));

    return res.json({ aulas: aulasCompletas });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar aulas", details: String(err) });
  }
});

// ─── POST /cronograma/:ucId/aulas — Criar nova aula ──────────────────────────
router.post("/cronograma/:ucId/aulas", async (req: Request, res: Response) => {
  try {
    const ucId = req.params.ucId as string;
    const parsed = createAulaSchema.safeParse({ ...req.body, ucId });

    if (!parsed.success) {
      return res.status(400).json({ error: "Dados inválidos", details: parsed.error.flatten() });
    }

    const { data, duracao, observacoes, capacidades, conhecimentoIdxs, atividades } = parsed.data;

    // Criar aula
    const [novaAula] = await db
      .insert(aulasTable)
      .values({ ucId, data, duracao, observacoes })
      .returning();

    // Inserir relações em paralelo
    await Promise.all([
      capacidades.length > 0
        ? db.insert(aulaCapacidadesTable).values(
            capacidades.map((c) => ({ aulaId: novaAula.id, tipo: c.tipo, capacidadeId: c.capacidadeId }))
          )
        : Promise.resolve(),
      conhecimentoIdxs.length > 0
        ? db.insert(aulaConhecimentosTable).values(
            conhecimentoIdxs.map((idx) => ({ aulaId: novaAula.id, conhecimentoIdx: idx }))
          )
        : Promise.resolve(),
      atividades.length > 0
        ? db.insert(atividadesTable).values(
            atividades.map((a) => ({
              aulaId: novaAula.id,
              titulo: a.titulo,
              descricao: a.descricao,
              tipo: a.tipo ?? "exercicio",
            }))
          )
        : Promise.resolve(),
    ]);

    const aulaCompleta = await getAulaComRelacoes(novaAula.id);
    return res.status(201).json(aulaCompleta);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao criar aula", details: String(err) });
  }
});

// ─── PUT /cronograma/aulas/:aulaId — Atualizar aula ──────────────────────────
router.put("/cronograma/aulas/:aulaId", async (req: Request, res: Response) => {
  try {
    const aulaId = Number(req.params.aulaId);
    if (isNaN(aulaId)) return res.status(400).json({ error: "ID inválido" });

    const updateSchema = z.object({
      data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      duracao: z.number().int().min(1).optional(),
      observacoes: z.string().nullable().optional(),
      capacidades: z
        .array(z.object({ tipo: z.enum(["basica", "tecnica", "socioemocional"]), capacidadeId: z.number().int() }))
        .optional(),
      conhecimentoIdxs: z.array(z.number().int().min(0)).optional(),
      atividades: z
        .array(z.object({ titulo: z.string().min(1), descricao: z.string().optional(), tipo: z.string().optional() }))
        .optional(),
    });

    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Dados inválidos", details: parsed.error.flatten() });

    const { data, duracao, observacoes, capacidades, conhecimentoIdxs, atividades } = parsed.data;

    // Atualizar campos da aula
    const fieldsToUpdate: Record<string, unknown> = { updatedAt: new Date() };
    if (data !== undefined) fieldsToUpdate.data = data;
    if (duracao !== undefined) fieldsToUpdate.duracao = duracao;
    if (observacoes !== undefined) fieldsToUpdate.observacoes = observacoes;

    await db.update(aulasTable).set(fieldsToUpdate).where(eq(aulasTable.id, aulaId));

    // Remover e reinserir relações quando fornecidas
    if (capacidades !== undefined) {
      await db.delete(aulaCapacidadesTable).where(eq(aulaCapacidadesTable.aulaId, aulaId));
      if (capacidades.length > 0)
        await db.insert(aulaCapacidadesTable).values(capacidades.map((c) => ({ aulaId, ...c })));
    }

    if (conhecimentoIdxs !== undefined) {
      await db.delete(aulaConhecimentosTable).where(eq(aulaConhecimentosTable.aulaId, aulaId));
      if (conhecimentoIdxs.length > 0)
        await db
          .insert(aulaConhecimentosTable)
          .values(conhecimentoIdxs.map((idx) => ({ aulaId, conhecimentoIdx: idx })));
    }

    if (atividades !== undefined) {
      await db.delete(atividadesTable).where(eq(atividadesTable.aulaId, aulaId));
      if (atividades.length > 0)
        await db.insert(atividadesTable).values(
          atividades.map((a) => ({ aulaId, titulo: a.titulo, descricao: a.descricao, tipo: a.tipo ?? "exercicio" }))
        );
    }

    const aulaCompleta = await getAulaComRelacoes(aulaId);
    if (!aulaCompleta) return res.status(404).json({ error: "Aula não encontrada" });

    return res.json(aulaCompleta);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao atualizar aula", details: String(err) });
  }
});

// ─── DELETE /cronograma/aulas/:aulaId — Remover aula ─────────────────────────
router.delete("/cronograma/aulas/:aulaId", async (req: Request, res: Response) => {
  try {
    const aulaId = Number(req.params.aulaId);
    if (isNaN(aulaId)) return res.status(400).json({ error: "ID inválido" });

    // ON DELETE CASCADE cuida das relações automaticamente
    const deleted = await db.delete(aulasTable).where(eq(aulasTable.id, aulaId)).returning();
    if (deleted.length === 0) return res.status(404).json({ error: "Aula não encontrada" });

    return res.json({ success: true, id: aulaId });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao excluir aula", details: String(err) });
  }
});

export default router;
