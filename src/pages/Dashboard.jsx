import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://cyntrix-backend.onrender.com'
    
    fetch(`${apiUrl}/api/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Erro ao buscar projetos:', err)
        setLoading(false)
      })
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>📊 Painel de Projetos</h1>
      <p>Bem-vindo, <strong>{userName}</strong>!</p>
      
      <div style={{marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
        <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'white'}}>
          <h3>📋 Projetos em Andamento</h3>
          <p style={{marginTop: '10px', color: '#666', fontWeight: 'bold'}}>
            {loading ? 'Carregando...' : `${projects.length} projeto(s)`}
          </p>
          {projects.map(p => (
            <div key={p.id} style={{marginTop: '10px', padding: '10px', background: '#f3f4f6', borderRadius: '4px'}}>
              <p style={{margin: 0, fontSize: '14px'}}>{p.name}</p>
            </div>
          ))}
        </div>
        <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'white'}}>
          <h3>✅ Concluídos</h3>
          <p style={{marginTop: '10px', color: '#666'}}>0 projetos</p>
        </div>
        <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'white'}}>
          <h3>📝 Atas</h3>
          <p style={{marginTop: '10px', color: '#666'}}>0 atas</p>
        </div>
      </div>

      <button onClick={handleLogout} style={{marginTop: '30px', padding: '10px 20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Sair</button>
    </div>
  )
}
