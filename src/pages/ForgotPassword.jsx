import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import Logo from '../components/Logo'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setSubmitted(true)
      toast.success('Password reset instructions sent to your email!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="auth-container">
        <Logo />
        <h2>Check Your Email</h2>
        <div className="message-box">
          <p>We've sent password reset instructions to {email}</p>
          <p>Please check your email and follow the instructions to reset your password.</p>
        </div>
        <div className="auth-links">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <Logo />
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Reset Password'}
        </button>
      </form>
      <div className="auth-links">
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  )
}

export default ForgotPassword
