import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Container */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div 
              className="w-80 h-80 rounded-2xl overflow-hidden border-2 shadow-2xl"
              style={{
                borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)',
                boxShadow: '0 25px 50px -12px color-mix(in srgb, var(--primary) 20%, transparent)'
              }}
            >
              <Image
                src="/assets/images/1843.png"
                alt="Mattie #1843"
                width={320}
                height={320}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              <span className="text-sm text-gray-300">Mattie #1843</span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center lg:text-left">
          {/* Pills row */}
          <div className="flex flex-wrap gap-2 mb-6">
            {/* Available badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium"
              style={{
                borderColor: 'color-mix(in srgb, var(--secondary) 40%, transparent)',
                backgroundColor: 'color-mix(in srgb, var(--secondary) 10%, transparent)',
                color: 'var(--secondary)'
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse flex-shrink-0" />
              Available for work
            </div>

            {/* Upwork badge - now clickable */}
            <a
              href="https://www.upwork.com/freelancers/mattiegraham"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium transition-colors duration-200 hover:bg-[#00bdaa]/10 cursor-pointer"
              style={{
                borderColor: 'color-mix(in srgb, var(--secondary) 40%, transparent)',
                backgroundColor: 'color-mix(in srgb, var(--secondary) 10%, transparent)',
                color: 'var(--secondary)'
              }}
            >
              <img 
                src="/assets/icons/upwork.png" 
                alt="Upwork" 
                className="h-3.5 w-3.5 flex-shrink-0 object-contain" 
                loading="lazy"
              />
              View on Upwork
            </a>
          </div>          
          <div className="mb-6">
            <h1
              className="text-5xl lg:text-6xl font-bold mb-3"
              style={{
                color: 'var(--primary)'
              }}
            >
              Mattie Graham
            </h1>
            <p className="text-xl lg:text-2xl font-semibold mb-4" style={{ color: 'var(--secondary)' }}>
              AI &amp; Analytics Engineer
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I build
              <span className="font-semibold" style={{ color: 'var(--primary)' }}> AI-powered data systems</span> -
              from RAG pipelines and computer vision to full-stack analytics platforms.
              I turn messy data and manual processes into
              <span className="font-semibold" style={{ color: 'var(--secondary)' }}> automated, production-ready tools</span> that
              deliver measurable outcomes.
            </p>
          </div>

          {/* Outcome pills */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
            {['$9B+ impact quantified', '4 AI production models', '12+ ML production models', '60% study time saved', '1-month production MVPs', '110K+ MTG cards analyzed'].map((stat) => (
              <span
                key={stat}
                className="text-xs px-3 py-1 rounded-full border text-gray-300"
                style={{ borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)', backgroundColor: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}
              >
                {stat}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/projects"
              className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white"
              style={{
                backgroundColor: 'var(--primary)'
              }}
            >
              See My Work
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-gray-600 rounded-lg font-semibold transition-all duration-300 hero-button-primary"
            >
              Work With Me
            </Link>
            <Link
              href="/resume"
              className="px-8 py-4 border border-gray-600 rounded-lg font-semibold transition-all duration-300 hero-button-secondary"
            >
              View Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}