import { useEffect, useState } from 'react'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('Loading activities...')

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/'
    fetch(apiUrl)
      .then((response) => response.json())
      .then((payload) => {
        setActivities(Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [])
        setStatus('')
      })
      .catch(() => setStatus('Unable to load activities.'))
  }, [])

  return <DataTable title="Recent activities" status={status} columns={['Type', 'Duration', 'Calories', 'Completed']} rows={activities.map((activity) => [activity.type, `${activity.durationMinutes ?? '-'} min`, activity.calories ?? '-', activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '-'])} />
}

function DataTable({ title, status, columns, rows }) {
  return <section className="data-section"><div className="section-heading"><p className="eyebrow">MOVEMENT LOG</p><h2>{title}</h2></div>{status ? <p className="muted">{status}</p> : <div className="table-responsive"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>) : <tr><td colSpan={columns.length}>No records yet.</td></tr>}</tbody></table></div>}</section>
}

export default Activities
