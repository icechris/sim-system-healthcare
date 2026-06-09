import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerStudent, getStudentById } from '../lib/store'

export default function Register() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('new')
  const [form, setForm] = useState({ full_name: '', student_id: '', university: '', year_group: '', gender: '', age: '', group_type: '' })
  const [loginId, setLoginId] = useState('')
  const [error, setError] = useState('')

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleRegister = (e) => {
    e.preventDefault()
    if (!form.full_name || !form.student_id || !form.university || !form.year_group || !form.group_type) {
      setError('Please fill in all required fields.'); return
    }
    try {
      const student = registerStudent({ ...form, age: form.age ? parseInt(form.age) : null })
      localStorage.setItem('nurssim_student', JSON.stringify(student))
      navigate('/dashboard')
    } catch (err) {
      if (err.message === 'DUPLICATE') setError('That Student ID is already registered. Use "Returning Student" to continue.')
      else setError('Something went wrong. Please try again.')
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!loginId.trim()) { setError('Please enter your Student ID.'); return }
    const student = getStudentById(loginId.trim())
    if (!student) { setError('Student ID not found. Please register as a new student.'); return }
    localStorage.setItem('nurssim_student', JSON.stringify(student))
    navigate('/dashboard')
  }

  const inp = { className: 'form-input' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>
      {/* Left panel */}
      <div style={{ width: 340, background: 'linear-gradient(160deg, #1B4F72, #17A589)', padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.14)', border: 'none', color: 'white', padding: '7px 13px', borderRadius: 8, cursor: 'pointer', fontSize: 13, marginBottom: 36 }}>← Back</button>
          <div style={{ fontSize: 38, marginBottom: 12 }}>⚕️</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>NursSim Ghana</h2>
          <p style={{ color: 'rgba(255,255,255,0.74)', fontSize: 13, lineHeight: 1.8 }}>A digital simulation-based learning platform for undergraduate nursing students. Watch clinical videos, practice interactive scenarios, and track your progress.</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 16 }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.7, fontStyle: 'italic' }}>"Simulation allows learners to practise, make mistakes safely, and build confidence before touching real patients."</p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, marginTop: 8 }}>— Jeffries Simulation Framework</p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 36, overflow: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 480 }}>
          <div style={{ display: 'flex', background: 'var(--border-light)', borderRadius: 10, padding: 4, marginBottom: 26 }}>
            {[['new', 'New Student'], ['returning', 'Returning Student']].map(([v, l]) => (
              <button key={v} onClick={() => { setTab(v); setError('') }}
                style={{ flex: 1, padding: '9px', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                  background: tab === v ? 'white' : 'transparent',
                  color: tab === v ? 'var(--primary)' : 'var(--text-muted)',
                  boxShadow: tab === v ? 'var(--shadow-sm)' : 'none' }}>
                {l}
              </button>
            ))}
          </div>

          {tab === 'new' ? (
            <>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Create your account</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 22 }}>Fill in your details to get started.</p>
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
                  <div><label className="form-label">Full Name *</label><input {...inp} required placeholder="Your full name" value={form.full_name} onChange={e => update('full_name', e.target.value)} /></div>
                  <div><label className="form-label">Student ID *</label><input {...inp} required placeholder="e.g. UG/2024/001" value={form.student_id} onChange={e => update('student_id', e.target.value)} /></div>
                </div>
                <div>
                  <label className="form-label">University *</label>
                  <select {...inp} required value={form.university} onChange={e => update('university', e.target.value)}>
                    <option value="">Select your university</option>
                    <option>University of Ghana</option>
                    <option>Central University</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
                  <div>
                    <label className="form-label">Year Group *</label>
                    <select {...inp} required value={form.year_group} onChange={e => update('year_group', e.target.value)}>
                      <option value="">Select year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Training Group *</label>
                    <select {...inp} required value={form.group_type} onChange={e => update('group_type', e.target.value)}>
                      <option value="">Select group</option>
                      <option value="DSBL">DSBL (Simulation)</option>
                      <option value="Traditional">Traditional</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
                  <div>
                    <label className="form-label">Gender</label>
                    <select {...inp} value={form.gender} onChange={e => update('gender', e.target.value)}>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Age</label>
                    <input {...inp} type="number" min="18" max="60" placeholder="Your age" value={form.age} onChange={e => update('age', e.target.value)} />
                  </div>
                </div>
                {error && <div style={{ background: 'var(--danger-pale)', color: 'var(--danger)', padding: '10px 14px', borderRadius: 8, fontSize: 13 }}>{error}</div>}
                <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '13px', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                  Create Account & Start →
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Welcome back</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 22 }}>Enter your Student ID to continue where you left off.</p>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                <div>
                  <label className="form-label">Student ID</label>
                  <input {...inp} required placeholder="e.g. UG/2024/001" value={loginId} onChange={e => setLoginId(e.target.value)} />
                </div>
                {error && <div style={{ background: 'var(--danger-pale)', color: 'var(--danger)', padding: '10px 14px', borderRadius: 8, fontSize: 13 }}>{error}</div>}
                <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '13px', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                  Continue Learning →
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
