import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password.length >= 3) {
      localStorage.setItem('token', 'demo-token-' + Date.now())
      localStorage.setItem('userName', email.split('@')[0])
      navigate('/dashboard')
    } else {
      setError('Preencha todos os campos')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🏢 Portal Cyntrix</h1>
        <p>Acompanhamento de Projetos</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="seu@email.com" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="senha" 
            required 
          />
          <button type="submit">Entrar</button>
        </form>
        <p style={{fontSize: '12px', marginTop: '20px', color: '#666'}}>
          Demo: use qualquer email e senha com 3+ caracteres
        </p>
      </div>
    </div>
  )
}
