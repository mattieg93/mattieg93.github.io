export function About() {
  return (
    <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">A little about me</h2>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary)' }}></div>
        </div>

        <div className="grid gap-6 text-lg leading-relaxed">
          <p className="text-gray-900 dark:text-white">
            I&apos;m an <span className="font-bold">AI &amp; Analytics Engineer</span> who builds
            self-serve, AI-powered data products so every team can turn messy enterprise data into
            clear, confident decisions - without needing to ping an analyst.
          </p>

          <p className="text-gray-900 dark:text-white">
            I leverage 9+ years supporting major tech orgs
            (<span className="font-bold">Meta, Microsoft</span>) to design
            and ship applications that wrap AI and analytics in friendly interfaces. My work has automated
            <span className="font-bold"> 160+ analyst hours per month</span>, guided over
            <span className="font-bold"> $9B+ in total business impact</span> ($2B saved, $7B assets managed), and kept
            data trustworthy through governance across
            <span className="font-bold"> 200+ reports</span>.
          </p>

          <p className="text-gray-900 dark:text-white">
            I treat AI like a product - not a magic trick. I design A/B tests for model changes, run RAG and
            agentic prototypes with guardrails, and only scale what proves real value. I love mentoring teams
            through that process so they understand not just what the model does, but why it&apos;s safe to trust.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>9+</div>
            <div className="text-gray-700 dark:text-white text-sm">Years Experience</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--secondary)' }}>$9B+</div>
            <div className="text-gray-700 dark:text-white text-sm">Total Business Impact</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--secondary)' }}>160+</div>
            <div className="text-gray-700 dark:text-white text-sm">Analyst Hours/Month Saved</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>200+</div>
            <div className="text-gray-700 dark:text-white text-sm">Reports Governed</div>
          </div>
        </div>
      </div>
    </section>
  );
}