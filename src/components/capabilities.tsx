import { ScrollReveal } from "@/components/scroll-reveal";
import { Bot, Zap, Brain, Database, type LucideIcon } from "lucide-react";

const capabilities: Array<{
  Icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}> = [
  {
    Icon: Bot,
    title: "AI Pipeline Development",
    description:
      "End-to-end RAG systems, LLM integrations, and agentic workflows — from prototype to production-grade deployment.",
    tags: ["RAG", "LangChain", "Ollama", "Azure OpenAI"],
  },
  {
    Icon: Zap,
    title: "Analytics Automation",
    description:
      "Eliminate manual reporting and spreadsheet work. Self-serve dashboards and automated data pipelines that scale.",
    tags: ["Python", "Airflow", "dbt", "Power BI"],
  },
  {
    Icon: Brain,
    title: "Machine Learning Engineering",
    description:
      "Forecasting, classification, and NLP models packaged as APIs — from model selection through production monitoring.",
    tags: ["PyTorch", "Scikit-learn", "MLflow", "FastAPI"],
  },
  {
    Icon: Database,
    title: "Data Strategy & Architecture",
    description:
      "Stack design, governance frameworks, and make-vs-buy analysis to set data programs up for long-term scale.",
    tags: ["Azure", "Databricks", "Snowflake", "Cosmos DB"],
  },
];

export function Capabilities() {
  return (
    <section className="py-20 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <h2 className="section-heading mb-3">What I Build</h2>
            <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--fg-muted)' }}>
              Where business strategy, data infrastructure, and applied AI meet — packaged into systems that ship.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={i * 0.08}>
              <div className="card h-full p-6 flex flex-col gap-4">
                <cap.Icon size={28} strokeWidth={1.5} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--fg)' }}>
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {cap.description}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="pill text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
