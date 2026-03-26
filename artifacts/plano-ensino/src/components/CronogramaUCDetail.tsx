import { useState, useEffect, useCallback } from "react";
import { type UnidadeCurricular } from "../data/planoEnsino";
import { ProgressBar } from "./ProgressBar";

const API_BASE = "/api";

// ─── Tipos locais ─────────────────────────────────────────────────────────────

interface CapacidadeRef {
  tipo: "basica" | "tecnica" | "socioemocional";
  capacidadeId: number;
}

interface Atividade {
  titulo: string;
  descricao?: string;
  tipo?: string;
}

interface AulaCompleta {
  id: number;
  ucId: string;
  data: string;
  duracao: number; // minutos
  observacoes?: string | null;
  capacidades: { id: number; aulaId: number; tipo: string; capacidadeId: number }[];
  conhecimentos: { id: number; aulaId: number; conhecimentoIdx: number }[];
  atividades: { id: number; aulaId: number; titulo: string; descricao?: string | null; tipo?: string | null }[];
}

interface CronogramaUCDetailProps {
  uc: UnidadeCurricular;
  onBack: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function minutesToHM(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (min === 0) return `${h}h`;
  return `${h}h${min}min`;
}

function formatDate(dateStr: string): string {
  const [y, mo, d] = dateStr.split("-");
  return `${d}/${mo}/${y}`;
}

const TIPOS_ATIVIDADE = ["exercicio", "prova", "projeto", "seminario", "trabalho", "outro"];

// ─── Formulário de nova aula ──────────────────────────────────────────────────

function FormAula({
  uc,
  onSave,
  onCancel,
  initial,
}: {
  uc: UnidadeCurricular;
  onSave: (data: {
    data: string;
    duracao: number;
    observacoes?: string;
    capacidades: CapacidadeRef[];
    conhecimentoIdxs: number[];
    atividades: Atividade[];
  }) => void;
  onCancel: () => void;
  initial?: AulaCompleta | null;
}) {
  const capacidades = [
    ...(uc.capacidadesBasicas ?? []).map((c) => ({ ...c, tipo: "basica" as const })),
    ...(uc.capacidadesTecnicas ?? []).map((c) => ({ ...c, tipo: "tecnica" as const })),
    ...(uc.capacidadesSocioemocionais ?? []).map((c) => ({ ...c, tipo: "socioemocional" as const })),
  ];

  const [data, setData] = useState(initial?.data ?? new Date().toISOString().split("T")[0]);
  const [horas, setHoras] = useState(initial ? Math.floor(initial.duracao / 60) : 2);
  const [minutos, setMinutos] = useState(initial ? initial.duracao % 60 : 0);
  const [observacoes, setObservacoes] = useState(initial?.observacoes ?? "");
  const [capSelecionadas, setCapSelecionadas] = useState<Set<string>>(
    new Set(initial?.capacidades.map((c) => `${c.tipo}:${c.capacidadeId}`) ?? [])
  );
  const [conhecSelecionados, setConhecSelecionados] = useState<Set<number>>(
    new Set(initial?.conhecimentos.map((c) => c.conhecimentoIdx) ?? [])
  );
  const [atividades, setAtividades] = useState<Atividade[]>(
    initial?.atividades.map((a) => ({ titulo: a.titulo, descricao: a.descricao ?? "", tipo: a.tipo ?? "exercicio" })) ?? []
  );
  const [novaAtividade, setNovaAtividade] = useState({ titulo: "", descricao: "", tipo: "exercicio" });

  function toggleCap(tipo: string, id: number) {
    const key = `${tipo}:${id}`;
    setCapSelecionadas((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function toggleConhec(idx: number) {
    setConhecSelecionados((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  function addAtividade() {
    if (!novaAtividade.titulo.trim()) return;
    setAtividades((prev) => [...prev, { ...novaAtividade }]);
    setNovaAtividade({ titulo: "", descricao: "", tipo: "exercicio" });
  }

  function removeAtividade(idx: number) {
    setAtividades((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const caps: CapacidadeRef[] = [];
    capSelecionadas.forEach((key) => {
      const [tipo, idStr] = key.split(":");
      caps.push({ tipo: tipo as CapacidadeRef["tipo"], capacidadeId: Number(idStr) });
    });

    onSave({
      data,
      duracao: horas * 60 + minutos,
      observacoes: observacoes || undefined,
      capacidades: caps,
      conhecimentoIdxs: [...conhecSelecionados],
      atividades,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Data e Duração */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Data da Aula</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Duração</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                min={0}
                max={12}
                value={horas}
                onChange={(e) => setHoras(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Horas"
              />
              <span className="text-xs text-gray-400 mt-0.5 block text-center">horas</span>
            </div>
            <div className="flex-1">
              <select
                value={minutos}
                onChange={(e) => setMinutos(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>00 min</option>
                <option value={30}>30 min</option>
              </select>
              <span className="text-xs text-gray-400 mt-0.5 block text-center">minutos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Capacidades */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">
          Capacidades trabalhadas nesta aula
          <span className="text-gray-400 font-normal ml-1">({capSelecionadas.size} selecionadas)</span>
        </p>
        <div className="max-h-48 overflow-y-auto space-y-1 border border-gray-100 rounded-lg p-2">
          {capacidades.map((cap) => {
            const key = `${cap.tipo}:${cap.id}`;
            const isChecked = capSelecionadas.has(key);
            const bgColor =
              cap.tipo === "socioemocional" ? "bg-purple-50" : cap.tipo === "tecnica" ? "bg-green-50" : "bg-blue-50";
            return (
              <label
                key={key}
                className={`flex items-start gap-2 p-2 rounded-md cursor-pointer transition-colors ${isChecked ? bgColor : "hover:bg-gray-50"}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCap(cap.tipo, cap.id)}
                  className="mt-0.5 shrink-0"
                />
                <span className="text-xs text-gray-700 leading-relaxed">
                  <span className="font-medium mr-1">{cap.id}.</span>
                  {cap.descricao}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Conhecimentos */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">
          Conhecimentos abordados
          <span className="text-gray-400 font-normal ml-1">({conhecSelecionados.size} selecionados)</span>
        </p>
        <div className="max-h-40 overflow-y-auto space-y-1 border border-gray-100 rounded-lg p-2">
          {uc.conhecimentos.map((c, idx) => (
            <label
              key={idx}
              className={`flex items-start gap-2 p-2 rounded-md cursor-pointer transition-colors ${conhecSelecionados.has(idx) ? "bg-amber-50" : "hover:bg-gray-50"}`}
            >
              <input
                type="checkbox"
                checked={conhecSelecionados.has(idx)}
                onChange={() => toggleConhec(idx)}
                className="mt-0.5 shrink-0"
              />
              <span className="text-xs text-gray-700">{c.topico}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Atividades */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Atividades</p>

        {atividades.length > 0 && (
          <div className="space-y-1 mb-2">
            {atividades.map((a, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border border-orange-100">
                <span className="text-xs font-medium text-orange-700 px-1.5 py-0.5 bg-orange-100 rounded capitalize">
                  {a.tipo}
                </span>
                <span className="text-xs text-gray-700 flex-1">{a.titulo}</span>
                <button
                  type="button"
                  onClick={() => removeAtividade(idx)}
                  className="text-red-400 hover:text-red-600 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={novaAtividade.titulo}
              onChange={(e) => setNovaAtividade((p) => ({ ...p, titulo: e.target.value }))}
              placeholder="Nome da atividade (ex: Exercício de Lógica)"
              className="w-full px-3 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="text"
              value={novaAtividade.descricao}
              onChange={(e) => setNovaAtividade((p) => ({ ...p, descricao: e.target.value }))}
              placeholder="Descrição (opcional)"
              className="w-full px-3 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <select
              value={novaAtividade.tipo}
              onChange={(e) => setNovaAtividade((p) => ({ ...p, tipo: e.target.value }))}
              className="w-full px-3 py-1.5 rounded border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {TIPOS_ATIVIDADE.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={addAtividade}
            className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 transition-colors self-start"
          >
            + Adicionar
          </button>
        </div>
      </div>

      {/* Observações */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Observações</label>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          rows={2}
          placeholder="Notas sobre a aula, recursos utilizados..."
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Botões */}
      <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm text-white font-medium transition-colors"
          style={{ backgroundColor: "#D0011B" }}
        >
          {initial ? "Salvar alterações" : "Registrar aula"}
        </button>
      </div>
    </form>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function CronogramaUCDetail({ uc, onBack }: CronogramaUCDetailProps) {
  const [aulas, setAulas] = useState<AulaCompleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAula, setEditingAula] = useState<AulaCompleta | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAulas = useCallback(async () => {
    setLoading(true);
    const r = await fetch(`${API_BASE}/cronograma/${uc.id}`);
    const data = await r.json();
    setAulas(data.aulas ?? []);
    setLoading(false);
  }, [uc.id]);

  useEffect(() => {
    fetchAulas().catch(() => setLoading(false));
  }, [fetchAulas]);

  const totalMinutosPlanejados = aulas.reduce((a, b) => a + b.duracao, 0);
  const horasPlanejadas = Math.round(totalMinutosPlanejados / 60);

  async function handleSave(formData: {
    data: string;
    duracao: number;
    observacoes?: string;
    capacidades: CapacidadeRef[];
    conhecimentoIdxs: number[];
    atividades: Atividade[];
  }) {
    setSaving(true);
    setError(null);
    try {
      const url = editingAula
        ? `${API_BASE}/cronograma/aulas/${editingAula.id}`
        : `${API_BASE}/cronograma/${uc.id}/aulas`;
      const method = editingAula ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ucId: uc.id }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? "Erro ao salvar aula");
      } else {
        setShowForm(false);
        setEditingAula(null);
        await fetchAulas();
      }
    } catch {
      setError("Erro de conexão com o servidor");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(aulaId: number) {
    if (!confirm("Excluir esta aula?")) return;
    await fetch(`${API_BASE}/cronograma/aulas/${aulaId}`, { method: "DELETE" });
    await fetchAulas();
  }

  const tipoAtividadeCor: Record<string, string> = {
    exercicio: "#2563eb",
    prova: "#dc2626",
    projeto: "#7c3aed",
    seminario: "#d97706",
    trabalho: "#16a34a",
    outro: "#6b7280",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao Cronograma
          </button>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-lg font-bold text-gray-900">{uc.nome}</h1>
              <p className="text-xs text-gray-500">{uc.modulo} · {uc.cargaHoraria}h totais</p>
            </div>
            <button
              onClick={() => { setEditingAula(null); setShowForm(true); }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: "#D0011B" }}
            >
              + Nova Aula
            </button>
          </div>
          <div className="mt-3">
            <ProgressBar value={horasPlanejadas} total={uc.cargaHoraria} size="md" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* Erro */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Formulário */}
        {(showForm || editingAula) && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4">
              {editingAula ? "Editar Aula" : "Registrar Nova Aula"}
            </h2>
            {saving && <p className="text-sm text-gray-500 mb-3">Salvando...</p>}
            <FormAula
              uc={uc}
              initial={editingAula}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingAula(null); }}
            />
          </div>
        )}

        {/* Lista de aulas */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : aulas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-gray-500 font-medium">Nenhuma aula registrada</p>
            <p className="text-sm text-gray-400 mt-1">Clique em "+ Nova Aula" para começar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {aulas.map((aula) => (
              <div key={aula.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-800">{formatDate(aula.data)}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {minutesToHM(aula.duracao)}
                      </span>
                    </div>

                    {/* Capacidades */}
                    {aula.capacidades.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-400 mb-1">Capacidades:</p>
                        <div className="flex flex-wrap gap-1">
                          {aula.capacidades.map((c) => (
                            <span
                              key={c.id}
                              className="text-xs px-1.5 py-0.5 rounded border"
                              style={{
                                backgroundColor: c.tipo === "socioemocional" ? "#f3e8ff" : c.tipo === "tecnica" ? "#dcfce7" : "#dbeafe",
                                color: c.tipo === "socioemocional" ? "#7c3aed" : c.tipo === "tecnica" ? "#16a34a" : "#1d4ed8",
                                borderColor: c.tipo === "socioemocional" ? "#c4b5fd" : c.tipo === "tecnica" ? "#86efac" : "#93c5fd",
                              }}
                            >
                              Cap. {c.capacidadeId}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Atividades */}
                    {aula.atividades.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-400 mb-1">Atividades:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {aula.atividades.map((a) => {
                            const cor = tipoAtividadeCor[a.tipo ?? "outro"] ?? "#6b7280";
                            return (
                              <span
                                key={a.id}
                                className="text-xs px-2 py-0.5 rounded-full font-medium border"
                                style={{ backgroundColor: `${cor}18`, color: cor, borderColor: `${cor}40` }}
                              >
                                {a.titulo}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Observações */}
                    {aula.observacoes && (
                      <p className="text-xs text-gray-500 italic mt-1">{aula.observacoes}</p>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => { setEditingAula(aula); setShowForm(false); }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Editar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(aula.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Excluir"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resumo */}
        {aulas.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500">Aulas registradas</p>
                <p className="text-2xl font-bold text-gray-900">{aulas.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Horas planejadas</p>
                <p className="text-2xl font-bold text-blue-600">{horasPlanejadas}h</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Horas restantes</p>
                <p className="text-2xl font-bold text-gray-400">
                  {Math.max(0, uc.cargaHoraria - horasPlanejadas)}h
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
