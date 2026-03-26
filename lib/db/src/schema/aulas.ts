import { pgTable, serial, varchar, integer, text, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ─── Tabela principal: aulas planejadas por UC ────────────────────────────────
export const aulasTable = pgTable("aulas", {
  id: serial("id").primaryKey(),
  ucId: varchar("uc_id", { length: 50 }).notNull(),
  data: date("data").notNull(),
  duracao: integer("duracao").notNull(), // em minutos (ex: 120 = 2h)
  observacoes: text("observacoes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Capacidades trabalhadas na aula ─────────────────────────────────────────
export const aulaCapacidadesTable = pgTable("aula_capacidades", {
  id: serial("id").primaryKey(),
  aulaId: integer("aula_id")
    .notNull()
    .references(() => aulasTable.id, { onDelete: "cascade" }),
  tipo: varchar("tipo", { length: 20 }).notNull(), // "basica" | "tecnica" | "socioemocional"
  capacidadeId: integer("capacidade_id").notNull(),
});

// ─── Conhecimentos abordados na aula ─────────────────────────────────────────
export const aulaConhecimentosTable = pgTable("aula_conhecimentos", {
  id: serial("id").primaryKey(),
  aulaId: integer("aula_id")
    .notNull()
    .references(() => aulasTable.id, { onDelete: "cascade" }),
  conhecimentoIdx: integer("conhecimento_idx").notNull(),
});

// ─── Atividades manuais da aula ───────────────────────────────────────────────
export const atividadesTable = pgTable("atividades", {
  id: serial("id").primaryKey(),
  aulaId: integer("aula_id")
    .notNull()
    .references(() => aulasTable.id, { onDelete: "cascade" }),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descricao: text("descricao"),
  tipo: varchar("tipo", { length: 50 }).default("exercicio"),
});

// ─── Schemas Zod (insert / select) ───────────────────────────────────────────
export const insertAulaSchema = createInsertSchema(aulasTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectAulaSchema = createSelectSchema(aulasTable);

export const insertAtividadeSchema = createInsertSchema(atividadesTable).omit({ id: true });
export const selectAtividadeSchema = createSelectSchema(atividadesTable);

// ─── Schema composto para criar aula com relações ─────────────────────────────
export const createAulaSchema = z.object({
  ucId: z.string().min(1),
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (YYYY-MM-DD)"),
  duracao: z.number().int().min(1, "Duração mínima de 1 minuto"),
  observacoes: z.string().optional(),
  capacidades: z
    .array(
      z.object({
        tipo: z.enum(["basica", "tecnica", "socioemocional"]),
        capacidadeId: z.number().int().min(1),
      })
    )
    .default([]),
  conhecimentoIdxs: z.array(z.number().int().min(0)).default([]),
  atividades: z
    .array(
      z.object({
        titulo: z.string().min(1),
        descricao: z.string().optional(),
        tipo: z.string().optional(),
      })
    )
    .default([]),
});

// ─── Tipos TypeScript inferidos ───────────────────────────────────────────────
export type Aula = typeof aulasTable.$inferSelect;
export type InsertAula = typeof aulasTable.$inferInsert;
export type AulaCapacidade = typeof aulaCapacidadesTable.$inferSelect;
export type AulaConhecimento = typeof aulaConhecimentosTable.$inferSelect;
export type Atividade = typeof atividadesTable.$inferSelect;
export type InsertAtividade = typeof atividadesTable.$inferInsert;
export type CreateAulaInput = z.infer<typeof createAulaSchema>;
