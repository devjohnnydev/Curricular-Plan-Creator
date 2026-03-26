import { useState } from "react";
import { unidadesCurriculares, funcoesProfissionais, moduloConfig, type UnidadeCurricular } from "./data/planoEnsino";
import { CronogramaView } from "./components/CronogramaView";
import { CronogramaUCDetail } from "./components/CronogramaUCDetail";

const SENAI_BLUE = "#D0011B";
const SENAI_RED = "#D0011B";

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

function UCCard({ uc, onClick }: { uc: UnidadeCurricular; onClick: () => void }) {
  const mod = moduloConfig[uc.modulo];
  const totalCompetencias = (uc.capacidadesBasicas?.length ?? 0) + (uc.capacidadesTecnicas?.length ?? 0);
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">{uc.nome}</h3>
        </div>
        <span className="shrink-0 bg-blue-50 text-blue-700 text-sm font-bold px-2.5 py-1 rounded-lg border border-blue-100">
          {uc.cargaHoraria}h
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <Badge className={`${mod.corBg} ${mod.corTexto} border border-current border-opacity-20`}>
          {uc.modulo}
        </Badge>
        <Badge className="bg-gray-100 text-gray-600">
          {uc.semestres.length === 1 ? `${uc.semestres[0]}º semestre` : `${uc.semestres[0]}º–${uc.semestres[uc.semestres.length - 1]}º semestre`}
        </Badge>
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{uc.objetivo}</p>

      <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-100 pt-3">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {totalCompetencias} capacidades
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {uc.conhecimentos.length} tópicos
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {uc.competencias.length} funções
        </span>
      </div>
    </button>
  );
}

