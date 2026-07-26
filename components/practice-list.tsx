import { practice } from "@/lib/practice";

export function PracticeList() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
      {practice.map((item) => (
        <li key={item.index} className="bg-bg p-6 sm:p-8">
          <p className="meta text-accent">{item.index}</p>
          <h3 className="mt-4 text-lg font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
