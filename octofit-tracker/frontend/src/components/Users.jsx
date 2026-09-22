import { useEffect, useState } from 'react'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('Loading users...')

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/'
    fetch(apiUrl).then((response) => response.json()).then((payload) => {
      setUsers(Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [])
      setStatus('')
    }).catch(() => setStatus('Unable to load users.'))
  }, [])

  return <section className="data-section"><div className="section-heading"><p className="eyebrow">THE COMMUNITY</p><h2>Users</h2></div>{status ? <p className="muted">{status}</p> : <div className="user-grid">{users.length ? users.map((user, index) => <article className="user-card" key={user._id ?? index}><span className="avatar">{user.avatar ?? user.name?.slice(0, 2).toUpperCase() ?? 'OF'}</span><div><h3>{user.name ?? 'Octofit athlete'}</h3><p>{user.email ?? 'Ready to train'}</p></div></article>) : <p>No users yet.</p>}</div>}</section>
}

export default Users
