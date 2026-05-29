const stats = [
  { value: "$9B+",  label: "In business decisions guided" },
  { value: "9+",    label: "Years in production" },
  { value: "160+",  label: "Analyst hours/mo automated" },
  { value: "400+",  label: "Monthly active users" },
  { value: "12+",   label: "Production models shipped" },
  { value: "95%",   label: "Reduction in reported issues" },
];

export function StatsBar() {
  return (
    <section
      className="py-12 px-6"
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0 lg:divide-x"
          style={{ '--tw-divide-opacity': '1' } as React.CSSProperties}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center px-4">
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                {value}
              </p>
              <p className="text-xs leading-snug" style={{ color: 'var(--fg-subtle)' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
