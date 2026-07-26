export type ProjectStatus = "live" | "self-hosted";

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  /* One line. What it is and why it matters — nothing else. */
  value: string;
  stack: string[];
  status: ProjectStatus;
  statusNote: string;
  flagship?: boolean;
  links: {
    demo?: string;
    source: string;
  };
  /* Case-study body. Every claim here is verified against the repository. */
  study: {
    problem: string;
    architecture: string[];
    decisions: { title: string; body: string }[];
    stats?: { value: string; label: string }[];
    /* The credibility multiplier — gaps stated plainly. */
    limits: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "finpilot",
    index: "01",
    name: "FinPilot AI",
    category: "Full-stack platform",
    value:
      "An AI personal-finance platform where a 13-module FastAPI backend owns every business rule and the frontend only renders.",
    stack: ["FastAPI", "Python 3.11", "Next.js 16", "PostgreSQL", "Redis", "Docker"],
    status: "self-hosted",
    statusNote: "Runs locally — needs Redis + Postgres",
    flagship: true,
    links: {
      source: "https://github.com/prakashpvtech/finpilot",
    },
    study: {
      problem:
        "Personal-finance tools either hide their logic in a frontend that cannot be tested, or spread it across both tiers until no one knows which is authoritative. I wanted a codebase where the answer to 'where does this number come from' is always the same place.",
      architecture: [
        "Thin FastAPI routers parse and validate, then delegate — they hold no business rules.",
        "Domain engines are framework-free: plain arguments in, plain data out, no FastAPI import.",
        "Thirteen backend modules: identity, market data, AI gateway, document RAG, analysis, portfolio, news, wealth, dashboard, notifications, integrations.",
        "Ten Next.js feature areas map backend payloads to view models in each feature's api/ folder.",
        "SQLAlchemy async over Postgres; Redis for rate limiting, brute-force lockout and AI memory.",
      ],
      decisions: [
        {
          title: "The backend owns all business logic",
          body: "The frontend never computes a valuation, derives a metric, or decides what counts as risk. It maps responses to view models and renders them. The rule is enforced by where the tests live: business behaviour is verified in Python, with no browser involved.",
        },
        {
          title: "Engines stay framework-free",
          body: "Because domain logic never imports FastAPI, portfolio maths, wealth engines, forecasting and RAG retrieval are all testable by calling a function. That single constraint is why a 203-test suite was practical to write at all.",
        },
        {
          title: "No fabricated financial data",
          body: "An early build shipped hardcoded holdings and trades so the dashboard looked alive. I removed them and added a WidgetEmpty path instead. A finance dashboard that invents positions is worse than an empty one — it teaches the user to distrust every other number.",
        },
        {
          title: "Multi-tenancy enforced at retrieval, not at render",
          body: "RAG retrieval is scoped by user_id inside the vector store, and AI chat memory is namespaced per user with its own isolation test suite. Filtering in the UI would have looked identical and been worthless.",
        },
      ],
      stats: [
        { value: "203", label: "tests" },
        { value: "60", label: "test modules" },
        { value: "13", label: "backend modules" },
        { value: "v1.0.0", label: "released" },
      ],
      limits: [
        "Not hosted publicly. It needs Redis and Postgres and was never designed as a multi-tenant service — it is built to be cloned and run.",
        "The RAG vector store is in-memory, so it is single-worker only. Making it persistent and shared is the prerequisite for running replicas.",
        "Market and news modules fall back to mock adapters without provider API keys, and several analytics sub-features have no backend endpoint yet.",
        "Access tokens live in localStorage — a known XSS surface. Moving to httpOnly cookies is open work, not a solved problem.",
        "Mobile layout is incomplete: the sidebar does not collapse and content clips below 768px.",
        "Analysis, documents and integrations pages are placeholders. The engines behind them exist; the UI does not.",
      ],
    },
  },
  {
    slug: "codeforge",
    index: "02",
    name: "CodeForge AI",
    category: "Developer tool",
    value:
      "A DSA practice platform with a real code judge — submissions execute against generated test harnesses and return per-case verdicts.",
    stack: ["Next.js 16", "TypeScript", "Monaco Editor", "Zustand"],
    status: "live",
    statusNote: "Live demo runs JavaScript",
    links: {
      demo: "https://dsacodeforgeai.vercel.app",
      source: "https://github.com/prakashpvtech/dsacodeforgeai",
    },
    study: {
      problem:
        "Practising algorithms against a text box that only diffs strings teaches you nothing about whether your code runs. I wanted submissions actually executed, with per-case verdicts and timings, not a pattern match on the answer.",
      architecture: [
        "A wrapper generator builds a per-problem harness around the submitted function for each language.",
        "The judge executes the program with a per-run timeout and an output buffer cap.",
        "Comparators normalise and diff program output against expected results, case by case.",
        "The submission endpoint rate-limits by IP, caps payload size, and allow-lists languages.",
        "A static denylist screens the untrusted submission — never the generated harness.",
      ],
      decisions: [
        {
          title: "Scan the submission, not the wrapper",
          body: "The denylist originally ran against the generated harness. Because the Python harness opens with 'import json / import sys', it matched its own preamble and rejected every Python submission as malicious. The untrusted input is the submission, so that is what gets scanned — enforced by a required parameter rather than a convention.",
        },
        {
          title: "Regex literals over new RegExp(string)",
          body: "The security patterns were built from strings with quadruple-escaped backslashes, which collapsed into an unterminated group — every submission failed to compile the pattern. Worse, half-fixing it would have made the denylist match nothing and pass everything. Literals make a malformed pattern a build error instead of a runtime one.",
        },
        {
          title: "Only offer languages the deployment can run",
          body: "The judge shells out to python3, node, javac and g++. Serverless hosting ships Node alone, so three of the four choices returned 'command not found' on the live site. The hosted build now detects itself, disables what it cannot run, and says so — rather than letting a shell error reach the user.",
        },
      ],
      limits: [
        "A denylist is not a sandbox. Real isolation needs a container or a judge service such as Piston or Judge0; this only stops the obvious cases.",
        "The hosted demo runs JavaScript only. Python, Java and C++ work in a local checkout, where their runtimes exist.",
        "Rate limiting is in-memory per instance, so it resets on cold start and is not shared across serverless instances.",
        "Problem content is bundled in the repository rather than authored through a CMS.",
      ],
    },
  },
  {
    slug: "pronounce-ai",
    index: "03",
    name: "PronounceAI",
    category: "AI / speech",
    value:
      "A spoken-English coach that turns a short recording into word-level pronunciation feedback with structured scoring.",
    stack: ["Next.js 16", "TypeScript", "Google Gemini", "Tailwind CSS"],
    status: "live",
    statusNote: "Deployed — analysis needs an API key",
    links: {
      demo: "https://pronounce.vercel.app",
      source: "https://github.com/prakashpvtech/pronounce-ai",
    },
    study: {
      problem:
        "Pronunciation feedback is usually a single score with no explanation, which tells a learner nothing actionable. I wanted per-word feedback a learner could actually practise against.",
      architecture: [
        "Audio is captured in the browser and posted to a route handler — never stored.",
        "Google Gemini transcribes the clip and evaluates it against the expected text.",
        "The evaluation layer requires validated structured JSON, so a malformed model response fails loudly instead of rendering as partial nonsense.",
        "Scores are returned per word plus aggregate fluency, clarity and pace.",
      ],
      decisions: [
        {
          title: "Structured output over free text",
          body: "Asking a model for prose and parsing it later produces a UI that breaks in ways you cannot reproduce. Constraining the response to a validated schema means a bad generation is a caught error, not a silent rendering bug.",
        },
        {
          title: "Ephemeral audio, documented",
          body: "Voice recordings are personal data. The privacy model is written down and aligned to India's DPDP Act rather than left implicit — audio is processed in the request and never persisted.",
        },
      ],
      limits: [
        "The hosted demo cannot analyse anything without a Gemini API key configured; the UI loads but the core feature will error.",
        "Accuracy depends entirely on the upstream model — there is no acoustic model of my own here, and I do not claim one.",
        "No accounts and no progress history: each session starts from nothing.",
        "Tested against a narrow range of accents and recording conditions.",
      ],
    },
  },
  {
    slug: "groweasy",
    index: "04",
    name: "GrowEasy CSV Importer",
    category: "Data tooling",
    value:
      "Maps arbitrary, messy CSVs onto a clean CRM schema using LLM field inference — removing the manual column-mapping step.",
    stack: ["Next.js 16", "TypeScript", "Google Gemini", "SQLite"],
    status: "self-hosted",
    statusNote: "Run locally for real persistence",
    links: {
      source: "https://github.com/prakashpvtech/groweasy-csv-importer",
    },
    study: {
      problem:
        "Every CRM import starts with a human dragging columns onto fields, and every export format is different — Lead Ads dumps, legacy CRM exports, hand-edited spreadsheets. The mapping is exactly the kind of fuzzy judgement a model is good at.",
      architecture: [
        "Headers and sample rows are sent for inference; the model proposes a mapping onto the target schema.",
        "Row-level validation runs before anything is committed, so bad rows are reported rather than silently dropped.",
        "Confirmed mappings are saved as reusable presets for recurring sources.",
        "Import history and analytics — volume and mapping success rate — persist in SQLite with no external database.",
      ],
      decisions: [
        {
          title: "Infer the mapping, then let a human confirm it",
          body: "The model proposes; it does not commit. Import is a destructive operation on someone's customer data, so the inference is a draft the user approves, not an action taken on their behalf.",
        },
        {
          title: "SQLite with no service to run",
          body: "For a tool one person runs against their own exports, requiring a database server is friction with no payoff. Zero-config local persistence was the right trade — and it is precisely why the hosted demo cannot persist.",
        },
      ],
      limits: [
        "Hosted on serverless, the database lives in /tmp: presets and history are per-instance and do not survive between requests. Run it locally for real persistence.",
        "AI mapping requires a Gemini API key; without one the inference step cannot run.",
        "Field inference is a suggestion, not a guarantee — unusual headers still need a human to confirm.",
        "Targets one CRM schema shape rather than being configurable per destination.",
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
