import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    login(email)
    navigate('/products')
  }

  return (
    <section className="static-page login-page">
      <div className="section-heading">
        <span className="section-eyebrow">Members</span>
        <h2>Sign In</h2>
      </div>

      <div className="login-form-wrap">
        <form className="inquiry-form login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        <p className="login-note">
          This is a demo login — any email and password will sign you in.
        </p>
      </div>
    </section>
  )
}

export default Login
