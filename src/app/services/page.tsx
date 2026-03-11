import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "AI pipeline development, analytics automation, and ML engineering services from Mattie Graham - 9+ years experience, Meta/Microsoft/CBRE background.",
};

const services = [
  {
    icon: "🤖",
    title: "AI Pipeline Development",
    subtitle: "RAG · LLM Integration · Agentic Workflows",
    description:
      "End-to-end AI pipelines built for production - retrieval-augmented generation (RAG), LangChain orchestration, local and cloud LLM integration. I build AI that works reliably outside of demos, with proper evaluation, guardrails, and observability.",
    bullets: [
      "RAG systems on proprietary data (PDFs, databases, APIs)",
      "LangChain / LlamaIndex agent workflows",
      "Local LLM deployment (Ollama, vLLM) for data privacy",
      "AI evaluation frameworks and performance benchmarking",
    ],
    highlight: true,
    badge: "High demand",
  },
  {
    icon: "⚡",
    title: "Analytics Automation",
    subtitle: "Python · Airflow · dbt · Power BI / Tableau",
    description:
      "I've automated 160+ analyst hours per month across enterprise teams. Whether it's a fragile manual Excel process or a disconnected reporting stack, I build self-service data systems that scale - and that every team can actually use.",
    bullets: [
      "Automated reporting pipelines (replace recurring manual pulls)",
      "Self-serve dashboards wired to live data sources",
      "Data quality monitoring and alerting",
      "Migration from spreadsheet-based workflows to Python/SQL",
    ],
    highlight: false,
    badge: null,
  },
  {
    icon: "🧠",
    title: "Machine Learning Engineering",
    subtitle: "Scikit-learn · PyTorch · Keras · TensorFlow",
    description:
      "Production machine learning across NLP, forecasting, segmentation, and computer vision. Not just model notebooks - full ML lifecycle including feature engineering, retraining pipelines, API deployment, and monitoring.",
    bullets: [
      "Predictive models for churn, demand, risk, or classification",
      "NLP pipelines: sentiment, entity recognition, document processing",
      "Time series forecasting with causal inference validation",
      "Model deployment as REST APIs or embedded services",
    ],
    highlight: false,
    badge: null,
  },
  {
    icon: "🛠️",
    title: "Rapid AI-Powered MVPs",
    subtitle: "Next.js · Python · Streamlit · FastAPI",
    description:
      "From zero to working product in under a month. I combine deep AI/data expertise with full-stack development to build tools your team actually ships - not just prototypes that live in a notebook.",
    bullets: [
      "Data applications and internal tools (Streamlit, React)",
      "AI-enhanced web apps with LLM features built in",
      "API development wrapping your data or ML models",
      "Quick technical assessments on existing data infrastructure",
    ],
    highlight: false,
    badge: "1-month MVP",
  },
  {
    icon: "📊",
    title: "Data Strategy & Architecture",
    subtitle: "Advisory · Stack Design · Discovery Engagements",
    description:
      "Before you build, you need a plan that won't require rearchitecting in 18 months. I advise on data stack choices, governance frameworks, and how to structure your analytics org for scale - drawing on experience across Meta, Microsoft, and CBRE.",
    bullets: [
      "Data architecture review and recommendations",
      "Make-vs-buy analysis for AI and analytics tooling",
      "KPI framework design and metrics alignment workshops",
      "Data governance and documentation strategy",
    ],
    highlight: false,
    badge: null,
  },
  {
    icon: "🎓",
    title: "Training & Enablement",
    subtitle: "Python · AI Tools · Data Literacy",
    description:
      "I've built curricula and led workshops turning business teams into confident Python and analytics users. Whether you need a team workshop on prompt engineering or a structured Python bootcamp, I design for lasting retention.",
    bullets: [
      "Python for data analysis (beginner through intermediate)",
      "Applied AI tools for analysts and business teams",
      "Prompt engineering and LLM workflow training",
      "Customized curriculum built around your stack and use cases",
    ],
    highlight: false,
    badge: null,
  },
];

