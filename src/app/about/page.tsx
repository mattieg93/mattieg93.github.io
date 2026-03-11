import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--secondary)' }}>
            About Me
          </h1>
          <p className="text-xl text-gray-400">
            Building AI-powered data products that give everyone access to clear, confident decisions
          </p>
          <div className="w-24 h-1 mx-auto mt-8" style={{ backgroundColor: 'var(--secondary)' }}></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Image and Quick Stats */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="relative mb-8">
                <div 
                  className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)',
                    boxShadow: `0 25px 50px -12px color-mix(in srgb, var(--primary) 20%, transparent)`
                  }}
                >
                  <Image
                    src="/assets/images/1843.png"
                    alt="Mattie #1843"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--primary)' }}>9+</div>
                  <div className="text-gray-700 dark:text-white text-sm">Years Experience</div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--secondary)' }}>$9B+</div>
                  <div className="text-gray-700 dark:text-white text-sm">Total Business Impact</div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--secondary)' }}>160+</div>
                  <div className="text-gray-700 dark:text-white text-sm">Analyst Hrs/Mo Saved</div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 border border-gray-300 dark:border-gray-700">
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--primary)' }}>3.82</div>
                  <div className="text-gray-700 dark:text-white text-sm">GPA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Story */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">My Story</h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-gray-300">
                  I&apos;m an <span className="font-semibold" style={{ color: 'var(--primary)' }}>AI &amp; Analytics Engineer</span> who builds
                  self-serve, AI-powered data products so every team can turn messy enterprise data into
                  clear, confident decisions. I care most about helping people thrive at work - reducing repetitive
                  analysis, giving them natural-language access to data, and making complex systems feel simple.
                </p>

                <p className="text-gray-300">
                  I leverage 9+ years supporting major tech orgs
                  (<span className="font-semibold" style={{ color: 'var(--primary)' }}>Meta, Microsoft</span>) to design and ship
                  applications that wrap AI and analytics in friendly interfaces. My work has automated
                  <span className="font-semibold" style={{ color: 'var(--secondary)' }}> 160+ analyst hours per month</span>, guided
                  over <span className="font-semibold" style={{ color: 'var(--secondary)' }}>$9B+ in total business impact</span> ($2B saved, $7B assets managed), and
                  kept data trustworthy through governance across 200+ reports.
                </p>

                <p className="text-gray-300">
                  Experimentation, for me, means treating AI like a product - not a magic trick. I design A/B
                  tests for model changes, run RAG and agentic prototypes with guardrails, monitor impact on SLAs
                  and user experience, and only scale what proves real value. I love mentoring teams through this
                  process so they understand not just what the model does, but why it&apos;s safe to trust.
                </p>

                <p className="text-gray-300">
                  My path here was unconventional - early years managing operations at Chipotle taught me that
                  great data work isn&apos;t just about algorithms and visualizations. It&apos;s about understanding
                  people, processes, and the real-world impact of the insights we create. That people-first
                  instinct is still at the center of everything I build.
                </p>

                <p className="text-gray-300">
                  Beyond the technical work, I&apos;m deeply committed to
                  <span className="font-semibold" style={{ color: 'var(--secondary)' }}> ethical data practices and inclusive technology</span>.
                  Data-driven tools should serve everyone, not just those who already have access. That conviction
                  is why I built the <span className="font-semibold" style={{ color: 'var(--primary)' }}>Queer Data Network</span> and
                  why I keep mentoring emerging talent in the field.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Technical Expertise</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>AI & Machine Learning</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>RAG Pipelines, LangChain, Ollama</div>
                    <div>PyTorch, Keras, TensorFlow</div>
                    <div>Computer Vision (Apple Vision, OpenCV)</div>
                    <div>LLM Integration & Prompt Engineering</div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--secondary)' }}>Data Engineering & Analysis</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>Python, SQL, R</div>
                    <div>Airflow, dbt, ETL/ELT</div>
                    <div>BigQuery, Snowflake, Azure Cosmos DB</div>
                    <div>Data Pipelines & Warehousing</div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--secondary)' }}>Cloud & Infrastructure</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>Microsoft Azure (Functions, Static Web Apps)</div>
                    <div>Databricks, Apache Spark</div>
                    <div>Git, GitHub Actions, CI/CD</div>
                    <div>Docker, Serverless Architecture</div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>Full-Stack & Product</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>React, Next.js, TypeScript</div>
                    <div>Python Flask, REST API Design</div>
                    <div>Streamlit, Tableau, Power BI</div>
                    <div>Data Governance, A/B Testing</div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Professional Interests & Innovation</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  {/* <div className="text-2xl mb-3">🤖</div> */}
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>AI as a Product</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Running RAG and agentic prototypes is one thing - shipping them responsibly is another. I design
                    guardrails, run A/B tests on model changes, monitor SLA impact, and only scale what genuinely
                    proves value to users.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  {/* <div className="text-2xl mb-3">🔊</div> */}
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--secondary)' }}>Data + Creativity</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Creator of Musical Weather - a system that combines Spotify data with regional weather patterns
                    to surface local artists whose sound matches today&apos;s forecast. Sometimes the best data
                    product is just a delightful one.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  {/* <div className="text-2xl mb-3">🌱</div> */}
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--secondary)' }}>Mentorship & Growth</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Committed to nurturing the next generation of data professionals. I want people to understand
                    not just what a model does, but why it&apos;s safe to trust - that understanding makes teams
                    genuinely effective rather than just model-dependent.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  {/* <div className="text-2xl mb-3">🇪🇸</div> */}
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>Language Learning</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Currently learning Spanish on Duolingo - Level 14 and genuinely enjoying it.
                    It turns out keeping a streak alive has a lot in common with good data hygiene: small,
                    consistent effort compounds faster than you expect.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Current Focus Areas</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                    <span className="text-gray-300 text-sm">Real-time Analytics Platforms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                    <span className="text-gray-300 text-sm">Machine Learning Operations (MLOps)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                    <span className="text-gray-300 text-sm">Sustainable Data Practices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                    <span className="text-gray-300 text-sm">Edge Computing for Analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                    <span className="text-gray-300 text-sm">Privacy-Preserving Analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                    <span className="text-gray-300 text-sm">Natural Language to SQL</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Education & Continuous Learning</h2>
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Bachelor of Applied Science</h3>
                    <p className="font-medium" style={{ color: 'var(--primary)' }}>Data Management and Analysis</p>
                    <p className="text-gray-400">Bellevue College</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">2018 - 2024</p>
                    <p className="font-semibold" style={{ color: 'var(--secondary)' }}>GPA: 3.82</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Completed while working full-time, demonstrating commitment to continuous learning and professional growth. 
                  Coursework included advanced statistical methods, machine learning algorithms, and hands-on experience with 
                  enterprise data tools.
                </p>
                <div className="border-t border-gray-600 pt-4">
                  <p className="text-gray-400 text-xs">
                    <strong>Key Courses:</strong> Econometrics (R), Predictive Analytics (Python/R), Advanced Marketing Analytics (Tableau), 
                    Multivariate Analysis (R), Applied Statistical Methods (Python), Business Intelligence Applications, 
                    Database Theory, Data Visualization, Systems Analysis and Design
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
              <div className="rounded-lg p-6 border" style={{ backgroundColor: 'rgba(15, 156, 112, 0.1)', borderColor: 'var(--secondary)' }}>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Always happy to connect with other data professionals, potential collaborators, or anyone
                  trying to ship AI-powered tools that actually work. If you&apos;re working on democratizing
                  data access or building thoughtful, measurable AI systems - let&apos;s talk.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a 
                    href="mailto:eight-amens76@icloud.com" 
                    className="px-4 py-2 rounded-lg transition-colors text-white font-medium hover:opacity-90"
                    style={{ backgroundColor: 'var(--secondary)' }}
                  >
                    Get in Touch
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/mattie-graham/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg transition-colors text-white font-medium hover:opacity-90"
                    style={{ backgroundColor: 'var(--secondary)' }}
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/mattieg93" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white font-medium"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}