import { FaMapMarkerAlt, FaClock, FaPhone, FaCalendarAlt } from 'react-icons/fa';

export default function ContactInfo() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
      <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
            <FaMapMarkerAlt className="text-purple-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Location</h4>
            <p className="text-gray-400">
              Based in the United States<br />
              Open to remote work opportunities
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
            <FaClock style={{ color: 'var(--secondary)' }} />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Response Time</h4>
            <p className="text-gray-400">
              I typically respond within 24-48 hours<br />
              Faster response for urgent inquiries
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
            <FaCalendarAlt className="text-emerald-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Availability</h4>
            <p className="text-gray-400">
              Available for Upwork projects<br />
              AI engineering, data pipelines, analytics tooling
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg border" style={{ backgroundColor: 'rgba(15, 156, 112, 0.1)', borderColor: 'var(--secondary)' }}>
        <h4 className="font-semibold text-white mb-2">Interested in collaboration?</h4>
        <p className="text-gray-300 text-sm">
          I build AI-powered data systems that ship to production - RAG pipelines, ML models, 
          analytics automation, and full-stack tooling. Let's discuss your project.
        </p>
      </div>
    </div>
  );
}