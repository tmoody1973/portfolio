'use client'

import { useState, FormEvent } from 'react'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  message: string
}

/**
 * Contact form app with Ubuntu-inspired styling
 * Uses Resend API for email delivery
 */
export function ContactApp() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setStatus('idle')
    setErrorMessage('')
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-medium text-white mb-2">Message Sent!</h2>
        <p className="text-white/60 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a1a2e] to-transparent p-6 pb-4">
        <h1 className="text-2xl font-bold text-white mb-2">Get In Touch</h1>
        <p className="text-white/60">
          Have a question or want to work together? Send me a message.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
        {/* Error message */}
        {status === 'error' && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Name field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'sending'}
            className="
              w-full px-4 py-2.5
              bg-[#2d2d30] border border-white/10
              rounded-lg text-white
              placeholder:text-white/30
              focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
            placeholder="Your name"
          />
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'sending'}
            className="
              w-full px-4 py-2.5
              bg-[#2d2d30] border border-white/10
              rounded-lg text-white
              placeholder:text-white/30
              focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
            placeholder="you@example.com"
          />
        </div>

        {/* Message field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={status === 'sending'}
            rows={5}
            className="
              w-full px-4 py-2.5
              bg-[#2d2d30] border border-white/10
              rounded-lg text-white
              placeholder:text-white/30
              focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
              resize-none
            "
            placeholder="What's on your mind?"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="
            w-full py-3
            bg-orange-500 hover:bg-orange-600
            disabled:bg-orange-500/50 disabled:cursor-not-allowed
            text-white font-medium
            rounded-lg
            transition-colors
            flex items-center justify-center gap-2
          "
        >
          {status === 'sending' ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Message
            </>
          )}
        </button>

        {/* Alternative contact */}
        <p className="text-center text-white/40 text-sm pt-2">
          Or email me directly at{' '}
          <a
            href="mailto:tarikjmoody@gmail.com"
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            tarikjmoody@gmail.com
          </a>
        </p>
      </form>
    </div>
  )
}

export default ContactApp
