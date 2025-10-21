import { NextRequest, NextResponse } from 'next/server'

// Simple email sending function using fetch (works with most email services)
async function sendEmail(data: {
  name: string
  email: string
  message: string
  to: string
}) {
  // Option 1: Using EmailJS (free service, no backend required)
  // You can sign up at https://www.emailjs.com/
  const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY

  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: data.name,
            from_email: data.email,
            to_email: data.to,
            message: data.message,
            reply_to: data.email,
          }
        })
      })

      if (response.ok) {
        return { success: true, method: 'EmailJS' }
      }
    } catch (error) {
      console.error('EmailJS error:', error)
    }
  }

  // Option 2: Using Resend (recommended for production)
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@starsolution.ai',
          to: [data.to],
          subject: `New Feedback from ${data.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
                New Feedback Submission
              </h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h3 style="color: #333; margin-top: 0;">Message:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
              </div>
              <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 4px;">
                <p style="margin: 0; color: #0369a1;">
                  <strong>Reply to:</strong> ${data.email}
                </p>
              </div>
            </div>
          `
        })
      })

      if (response.ok) {
        return { success: true, method: 'Resend' }
      }
    } catch (error) {
      console.error('Resend error:', error)
    }
  }

  // Fallback: Just log to console (for development)
  console.log('=== NEW FEEDBACK SUBMISSION ===')
  console.log('Name:', data.name)
  console.log('Email:', data.email)
  console.log('Message:', data.message)
  console.log('To:', data.to)
  console.log('Timestamp:', new Date().toISOString())
  console.log('================================')

  return { success: true, method: 'Console Log' }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, to } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email
    const result = await sendEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      to: to || 'info@starsolution.ai'
    })

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: `Feedback received successfully via ${result.method}`,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      )
    } else {
      throw new Error('Failed to send email')
    }

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process feedback. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint - POST only' },
    { status: 405 }
  )
}
