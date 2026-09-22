import { useEffect, useState } from 'react'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('Loading teams...')

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/'
    fetch(apiUrl).then((response) => response.json()).then((payload) => {
      setTeams(Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [])
      setStatus('')
    }).catch(() => setStatus('Unable to load teams.'))
  }, [])

  return <section className="data-section"><div className="section-heading"><p className="eyebrow">FIND YOUR PEOPLE</p><h2>Teams</h2></div>{status ? <p className="muted">{status}</p> : <div className="team-grid">{teams.length ? teams.map((team, index) => <article className="team-card" key={team._id ?? index}><span className="team-swatch" style={{ backgroundColor: team.color ?? '#e76f51' }} /><h3>{team.name}</h3><p>{team.description}</p><small>{team.members?.length ?? 0} members</small></article>) : <p>No teams yet.</p>}</div>}</section>
}

export default Teams
