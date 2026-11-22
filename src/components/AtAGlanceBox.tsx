interface AtAGlanceData {
  whoItIsFor: string;
  mode: string;
  duration: string;
  location: string;
  howToEnrol: string;
}

interface AtAGlanceBoxProps {
  title?: string;
  data: AtAGlanceData;
}

export function AtAGlanceBox({ title = 'At a glance', data }: AtAGlanceBoxProps) {
  const rows = [
    { label: 'Who it is for', value: data.whoItIsFor },
    { label: 'Mode', value: data.mode },
    { label: 'Duration', value: data.duration },
    { label: 'Location', value: data.location },
    { label: 'How to enrol', value: data.howToEnrol },
  ];

  return (
    <section aria-label={title} className="card-coaching p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[var(--hairline)] pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">{title}</h2>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)]">
          Nehru Nagar, Belagavi
        </span>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {rows.map((row) => (
          <div key={row.label} className="space-y-1">
            <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--royal)]">
              {row.label}
            </dt>
            <dd className="text-sm leading-relaxed text-[var(--muted)]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
