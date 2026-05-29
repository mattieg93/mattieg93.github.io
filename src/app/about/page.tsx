import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mattie Graham — Senior Data Scientist & AI Engineer. 9 years building production ML, RAG pipelines, and data infrastructure for enterprise programs at the scale of Meta and Microsoft. Pursuing an MS in Artificial Intelligence at CU Boulder.",
};

const experiences = [
  {
    title: "Senior Data Analyst",
    company: "CBRE · Client: Meta",
    period: "Sep 2022 – Dec 2025",
    achievements: [
      "Led end-to-end delivery of a global location-scoring AI system — scoped the problem with senior stakeholders, designed a 32-feature / 6-category architecture in scikit-learn and PyTorch, and shipped iterations into production guiding a $1.7B/year strategic real-estate portfolio.",
      "Architected the supporting ML platform from scratch: a Hive data warehouse integrating 12+ production models, repeatable analysis pipelines, and a self-serve layer serving 50+ stakeholders and 400+ monthly active users — consistently a top-10 internal data product.",
      "Designed A/B experimentation infrastructure for a service-tooling migration with imperfect randomization and delayed outcomes; defined guardrails, monitored behavioral side effects, and quantified a 37% SLA improvement.",
      "Built the observability + evaluation stack: automated alerting on model health, data quality, and account-level metrics drove a 95% reduction in user-reported issues.",
      "Served as technical lead for BI automation — time-series forecasting and regression models reclaimed 160+ analyst hours per month and powered 200+ Tableau dashboards across the portfolio.",
      "Authored ML/statistics best-practice documentation and ran technical training for 15+ teammates on experimentation, causal inference, and responsible AI deployment.",
    ],
  },
  {
    title: "Senior Business Analyst",
    company: "CBRE · Client: Microsoft",
    period: "Dec 2020 – Sep 2022",
    achievements: [
      "Architected a pilot 360° people-analytics platform for C-suite leaders — automated gap analysis between self-reported and subordinate evaluations across a 1,500-person organization, informing strategic talent decisions.",
      "Centralized diverse-supplier and human-behavior data from 5 sources into governed Azure SQL warehouses, lifting reporting quality 75% and enabling decisions across $7B+ in programs.",
      "Defined measurement frameworks, SLOs, and guardrail metrics in Azure DevOps; standardized health dashboards across functions and embedded cross-team metrics governance.",
      "Mentored junior analysts on SQL optimization, statistical methodology, and dashboard design for production systems.",
    ],
  },
  {
    title: "Program Manager — Global Digital Transformation",
    company: "CBRE · Client: Microsoft",
    period: "Apr 2020 – Dec 2020",
    achievements: [
      "Led a global AI/data transformation program: defined the technical roadmap, managed delivery workstreams, and aligned stakeholders across engineering, operations, and finance in multiple regions.",
      "Converted manual reporting into automated Python + Azure pipelines — generated $15M in new business and $500K in annual savings.",
    ],
  },
  {
    title: "Business Systems Analyst — Campus Modernization",
    company: "CBRE · Client: Microsoft",
    period: "Mar 2019 – Apr 2020",
    achievements: [
      "Designed governed Azure SQL warehouses supporting 500+ concurrent users and $5B in annual budgets, plus full-stack web tooling for 100+ daily active analysts.",
      "Quadrupled analyst productivity and cut user-reported issues 95% through observability, documentation, and support processes.",
    ],
  },
  {
    title: "Associate Project Manager",
    company: "CBRE · Client: Microsoft",
    period: "May 2018 – Mar 2019",
    achievements: [
      "Built SQL-driven data models and visualization workflows tracking progress for 100+ stakeholders on a $5B campus program.",
      "Standardized global data collection and reporting practices, increasing project velocity 150%.",
    ],
  },
  {
    title: "Studio Coordinator",
    company: "SkB Architects",
    period: "Aug 2016 – May 2018",
    achievements: ["Project coordination, business operations, and the first taste of cleaning real-world data at scale."],
  },
  {
    title: "Project Assistant",
    company: "LMN Architects",
    period: "Oct 2015 – Aug 2016",
    achievements: ["Project support, business operations, reporting workflows."],
  },
  {
    title: "General Manager",
    company: "Chipotle Mexican Grill",
    period: "Sep 2012 – Jul 2015",
    achievements: ["Operations leadership, team development, and learning how high-stakes decisions get made under real constraints."],
  },
];

