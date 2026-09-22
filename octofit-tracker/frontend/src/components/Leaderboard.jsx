import { useEffect, useState } from 'react'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('Loading leaderboard...')

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/'
    fetch(apiUrl).then((response) => response.json()).then((payload) => {
      setEntries(Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [])
      setStatus('')
    }).catch(() => setStatus('Unable to load leaderboard.'))
  }, [])

  return <section className="data-section"><div className="section-heading"><p className="eyebrow">TEAM ENERGY</p><h2>Leaderboard</h2></div>{status ? <p className="muted">{status}</p> : <div className="leaderboard-list">{entries.length ? entries.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999)).map((entry, index) => <div className="leaderboard-row" key={entry._id ?? index}><span className="rank">{entry.rank ?? index + 1}</span><span className="member-name">{entry.user?.name ?? String(entry.user ?? 'Athlete')}</span><strong>{entry.points ?? 0} pts</strong></div>) : <p>No scores yet.</p>}</div>}</section>
}

export default Leaderboard
