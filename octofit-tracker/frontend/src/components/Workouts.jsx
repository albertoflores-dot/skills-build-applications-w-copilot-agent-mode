import { useEffect, useState } from 'react'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('Loading workouts...')

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/'
    fetch(apiUrl).then((response) => response.json()).then((payload) => {
      setWorkouts(Array.isArray(payload) ? payload : payload.data ?? payload.results ?? [])
      setStatus('')
    }).catch(() => setStatus('Unable to load workouts.'))
  }, [])

  return <section className="data-section"><div className="section-heading"><p className="eyebrow">YOUR NEXT SESSION</p><h2>Workouts</h2></div>{status ? <p className="muted">{status}</p> : <div className="workout-grid">{workouts.length ? workouts.map((workout, index) => <article className="workout-card" key={workout._id ?? index}><div className="workout-meta"><span>{workout.type ?? 'Training'}</span><span>{workout.durationMinutes ?? '-'} min</span></div><h3>{workout.title ?? 'Untitled workout'}</h3><p>{workout.difficulty ?? 'All levels'}</p><small>{workout.exercises?.length ?? 0} exercises</small></article>) : <p>No workouts yet.</p>}</div>}</section>
}

export default Workouts
