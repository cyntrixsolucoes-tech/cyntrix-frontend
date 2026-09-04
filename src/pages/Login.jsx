import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

 const handleLogin = async (e) => {
  e.preventDefault()
  setError('')
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const response = await fetch(`${apiUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    const data = await response.json()
    
    if (response.ok && data.success) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.user.name)
      navigate('/dashboard')
    } else {
      setError(data.error || 'Erro ao fazer login')
    }
  } catch (err) {
    setError('Erro de conexão: ' + err.message)
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
