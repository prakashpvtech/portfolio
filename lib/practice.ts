/* 03 / How I Build — the section that shows engineering judgement rather than
   claiming it. Every line here is backed by something in the repositories. */
export const practice = [
  {
    index: "01",
    title: "Business logic lives in one place",
    body: "The backend owns every rule; the frontend maps responses to view models and renders them. When a number looks wrong there is exactly one place to look.",
  },
  {
    index: "02",
    title: "Tests go where the logic is",
    body: "FinPilot's domain engines never import FastAPI, so behaviour is verified by calling a function — 203 tests across 60 modules, no browser involved.",
  },
  {
    index: "03",
    title: "Gaps get written down",
    body: "Every project documents what is incomplete. A roadmap that only lists wins is marketing; the useful version tells you what you would hit on day one.",
  },
  {
    index: "04",
    title: "CI runs on every push",
    body: "Lint, typecheck, tests and a production build. If the badge is green the thing actually builds — which is the only version of 'done' worth reporting.",
  },
] as const;

export const stats = [
  { value: "4", label: "projects shipped" },
  { value: "203", label: "backend tests" },
  { value: "13", label: "backend modules" },
  { value: "4/4", label: "CI green" },
] as const;
