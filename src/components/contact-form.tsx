'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ─── EmailJS setup (no server required - sends directly to your inbox) ─────
  // Values are loaded from environment variables (see .env.local).
  // Set NEXT_PUBLIC_EMAILJS_* in .env.local for local dev.
  // Add them as GitHub repo secrets for deployed builds (see .env.local.example).
  // ─────────────────────────────────────────────────────────────────────────────
  const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? '';
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
  const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          subject:    formData.subject,
          message:    formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-lg text-sm transition-colors outline-none focus:ring-2";
  const inputStyle = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    color: "var(--fg)",
  } as React.CSSProperties;

  return (
    <div className="card p-8">
      <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--fg)" }}>
        Send a Message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-xs font-medium mb-1.5" style={{ color: "var(--fg-muted)" }}>
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputCls}
              style={inputStyle}
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium mb-1.5" style={{ color: "var(--fg-muted)" }}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputCls}
              style={inputStyle}
              placeholder="jane@company.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-medium mb-1.5" style={{ color: "var(--fg-muted)" }}>
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={inputCls}
            style={inputStyle}
            placeholder="Project Collaboration"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-medium mb-1.5" style={{ color: "var(--fg-muted)" }}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className={`${inputCls} resize-vertical`}
            style={inputStyle}
            placeholder="Tell me about your project or how we can work together..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <FaPaperPlane />
              <span>Send Message</span>
            </>
          )}
        </button>

        {submitStatus === "success" && (
          <div
            className="rounded-lg p-4 text-sm"
            style={{
              background: "color-mix(in srgb, var(--success) 12%, transparent)",
              border: "1px solid color-mix(in srgb, var(--success) 35%, transparent)",
              color: "var(--success)",
            }}
          >
            Message sent! I&apos;ll get back to you soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div
            className="rounded-lg p-4 text-sm"
            style={{
              background: "color-mix(in srgb, var(--error) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--error) 30%, transparent)",
              color: "var(--error)",
            }}
          >
            There was an error sending your message. Please try again or email me directly.
          </div>
        )}
      </form>
    </div>
  );
}