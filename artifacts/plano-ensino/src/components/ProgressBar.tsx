interface ProgressBarProps {
  value: number;        // horas planejadas
  total: number;        // carga horária total
  label?: string;       // label opcional (ex: "1º Semestre")
  showText?: boolean;   // mostrar texto "Xh / Yh — Z%"
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getProgressColor(pct: number): string {
  if (pct >= 100) return "#16a34a"; // verde
  if (pct >= 70)  return "#d97706"; // âmbar
  if (pct >= 40)  return "#2563eb"; // azul
  return "#D0011B";                  // vermelho SENAI (inicial)
}

export function ProgressBar({ value, total, label, showText = true, size = "md", className = "" }: ProgressBarProps) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  const color = getProgressColor(pct);

  const heightClass = size === "sm" ? "h-1.5" : size === "lg" ? "h-4" : "h-2.5";

  return (
    <div className={`w-full ${className}`}>
      {(label || showText) && (
        <div className="flex items-center justify-between mb-1">
          {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
          {showText && (
            <span className="text-xs text-gray-500 ml-auto">
              {Math.round(value)}h / {total}h
              <span className="ml-1 font-semibold" style={{ color }}>{pct}%</span>
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heightClass}`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
