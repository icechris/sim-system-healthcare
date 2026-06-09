import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { savePreTest, savePostTest, getPreTest, getPostTest } from '../lib/store'
import { allSections, likertScale } from '../data/questionnaire'

export default function TestPage({ isPost = false }) {
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [responses, setResponses] = useState({})
  const [currentSection, setCurrentSection] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [alreadyDone, setAlreadyDone] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('nurssim_student')
    if (!stored) { navigate('/register'); return }
    const s = JSON.parse(stored)
    setStudent(s)
    const existing = isPost ? getPostTest(s.id) : getPreTest(s.id)
    if (existing) setAlreadyDone(true)
  }, [])

  const section = allSections[currentSection]
  const totalItems = allSections.reduce((a, s) => a + s.items.length, 0)
  const answeredItems = Object.keys(responses).length
  const sectionAnswered = section?.items.every(item => responses[item.id])

  const calcScore = (sectionId) => {
    const sec = allSections.find(s => s.id === sectionId)
    return sec ? sec.items.reduce((a, item) => a + (responses[item.id] || 0), 0) : 0
  }

  const handleSubmit = () => {
    if (answeredItems < totalItems) return
    const ctScores = {}, confScores = {}, compScores = {}
    allSections[0].items.forEach(i => { ctScores[i.id] = responses[i.id] })
    allSections[1].items.forEach(i => { confScores[i.id] = responses[i.id] })
    allSections[2].items.forEach(i => { compScores[i.id] = responses[i.id] })
    const payload = {
      critical_thinking_scores: ctScores,
      confidence_scores: confScores,
      competence_scores: compScores,
      total_ct_score: calcScore('critical_thinking'),
      total_conf_score: calcScore('confidence'),
      total_comp_score: calcScore('competence'),
    }
    if (isPost) savePostTest(student.id, payload)
    else savePreTest(student.id, payload)
    setSubmitted(true)
  }

  if (alreadyDone) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="card" style={{ padding: 40, maxWidth: 420, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Already Completed</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>You have already submitted your {isPost ? 'post' : 'pre'}-test. Your responses have been saved.</p>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 28px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Back to Dashboard</button>
      </div>
    </div>
  )

  if (submitted) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="card animate-fade" style={{ padding: 44, maxWidth: 480, textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{isPost ? 'Post-Test Complete!' : 'Pre-Test Complete!'}</h2>
        <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          {allSections.map(s => (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: 'var(--text-muted)' }}>{s.title.split(': ')[1]}</span>
              <strong style={{ color: s.color }}>{calcScore(s.id)} / {s.items.length * 5}</strong>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border-light)', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <strong style={{ color: 'var(--primary)' }}>{allSections.reduce((a, s) => a + calcScore(s.id), 0)} / {totalItems * 5}</strong>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
          {isPost ? 'Thank you for completing the study!' : student?.group_type === 'DSBL' ? 'You can now access the simulation modules.' : 'Please attend the instructor-led traditional training as scheduled.'}
        </p>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 28px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>Back to Dashboard</button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--primary)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '7px 13px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>← Dashboard</button>
          <span style={{ fontFamily: 'var(--font-heading)', color: 'white', fontWeight: 700, fontSize: 15 }}>{isPost ? 'Post-Intervention Assessment' : 'Pre-Intervention Assessment'}</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>{answeredItems} / {totalItems} answered</span>
      </div>
      <div style={{ height: 4, background: 'var(--border-light)' }}>
        <div style={{ height: '100%', width: `${(answeredItems / totalItems) * 100}%`, background: 'var(--secondary)', transition: 'width 0.3s' }} />
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '24px 20px' }}>
        {/* Section tabs */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 18, flexWrap: 'wrap' }}>
          {allSections.map((s, i) => {
            const done = s.items.every(item => responses[item.id])
            return (
              <button key={s.id} onClick={() => setCurrentSection(i)}
                style={{ padding: '7px 14px', border: `1.5px solid ${currentSection === i ? s.color : done ? s.color : 'var(--border)'}`, borderRadius: 20, cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'all 0.2s',
                  background: currentSection === i ? s.color : 'transparent',
                  color: currentSection === i ? 'white' : done ? s.color : 'var(--text-muted)' }}>
                {done ? '✓ ' : ''}{s.title}
              </button>
            )
          })}
        </div>

        {/* Section header */}
        <div className="card" style={{ padding: '14px 18px', marginBottom: 16, borderLeft: `4px solid ${section.color}` }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: section.color, marginBottom: 3 }}>{section.title}</div>
          <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 10 }}>{section.description}</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {likertScale.map(s => (
              <div key={s.value} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg)', padding: '3px 2px', borderRadius: 5 }}>
                <div style={{ fontWeight: 700, color: section.color }}>{s.value}</div>
                <div style={{ lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {section.items.map((item, idx) => {
            const answered = responses[item.id]
            return (
              <div key={item.id} className="card" style={{ padding: '12px 16px', border: `1.5px solid ${answered ? section.color + '50' : 'var(--border-light)'}`, transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <p style={{ fontSize: 13, lineHeight: 1.6, flex: 1 }}><span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginRight: 6 }}>Q{idx + 1}</span>{item.text}</p>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    {likertScale.map(scale => (
                      <button key={scale.value} onClick={() => setResponses(r => ({ ...r, [item.id]: scale.value }))}
                        style={{ width: 34, height: 34, border: 'none', borderRadius: 7, cursor: 'pointer', fontWeight: 700, fontSize: 13, transition: 'all 0.15s',
                          background: answered === scale.value ? section.color : 'var(--bg)',
                          color: answered === scale.value ? 'white' : 'var(--text-muted)',
                          transform: answered === scale.value ? 'scale(1.12)' : 'scale(1)' }}>
                        {scale.value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
          <button onClick={() => setCurrentSection(p => Math.max(0, p - 1))} disabled={currentSection === 0}
            style={{ background: 'var(--surface)', color: 'var(--primary)', border: '1.5px solid var(--border)', padding: '10px 20px', borderRadius: 8, cursor: currentSection === 0 ? 'default' : 'pointer', fontWeight: 600, fontSize: 13, opacity: currentSection === 0 ? 0.4 : 1 }}>
            ← Previous
          </button>
          {currentSection < allSections.length - 1
            ? <button onClick={() => setCurrentSection(p => p + 1)} disabled={!sectionAnswered}
                style={{ background: sectionAnswered ? section.color : 'var(--border)', color: sectionAnswered ? 'white' : 'var(--text-muted)', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: sectionAnswered ? 'pointer' : 'default', fontWeight: 600, fontSize: 13 }}>
                Next Section →
              </button>
            : <button onClick={handleSubmit} disabled={answeredItems < totalItems}
                style={{ background: answeredItems === totalItems ? 'var(--accent)' : 'var(--border)', color: answeredItems === totalItems ? 'white' : 'var(--text-muted)', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: answeredItems === totalItems ? 'pointer' : 'default', fontWeight: 600, fontSize: 13 }}>
                ✓ Submit Assessment
              </button>}
        </div>
      </div>
    </div>
  )
}
