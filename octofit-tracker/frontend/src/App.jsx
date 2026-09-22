import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1>Train together. Go further.</h1>
        </div>
        <span className="status-dot">API online</span>
      </header>
      <nav className="app-nav" aria-label="Main navigation">
        {[['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'Users'], ['/workouts', 'Workouts']].map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
        ))}
      </nav>
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">YOUR TRAINING HQ</p>
      <h2>Small wins add up.</h2>
      <p className="lead">Track the work, see your team move, and keep your next session close.</p>
      <div className="overview-grid">
        <NavLink to="/activities" className="overview-link">Log activity <span>→</span></NavLink>
        <NavLink to="/workouts" className="overview-link">Find a workout <span>→</span></NavLink>
      </div>
    </section>
  )
}

export default App
