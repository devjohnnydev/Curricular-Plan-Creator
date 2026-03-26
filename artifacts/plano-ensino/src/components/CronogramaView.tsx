import { useState, useEffect } from "react";
import { unidadesCurriculares, type UnidadeCurricular } from "../data/planoEnsino";
import { ProgressBar } from "./ProgressBar";

const API_BASE = "/api";

interface ResumoUC {
  ucId: string;
  minutosplanejados: number;
}

interface CronogramaViewProps {
  onSelectUC: (uc: UnidadeCurricular) => void;
}

function getSemestreLabel(s: number): string {
  return `${s}º Semestre`;
}

export function CronogramaView({ onSelectUC }: CronogramaViewProps) {
  const [resumo, setResumo] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [filtroSemestre, setFiltroSemestre] = useState<number | "todos">("todos");

  useEffect(() => {
    fetch(`${API_BASE}/cronograma`)
      .then((r) => r.json())
      .then((data) => {
        setResumo(data.resumo ?? {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Minutagem planejada em horas (arredondada)
  const minutesToHours = (m: number) => Math.round(m / 60);

  const totalGeralMinutos = Object.values(resumo).reduce((a, b) => a + b, 0);
  const totalGeralHoras = unidadesCurriculares.reduce((a, uc) => a + uc.cargaHoraria, 0);

  // Progresso por semestre
  const semestres = [1, 2, 3, 4];
  const progressoPorSemestre = semestres.map((sem) => {
    const ucsDoSem = unidadesCurriculares.filter((uc) => uc.semestres.includes(sem));
    const totalH = ucsDoSem.reduce((a, uc) => a + uc.cargaHoraria, 0);
    const planejadoH = ucsDoSem.reduce((a, uc) => a + minutesToHours(resumo[uc.id] ?? 0), 0);
    return { semestre: sem, total: totalH, planejado: planejadoH };
  });

  const ucsFiltradas = filtroSemestre === "todos"
    ? unidadesCurriculares
    : unidadesCurriculares.filter((uc) => uc.semestres.includes(filtroSemestre as number));

  const moduloCores: Record<string, string> = {
    "Módulo Básico": "#2563eb",
    "Módulo Específico I": "#16a34a",
    "Módulo Específico II": "#d97706",
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho geral */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full bg-red-600" />
          <h2 className="font-bold text-gray-900 text-lg">Progresso Geral do Curso</h2>
        </div>
        <ProgressBar
          value={minutesToHours(totalGeralMinutos)}
          total={totalGeralHoras}
          label="Total do Curso"
          size="lg"
          className="mb-4"
        />
        {/* Por semestre */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {progressoPorSemestre.map(({ semestre, total, planejado }) => (
            <div key={semestre} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-2">{getSemestreLabel(semestre)}</p>
              <ProgressBar value={planejado} total={total} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Filtros por semestre */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFiltroSemestre("todos")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            filtroSemestre === "todos"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Todos
        </button>
        {semestres.map((s) => (
          <button
            key={s}
            onClick={() => setFiltroSemestre(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              filtroSemestre === s
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {getSemestreLabel(s)}
          </button>
        ))}
      </div>

      {/* Cards das UCs */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {ucsFiltradas.map((uc) => {
            const minutosUC = resumo[uc.id] ?? 0;
            const horasPlanejadasUC = minutesToHours(minutosUC);
            const pct = Math.min(100, Math.round((horasPlanejadasUC / uc.cargaHoraria) * 100));
            const corModulo = moduloCores[uc.modulo] ?? "#6b7280";

            return (
              <button
                key={uc.id}
                onClick={() => onSelectUC(uc)}
                className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-sm leading-tight">
                      {uc.nome}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: `${corModulo}18`, color: corModulo }}
                      >
                        {uc.modulo}
                      </span>
                      <span className="text-xs text-gray-400">
                        {uc.semestres.length === 1
                          ? `${uc.semestres[0]}º sem.`
                          : `${uc.semestres[0]}º–${uc.semestres[uc.semestres.length - 1]}º sem.`}
                      </span>
                    </div>
                  </div>
                  <span
                    className="shrink-0 text-xs font-bold px-2 py-1 rounded-lg"
                    style={{
                      backgroundColor: pct >= 100 ? "#dcfce7" : pct > 0 ? "#eff6ff" : "#f3f4f6",
                      color: pct >= 100 ? "#16a34a" : pct > 0 ? "#2563eb" : "#9ca3af",
                    }}
                  >
                    {pct === 0 ? "Não iniciado" : `${pct}%`}
                  </span>
                </div>

                <ProgressBar
                  value={horasPlanejadasUC}
                  total={uc.cargaHoraria}
                  showText={true}
                  size="sm"
                  className="mt-2"
                />

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                  <span className="text-xs text-gray-400">{uc.cargaHoraria}h totais</span>
                  <span className="text-xs text-blue-600 font-medium group-hover:underline">
                    Ver cronograma →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
