import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName')

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
          <p style={{marginTop: '10px', color: '#666'}}>0 projetos</p>
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

      <button onClick={handleLogout} style={{marginTop: '30px'}}>Sair</button>
    </div>
  )
}
