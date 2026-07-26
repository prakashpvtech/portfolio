import { stats } from "@/lib/practice";

export function StatRow() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-bg p-5 sm:p-6">
          <dd className="display text-4xl sm:text-5xl">{stat.value}</dd>
          <dt className="meta mt-3 text-fg-faint">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
