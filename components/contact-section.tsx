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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const formPayload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `Nuevo mensaje de contacto de DashAI - ${formData.name}`,
      }

      console.log('Sending form data:', formPayload)

      const response = await fetch(`https://formspree.io/f/mnnwakle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formPayload),
      })

      const responseData = await response.json()
      console.log('Formspree response:', response.status, responseData)

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        // Mostrar error más específico
        const errorMessage = responseData.error || responseData.message || 'Error al enviar el mensaje'
        console.error('Formspree error:', responseData)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

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

        <form onSubmit={handleSubmit} className="space-y-6">
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
