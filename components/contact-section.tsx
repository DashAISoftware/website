'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg">
          Have questions or feedback about DashAI? Feel free to get in touch — we’d love to hear from you.
          </p>
        </div>

        <form className="space-y-6" method='Post' action={"https://formsubmit.co/f3a0c12371fc03abba59a65a3db14338"}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
          <input type="hidden" name="_subject" value={`Nuevo mensaje de contacto de DashAI - ${formData.name}`} />

          <div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-6 py-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-6 text-lg font-medium cursor-pointer"
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send message'}
          </Button>

          {status === 'success' && (
            <p className="text-center text-primary animate-in fade-in duration-300">
              Thank you for contacting us! We will get back to you soon.
            </p>
          )}

          {status === 'error' && (
            <p className="text-center text-red-500 animate-in fade-in duration-300">
              There was an error. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
