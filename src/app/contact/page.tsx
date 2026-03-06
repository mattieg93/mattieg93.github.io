import ContactForm from '@/components/contact-form';
import SocialLinks from '@/components/social-links';
import ContactInfo from '@/components/contact-info';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--secondary)' }}>
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to collaborate on your next data project? I'd love to hear from you. 
            Whether you have a question, project idea, or just want to connect, let's start a conversation.
          </p>
          <div className="w-24 h-1 mx-auto mt-8" style={{ backgroundColor: 'var(--secondary)' }}></div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Contact Form */}
          <div>
            <ContactForm />
          </div>
          
          {/* Right Column - Contact Info */}
          <div className="space-y-8">
            <ContactInfo />
            <SocialLinks />
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="rounded-2xl p-8 border text-center" style={{ backgroundColor: 'rgba(15, 156, 112, 0.1)', borderColor: 'var(--secondary)' }}>
          <h2 className="text-3xl font-bold mb-4 text-white">
            Let's Build Something That Works
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I build AI-powered data systems that ship - from RAG pipelines and ML models
            to full-stack analytics tooling. If you need production-grade AI engineering,
            automated data pipelines, or a working MVP in under a month, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.upwork.com/freelancers/mattiegraham"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#00bdaa] hover:bg-[#00a896] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-flex"
            >
              <img 
                src="/assets/icons/upwork.png" 
                alt="Upwork" 
                className="h-5 w-5"
              />
              Upwork Profile
            </a>
            <a
              href="mailto:eight-amens76@icloud.com"
              className="text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center hover:opacity-90"
              style={{ backgroundColor: 'var(--secondary)' }}
            >
              Send Email Directly
            </a>
            <a
              href="/resume"
              className="border font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              View My Resume
            </a>
          </div>        
        </div>
      </div>
    </div>
  );
}
