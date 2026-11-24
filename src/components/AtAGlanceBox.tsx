import { FormatOrdinals } from './FormatText';

interface AtAGlanceData {
  whoItIsFor: string;
  whoItIsForList?: string[];
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
    { label: 'Who it is for', value: data.whoItIsFor, list: data.whoItIsForList },
    { label: 'Mode', value: data.mode },
    { label: 'Duration', value: data.duration },
    { label: 'Location', value: data.location },
    { label: 'How to enrol', value: data.howToEnrol },
  ];

  return (
    <section aria-label={title} data-aeo-summary="true" className="card-coaching p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[var(--hairline)] pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
          <FormatOrdinals text={title} />
        </h2>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--gold-text)]">
          <FormatOrdinals text="Nehru Nagar, 2nd Cross, Belagavi · Online Across India" />
        </span>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {rows.map((row) => (
          <div key={row.label} className="space-y-1.5">
            <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--royal)]">
              {row.label}
            </dt>
            <dd className="text-sm leading-relaxed text-[var(--muted)]">
              {row.list && row.list.length > 0 ? (
                <ul className="list-disc pl-4 space-y-1 font-bold text-[var(--ink)] marker:text-[var(--royal)]">
                  {row.list.map((item) => (
                    <li key={item}>
                      <FormatOrdinals text={item} />
                    </li>
                  ))}
                </ul>
              ) : (
                <FormatOrdinals text={row.value} />
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