function UCDetail({ uc, onBack }: { uc: UnidadeCurricular; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"competencias" | "conhecimentos" | "socioemocional">("competencias");
  const mod = moduloConfig[uc.modulo];
  const capacidades = uc.capacidadesBasicas ?? uc.capacidadesTecnicas ?? [];
  const tipoCapacidade = uc.capacidadesBasicas ? "Capacidades Básicas" : "Capacidades Técnicas";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors mb-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao Plano de Ensino
          </button>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-gray-900">{uc.nome}</h1>
            <Badge className={`${mod.corBg} ${mod.corTexto}`}>{uc.modulo}</Badge>
            <Badge className="bg-blue-100 text-blue-800 font-bold">{uc.cargaHoraria}h</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: SENAI_RED }}></div>
            <h2 className="font-semibold text-gray-900">Objetivo da UC</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{uc.objetivo}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: SENAI_BLUE }}></div>
            <h2 className="font-semibold text-gray-900">Competências da UC (Funções do Perfil Profissional)</h2>
          </div>
          <div className="space-y-2">
            {uc.competencias.map((c) => (
              <div key={c.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="shrink-0 bg-blue-700 text-white text-xs font-bold px-2 py-0.5 rounded">{c.id}</span>
                <span className="text-sm text-gray-800">{c.descricao}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 border-b border-gray-200">
          <nav className="flex gap-0 -mb-px">
            {[
              { key: "competencias", label: tipoCapacidade },
              { key: "socioemocional", label: "Socioemocionais" },
              { key: "conhecimentos", label: "Conhecimentos" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "competencias" && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">{tipoCapacidade}</h2>
            <div className="space-y-2">
              {capacidades.map((cap) => (
                <div key={cap.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {cap.id}
                  </span>
                  <span className="text-sm text-gray-800 leading-relaxed">{cap.descricao}</span>
                </div>
              ))}
            </div>

            {uc.recomendacoesMetodologicas && (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-sm font-semibold text-amber-800">Recomendações Metodológicas</span>
                </div>
                <p className="text-sm text-amber-900">{uc.recomendacoesMetodologicas}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "socioemocional" && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Capacidades Socioemocionais</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {uc.capacidadesSocioemocionais.map((cap) => (
                <div key={cap.id} className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-800">{cap.descricao}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "conhecimentos" && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Conhecimentos</h2>
            <div className="space-y-4">
              {uc.conhecimentos.map((c, i) => (
                <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 bg-gray-50 font-medium text-sm text-gray-800">{c.topico}</div>
                  {c.subtopicos && c.subtopicos.length > 0 && (
                    <div className="px-4 py-2 space-y-1">
                      {c.subtopicos.map((sub, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-gray-600 py-0.5">
                          <span className="text-gray-400 mt-0.5">›</span>
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Informações do Plano de Ensino</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Carga Horária Total</p>
              <p className="text-2xl font-bold text-gray-900">{uc.cargaHoraria}h</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Semestre(s)</p>
              <p className="text-sm font-semibold text-gray-900">
                {uc.semestres.map((s) => `${s}º`).join(", ")}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Módulo</p>
              <p className="text-sm font-semibold text-gray-900">{uc.modulo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onSelectUC, onSelectCronogramaUC }: { onSelectUC: (uc: UnidadeCurricular) => void; onSelectCronogramaUC: (uc: UnidadeCurricular) => void }) {
  const [search, setSearch] = useState("");
  const [filterModulo, setFilterModulo] = useState<string>("todos");
  const [activeView, setActiveView] = useState<"ucs" | "funcoes" | "cronograma">("ucs");

  const modulos = ["todos", "Módulo Básico", "Módulo Específico I", "Módulo Específico II"];

  const filtered = unidadesCurriculares.filter((uc) => {
    const matchSearch =
      !search ||
      uc.nome.toLowerCase().includes(search.toLowerCase()) ||
      uc.objetivo.toLowerCase().includes(search.toLowerCase());
    const matchModulo = filterModulo === "todos" || uc.modulo === filterModulo;
    return matchSearch && matchModulo;
  });

  const totalHoras = unidadesCurriculares.reduce((acc, uc) => acc + uc.cargaHoraria, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-white py-10 px-4" style={{ background: "linear-gradient(135deg, #A80016 0%, #D0011B 60%, #E8001F 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="text-sm font-black" style={{ color: SENAI_BLUE }}>S</span>
            </div>
            <div>
              <p className="text-blue-200 text-xs uppercase tracking-widest">SENAI Morvan Figueiredo</p>
              <h1 className="text-xl font-bold leading-tight">Plano de Ensino 2026</h1>
            </div>
          </div>

          <div className="mb-2">
            <h2 className="text-2xl font-extrabold mb-1">Técnico em Desenvolvimento de Sistemas</h2>
            <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>Eixo Tecnológico: Informação e Comunicação · 1.200h · 4 semestres</p>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>Elaborado pelo Professor Johnny Braga de Oliveira</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Unidades Curriculares", value: String(unidadesCurriculares.length) },
              { label: "Carga Horária Total", value: `${totalHoras}h` },
              { label: "Semestres", value: "4" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setActiveView("ucs")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === "ucs" ? "text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
            style={activeView === "ucs" ? { backgroundColor: "#D0011B" } : {}}
          >
            Unidades Curriculares
          </button>
          <button
            onClick={() => setActiveView("funcoes")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === "funcoes" ? "text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
            style={activeView === "funcoes" ? { backgroundColor: "#D0011B" } : {}}
          >
            Perfil Profissional
          </button>
          <button
            onClick={() => setActiveView("cronograma")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === "cronograma" ? "text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
            style={activeView === "cronograma" ? { backgroundColor: "#1d4ed8" } : {}}
          >
            📅 Cronograma
          </button>
        </div>

        {activeView === "ucs" && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Buscar unidade curricular..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {modulos.map((m) => {
                  const isActive = filterModulo === m;
                  const config = m !== "todos" ? moduloConfig[m] : null;
                  return (
                    <button
                      key={m}
                      onClick={() => setFilterModulo(m)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                        isActive
                          ? config
                            ? `${config.corBg} ${config.corTexto} border-current border-opacity-30`
                            : "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {m === "todos" ? "Todos" : m}
                    </button>
                  );
                })}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Nenhuma UC encontrada</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((uc) => (
                  <UCCard key={uc.id} uc={uc} onClick={() => onSelectUC(uc)} />
                ))}
              </div>
            )}
          </>
        )}

        {activeView === "funcoes" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <h3 className="font-bold text-gray-900 mb-1">Competência Geral</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Desenvolver, testar e implantar sistemas computacionais, atendendo normas e padrão de qualidade, usabilidade, integridade e segurança da informação.
              </p>
            </div>
            {funcoesProfissionais.map((f) => (
              <div key={f.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100" style={{ backgroundColor: `${SENAI_BLUE}08` }}>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: SENAI_BLUE }}>
                      {f.id.replace("F", "")}
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">{f.titulo}</p>
                      <p className="font-semibold text-gray-900 text-sm">{f.descricao}</p>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-3">
                  <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Subfunções</p>
                  <div className="space-y-1.5">
                    {f.subfuncoes.map((sf) => (
                      <div key={sf.id} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="shrink-0 w-7 h-5 rounded text-white text-xs font-bold flex items-center justify-center" style={{ backgroundColor: SENAI_BLUE }}>
                          {sf.id}
                        </span>
                        <span>{sf.descricao}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1.5 font-medium">UCs que desenvolvem esta função:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {unidadesCurriculares
                        .filter((uc) => uc.competencias.some((c) => c.id.startsWith(f.id.replace("F", "F"))))
                        .map((uc) => (
                          <button
                            key={uc.id}
                            onClick={() => onSelectUC(uc)}
                            className="text-xs px-2.5 py-1 rounded-md border transition-colors hover:opacity-80"
                            style={{ borderColor: SENAI_BLUE, color: SENAI_BLUE, backgroundColor: `${SENAI_BLUE}0D` }}
                          >
                            {uc.nome}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === "cronograma" && (
          <CronogramaView onSelectUC={onSelectCronogramaUC} />
        )}

        <footer className="mt-10 text-center text-xs text-gray-400 pb-6">
          <p>Escola SENAI "Morvan Figueiredo" — CFP 1.03 · Rua do Oratório, 215 — Mooca, São Paulo/SP</p>
          <p className="mt-1">Plano de Curso: Técnico em Desenvolvimento de Sistemas (SENAI-SP, 2023) · Proposta Pedagógica 2026</p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedUC, setSelectedUC] = useState<UnidadeCurricular | null>(null);
  const [cronogramaUC, setCronogramaUC] = useState<UnidadeCurricular | null>(null);

  // CronogramaUCDetail takes priority, then UCDetail, then HomePage
  if (cronogramaUC) {
    return <CronogramaUCDetail uc={cronogramaUC} onBack={() => setCronogramaUC(null)} />;
  }

  if (selectedUC) {
    return <UCDetail uc={selectedUC} onBack={() => setSelectedUC(null)} />;
  }

  return (
    <HomePage
      onSelectUC={setSelectedUC}
      onSelectCronogramaUC={setCronogramaUC}
    />
  );
}
