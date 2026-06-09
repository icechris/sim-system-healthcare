import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPreTest, getPostTest, getCompletedProcs } from '../lib/store'
import { procedures } from '../data/procedures'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [preTestDone, setPreTestDone] = useState(false)
  const [postTestDone, setPostTestDone] = useState(false)
  const [completedProcs, setCompletedProcs] = useState([])
  const [preTestDate, setPreTestDate] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('nurssim_student')
    if (!stored) { navigate('/register'); return }
    const s = JSON.parse(stored)
    setStudent(s)
    const pre = getPreTest(s.id)
    const post = getPostTest(s.id)
    const procs = getCompletedProcs(s.id)
    if (pre) { setPreTestDone(true); setPreTestDate(pre.created_at) }
    if (post) setPostTestDone(true)
    setCompletedProcs(procs)
  }, [])

  const isPostTestUnlocked = () => {
    if (!preTestDate) return false
    const diff = (new Date() - new Date(preTestDate)) / (1000 * 60 * 60 * 24 * 7)
    return diff >= 6
  }

  const logout = () => { localStorage.removeItem('nurssim_student'); navigate('/') }

  if (!student) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><div className="spinner" style={{ width: 36, height: 36 }} /></div>

  const isDSBL = student.group_type === 'DSBL'
  const pct = isDSBL ? Math.round((completedProcs.length / procedures.length) * 100) : (postTestDone ? 100 : preTestDone ? 50 : 0)
  const diffColor = { Foundational: 'var(--secondary)', Intermediate: 'var(--warning)', Advanced: 'var(--danger)' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--primary)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>⚕️</span>
          <span style={{ fontFamily: 'var(--font-heading)', color: 'white', fontWeight: 700, fontSize: 15 }}>NursSim Ghana</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>{student.full_name}</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>{student.university} · {student.year_group}</div>
          </div>
          <button onClick={logout} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '6px 13px', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '24px 20px' }}>
        {/* Welcome */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 3 }}>Welcome back, {student.full_name?.split(' ')[0]} 👋</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{student.group_type === 'DSBL' ? 'Digital Simulation Group' : 'Traditional Training Group'} · {student.student_id}</p>
          </div>
          <div className="card" style={{ padding: '14px 20px', textAlign: 'center', minWidth: 120 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>{pct}%</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Progress</div>
            <div style={{ height: 5, background: 'var(--border-light)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--primary)', borderRadius: 3, transition: 'width 0.5s' }} />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { n: 1, l: 'Pre-Test', ic: '📋', done: preTestDone, action: () => navigate('/pretest'), btn: preTestDone ? '✓ Completed' : 'Start Pre-Test', locked: false, c: 'var(--primary)' },
            { n: 2, l: isDSBL ? 'Simulations' : 'Traditional Training', ic: isDSBL ? '💻' : '👩‍🏫', done: isDSBL ? completedProcs.length === procedures.length : preTestDone, action: null, btn: isDSBL ? `${completedProcs.length}/${procedures.length} done` : 'Instructor-led training', locked: !preTestDone, c: 'var(--secondary)' },
            { n: 3, l: 'Post-Test', ic: '📊', done: postTestDone, action: () => navigate('/posttest'), btn: postTestDone ? '✓ Completed' : isPostTestUnlocked() ? 'Start Post-Test' : 'Unlocks after 6 weeks', locked: !isPostTestUnlocked() || !preTestDone, c: 'var(--accent)' },
          ].map(it => (
            <div key={it.n} className="card" style={{ padding: '16px', borderTop: `3px solid ${it.done ? it.c : 'var(--border-light)'}` }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{it.ic}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{it.n}. {it.l}</div>
              {it.action
                ? <button onClick={it.action} disabled={it.locked || it.done}
                    style={{ width: '100%', padding: '8px', border: 'none', borderRadius: 7, cursor: it.locked || it.done ? 'default' : 'pointer', fontSize: 12, fontWeight: 600,
                      background: it.done ? 'var(--accent-pale)' : it.locked ? 'var(--border-light)' : it.c,
                      color: it.done ? 'var(--accent)' : it.locked ? 'var(--text-muted)' : 'white' }}>
                    {it.btn}
                  </button>
                : <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{it.btn}</div>}
            </div>
          ))}
        </div>

        {/* Procedures */}
        <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700 }}>{isDSBL ? 'Digital Simulation Procedures' : 'Selected Procedures for Traditional Training'}</h2>
          {!preTestDone && <span style={{ fontSize: 12, color: 'var(--warning)', background: 'var(--warning-pale)', padding: '2px 10px', borderRadius: 20 }}>Complete pre-test to unlock</span>}
          {!isDSBL && preTestDone && <span style={{ fontSize: 12, color: 'var(--primary)', background: 'var(--primary-pale)', padding: '2px 10px', borderRadius: 20 }}>Traditional group: training is instructor-led, not digital simulation</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
          {procedures.map((proc) => {
            const done = completedProcs.includes(proc.id)
            const locked = !preTestDone || !isDSBL
            return (
              <div key={proc.id} className="card" style={{ padding: '16px', border: `1.5px solid ${done ? 'var(--secondary)' : 'var(--border-light)'}`, opacity: locked ? 0.6 : 1, transition: 'all 0.2s' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{proc.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{proc.title}</div>
                <div style={{ display: 'flex', gap: 5, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: `${diffColor[proc.difficulty]}20`, color: diffColor[proc.difficulty] }}>{proc.difficulty}</span>
                  {done && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: 'var(--secondary-pale)', color: 'var(--secondary)' }}>✓ Done</span>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>⏱ {proc.duration} · 🎯 {proc.steps.length} decisions</div>
                <button
                  onClick={() => !locked && navigate(`/simulation/${proc.id}`)}
                  disabled={locked}
                  style={{ width: '100%', padding: '9px', border: 'none', borderRadius: 7, cursor: locked ? 'default' : 'pointer', fontWeight: 600, fontSize: 12, transition: 'all 0.2s',
                    background: done ? 'var(--secondary-pale)' : locked ? 'var(--border-light)' : 'var(--primary)',
                    color: done ? 'var(--secondary)' : locked ? 'var(--text-muted)' : 'white' }}>
                  {!preTestDone ? '🔒 Pre-test first' : !isDSBL ? 'Instructor-led' : done ? '↻ Redo' : 'Start →'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