const skillGroups = [
  {
    title: "AI / LLM Engineering",
    skills: [
      "RAG Pipeline Design",
      "Prompt Engineering",
      "LangChain",
      "LangGraph",
      "ChromaDB",
      "Atlas Vector Search",
      "Voyage AI Embeddings",
      "Local LLMs (Gemma, MLX, Ollama)",
      "Multi-agent Orchestration",
      "Hugging Face",
      "Evaluation Frameworks",
    ],
  },
  {
    title: "Machine Learning & Statistics",
    skills: [
      "scikit-learn",
      "PyTorch",
      "TensorFlow / Keras",
      "Predictive Modeling",
      "Time-Series Forecasting",
      "A/B Testing",
      "Causal Inference",
      "Feature Engineering",
      "Deterministic Scoring Systems",
      "People Analytics",
    ],
  },
  {
    title: "Data Engineering",
    skills: [
      "Python (Pandas, NumPy)",
      "SQL (expert)",
      "Apache Hive",
      "Apache Spark",
      "Azure SQL",
      "Azure Functions",
      "Cosmos DB",
      "MongoDB Atlas",
      "dbt",
      "ETL Pipeline Design",
      "R (basic)",
    ],
  },
  {
    title: "Production & MLOps",
    skills: [
      "Observability & Alerting",
      "Model Health Monitoring",
      "Data Quality Pipelines",
      "Sentry",
      "Railway",
      "Gunicorn",
      "Docker",
      "GitHub Actions / CI",
      "Azure DevOps",
    ],
  },
  {
    title: "Full-Stack & Visualization",
    skills: [
      "React 19 / Next.js",
      "TypeScript",
      "Flask",
      "FastAPI",
      "Tailwind CSS",
      "D3.js",
      "Tableau",
      "Power BI",
      "Streamlit",
    ],
  },
  {
    title: "Leadership & Practice",
    skills: [
      "End-to-End AI Ownership",
      "Technical Mentorship",
      "Stakeholder Translation",
      "ML Governance",
      "Metrics Strategy",
      "Responsible AI",
      "Technical Writing",
      "Rapid Prototyping",
    ],
  },
];