const process = [
  {
    step: "01",
    title: "Discovery call",
    description: "30 minutes to understand your data, your goal, and where you are today. I ask the same questions I'd ask at a Fortune 500 kickoff.",
  },
  {
    step: "02",
    title: "Scoped proposal",
    description: "A clear statement of work with deliverables, timeline, and success criteria - no vague retainers, no surprise scope.",
  },
  {
    step: "03",
    title: "Weekly momentum",
    description: "Short async updates every week. You always know what was built, what's next, and whether we're on track.",
  },
  {
    step: "04",
    title: "Handoff that sticks",
    description: "Documentation, walkthroughs, and support after delivery. I build things meant to be maintained by you, not to keep me on the hook.",
  },
];

const stats = [
  { value: "$9B+", label: "Total business impact" },
  { value: "160+", label: "Analyst hours/mo automated" },
  { value: "400+", label: "Platform MAU at Meta" },
  { value: "9+", label: "Years in the field" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 pb-2" style={{ color: 'var(--secondary)' }}>
            How I Can Help
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            AI and analytics engineering for teams that need working systems, not demos - backed by 9+ years across Meta, Microsoft, and CBRE.
          </p>
          <div className="w-24 h-1 mx-auto mt-8" style={{ backgroundColor: 'var(--secondary)' }}></div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)'
              }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "var(--primary)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative p-6 rounded-xl border transition-all duration-300 group"
              style={{
                backgroundColor: service.highlight 
                  ? 'color-mix(in srgb, var(--primary) 20%, transparent)'
                  : 'color-mix(in srgb, var(--primary) 15%, transparent)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: service.highlight
                  ? 'color-mix(in srgb, var(--primary) 40%, transparent)'
                  : 'color-mix(in srgb, var(--primary) 30%, transparent)'
              }}
            >
              {service.badge && (
                <span
                  className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: service.highlight
                      ? "color-mix(in srgb, var(--primary) 25%, transparent)"
                      : "color-mix(in srgb, var(--secondary) 20%, transparent)",
                    color: service.highlight ? "var(--primary)" : "var(--secondary)",
                  }}
                >
                  {service.badge}
                </span>
              )}

              <h3 className="text-xl font-bold text-white mb-1 pr-24">{service.title}</h3>
              <p className="text-xs text-gray-500 mb-3 font-mono">{service.subtitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>

              <ul className="space-y-1.5">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[var(--primary)] flex-shrink-0 transition-colors duration-300" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-4 pb-1" style={{ color: 'var(--secondary)' }}>
            How I Work
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Clean, async-friendly engagements built around clear outcomes - not billable hours for their own sake.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step) => (
              <div 
                key={step.step} 
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)'
                }}
              >
                <div
                  className="text-3xl font-bold mb-3"
                  style={{ color: "var(--primary)", opacity: 0.5 }}
                >
                  {step.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement note */}
        <div className="mb-24 max-w-3xl mx-auto">
          <div 
            className="p-8 rounded-xl text-center"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)'
            }}
          >
            <h3 className="text-xl font-bold text-white mb-3">Engagement types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-sm">
              <div>
                <div className="font-semibold text-gray-200 mb-1">Project-based</div>
                <div className="text-gray-500">Fixed scope, fixed timeline. Best for well-defined builds and one-time analysis needs.</div>
              </div>
              <div>
                <div className="font-semibold text-gray-200 mb-1">Retainer</div>
                <div className="text-gray-500">Ongoing support at a reserved cadence. Best for teams shipping AI features on a regular cycle.</div>
              </div>
              <div>
                <div className="font-semibold text-gray-200 mb-1">Advisory</div>
                <div className="text-gray-500">Strategic guidance without implementation. Best for leaders evaluating AI stack and roadmap decisions.</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-24">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            I take on a small number of engagements at a time to keep quality high. Let&apos;s see if there&apos;s a fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 border border-transparent"
              style={{
                backgroundColor: "var(--secondary)",
              }}
            >
              Start a conversation
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)'
              }}
            >
              See my work
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