const certifications = [
  {
    name: "IBM AI Engineering Professional Certificate",
    org: "IBM · Coursera",
    year: "2026",
    url: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/5DGN0PIR71UD",
    credential: "5DGN0PIR71UD",
  },
  { name: "IBM Machine Learning Professional Certificate", org: "IBM · Coursera", year: "2024" },
  { name: "Advanced SQL for Data Scientists", org: "Coursera", year: "2023" },
  { name: "Google Data Analytics Certificate", org: "Google · Coursera", year: "2022" },
  { name: "Tableau Essential Training", org: "LinkedIn Learning", year: "2021" },
  { name: "Azure Fundamentals (AZ-900)", org: "Microsoft", year: "2021" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Bio */}
        <section className="mb-20 grid sm:grid-cols-[auto_1fr] gap-10 items-start">
          <div
            className="rounded-2xl overflow-hidden flex-shrink-0"
            style={{
              width: 140,
              height: 140,
              border: "2px solid",
              borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)",
              boxShadow: "0 16px 40px color-mix(in srgb, var(--primary) 18%, transparent)",
            }}
          >
            <Image
              src="/assets/images/1843.png"
              alt="Mattie Graham"
              width={140}
              height={140}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--fg-subtle)" }}
            >
              Senior IC · Open to staff-track roles
            </p>
            <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--fg)" }}>
              Mattie Graham
            </h1>
            <p className="text-base font-medium mb-5" style={{ color: "var(--accent)" }}>
              Senior Data Scientist &amp; AI Engineer
            </p>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                I build things that work in production and hold up under scrutiny. The work isn&rsquo;t just models &mdash; it&rsquo;s the{" "}
                <strong style={{ color: "var(--fg)", fontWeight: 600 }}>experimentation rigor, observability, and stakeholder fluency</strong>{" "}
                that turn AI from a demo into a decision tool.
              </p>
              <p>
                Nine years embedded with{" "}
                <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Meta and Microsoft</strong>{" "}
                via CBRE &mdash; as the only data scientist on the team, with no safety net &mdash; owning end-to-end ML delivery: a 32-feature location-scoring model guiding a{" "}
                <strong style={{ color: "var(--fg)", fontWeight: 600 }}>$1.7B/year</strong> portfolio,
                a Hive warehouse serving 400+ monthly active users, an A/B framework that quantified a 37% SLA lift, and a
                360&deg; people-analytics platform for C-suite leaders across a 1,500-person org.{" "}
                <strong style={{ color: "var(--fg)", fontWeight: 600 }}>I did not inherit these systems. I built them.</strong>
              </p>
              <p>
                Outside of work I ship full production AI on my own. Recent independent builds: a{" "}
                <Link href="/work/mtg-ecorec" style={{ color: "var(--primary)" }}>vector-search recommendation engine</Link>{" "}
                over 110,000+ records with Voyage AI + Atlas Vector Search, a{" "}
                <Link href="/work/ai-study-assistant" style={{ color: "var(--primary)" }}>fully on-device multi-agent study assistant</Link>{" "}
                on Apple Silicon + MLX, and a{" "}
                <Link href="/work/queer-data-network" style={{ color: "var(--primary)" }}>community data platform</Link>{" "}
                with anti-harassment moderation treated as a measurable product outcome.
              </p>
              <p>
                Currently pursuing an{" "}
                <strong style={{ color: "var(--fg)", fontWeight: 600 }}>MS in Artificial Intelligence</strong>{" "}
                at{" "}
                <strong style={{ color: "var(--fg)", fontWeight: 600 }}>CU Boulder</strong>{" "}
                (Mar 2026 – May 2028) while shipping full-time. IBM AI Engineering Professional Certificate, 2026.
              </p>
              <p>
                What I look for: messy problems, real stakes, and teams that treat{" "}
                <strong style={{ color: "var(--fg)", fontWeight: 600 }}>good data engineering as a prerequisite, not an afterthought</strong>.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-accent" style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem" }}>
                Get in Touch
              </Link>
              <Link href="/work" className="btn-outline" style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem" }}>
                View Work
              </Link>
            </div>

            {/* Currently / Now strip */}
            <div
              className="mt-8 p-4 rounded-lg"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--fg-subtle)" }}
              >
                Currently
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--fg-muted)" }}>
                <li className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  <span>
                    <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Learning:</strong>{" "}
                    MS AI at CU Boulder — deep RL, LLM systems, applied ML.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: "var(--primary)" }}
                  />
                  <span>
                    <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Shipping:</strong>{" "}
                    MTG EcoRec (110k+ cards, Atlas Vector Search), Coursera Study Assistant V2 (MLX, on-device), Queer Data Network.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: "var(--success)" }}
                  />
                  <span>
                    <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Open to:</strong>{" "}
                    Senior / staff Data Scientist, Applied ML Engineer, and Forward-Deployed AI Engineer roles.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="divider mb-20" />

        {/* Experience */}
        <section className="mb-20">
          <h2 className="section-heading mb-10">Experience</h2>
          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: "var(--border)", marginLeft: "7px" }}
            />
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div key={i} className="sm:pl-10 relative">
                  <div
                    className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full hidden sm:block"
                    style={{
                      background: i === 0 ? "var(--accent)" : "var(--bg-elevated)",
                      border: "2px solid",
                      borderColor: i === 0 ? "var(--accent)" : "var(--border)",
                    }}
                  />
                  <div className="card p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
                      <div>
                        <h3 className="font-semibold text-base" style={{ color: "var(--fg)" }}>
                          {exp.title}
                        </h3>
                        <p className="text-sm mt-0.5" style={{ color: "var(--primary)" }}>
                          {exp.company}
                        </p>
                      </div>
                      <span
                        className="pill text-xs whitespace-nowrap self-start"
                        style={{
                          background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                          color: "var(--accent)",
                          borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--fg-muted)" }}>
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: "var(--primary)" }}
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider mb-20" />

        {/* Skills */}
        <section className="mb-20">
          <h2 className="section-heading mb-10">Skills</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {skillGroups.map((group) => (
              <div key={group.title} className="card p-5">
                <h3
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--fg-subtle)" }}
                >
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span key={skill} className="pill" style={{ fontSize: "0.75rem" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider mb-20" />

        {/* Education */}
        <section className="mb-20">
          <h2 className="section-heading mb-10">Education</h2>
          <div className="space-y-4">
            {/* MS AI - CU Boulder */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="font-semibold text-base" style={{ color: "var(--fg)" }}>
                    Master of Science in Artificial Intelligence
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: "var(--primary)" }}>
                    University of Colorado Boulder
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--fg-subtle)" }}>
                    In progress &middot; Mar 2026 – May 2028
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 self-start">
                  <span
                    className="pill"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--success)",
                      borderColor: "color-mix(in srgb, var(--success) 30%, transparent)",
                      background: "color-mix(in srgb, var(--success) 10%, transparent)",
                    }}
                  >
                    In Progress
                  </span>
                  <span className="text-xs" style={{ color: "var(--fg-subtle)" }}>
                    2026 &ndash; 2028
                  </span>
                </div>
              </div>
            </div>

            {/* BAS - Bellevue College */}
            <div className="card p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="font-semibold text-base" style={{ color: "var(--fg)" }}>
                    Bachelor of Applied Science in Data Management &amp; Analytics
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: "var(--primary)" }}>
                    Bellevue College
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--fg-subtle)" }}>
                    Completed while working full-time
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 self-start">
                  <span
                    className="pill"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--accent)",
                      borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
                      background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                    }}
                  >
                    3.82 GPA
                  </span>
                  <span className="text-xs" style={{ color: "var(--fg-subtle)" }}>
                    2018 &ndash; 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="section-heading mb-10">Certifications</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="card p-4 flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <div>
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                      style={{ color: "var(--fg)" }}
                    >
                      {cert.name} ↗
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                      {cert.name}
                    </p>
                  )}
                  <p className="text-xs mt-0.5" style={{ color: "var(--fg-muted)" }}>
                    {cert.org} &middot; {cert.year}
                    {cert.credential && (
                      <span style={{ color: "var(--fg-subtle)" }}> &middot; ID: {cert.credential}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
