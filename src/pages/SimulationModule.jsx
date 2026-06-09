import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { saveSimAttempt, saveReflection } from '../lib/store'
import { procedures } from '../data/procedures'
import VideoPlayer from '../components/VideoPlayer'

const PHASE = { LEARN: 'learn', SIMULATE: 'simulate', REFLECT: 'reflect', COMPLETE: 'complete' }

export default function SimulationModule() {
  const { procedureId } = useParams()
  const navigate = useNavigate()
  const procedure = procedures.find(p => p.id === procedureId)

  const [student, setStudent] = useState(null)
  const [phase, setPhase] = useState(PHASE.LEARN)
  const [watchedVideos, setWatchedVideos] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [decisions, setDecisions] = useState([])
  const [score, setScore] = useState(0)
  const [reflection, setReflection] = useState({ what_went_well: '', what_would_change: '', confidence_rating: 0, key_learning: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('nurssim_student')
    if (!stored) { navigate('/register'); return }
    const s = JSON.parse(stored)
    if (s.group_type !== 'DSBL') { navigate('/dashboard'); return }
    setStudent(s)
    if (!procedure) { navigate('/dashboard'); return }
    const watchedKey = `nurssim_watched_${s.id}_${procedureId}`
    const saved = localStorage.getItem(watchedKey)
    if (saved) setWatchedVideos(JSON.parse(saved))
  }, [])

  if (!procedure || !student) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><div className="spinner" style={{ width: 36, height: 36 }} /></div>

  const step = procedure.steps[currentStep]
  const allVideosWatched = procedure.videos.length === 0 || procedure.videos.every(v => watchedVideos[v.id])
  const watchedCount = Object.values(watchedVideos).filter(Boolean).length

  const markVideoWatched = (videoId) => {
    const updated = { ...watchedVideos, [videoId]: true }
    setWatchedVideos(updated)
    localStorage.setItem(`nurssim_watched_${student.id}_${procedureId}`, JSON.stringify(updated))
  }

  const handleSelect = (option) => {
    if (showFeedback) return
    setSelectedOption(option)
    setShowFeedback(true)
    setScore(prev => prev + option.points)
    setDecisions(prev => [...prev, { step: step.id, option_id: option.id, points: option.points, correct: option.isCorrect }])
  }

  const nextStep = () => {
    setShowFeedback(false); setSelectedOption(null)
    if (currentStep + 1 < procedure.steps.length) setCurrentStep(p => p + 1)
    else setPhase(PHASE.REFLECT)
  }

  const saveAndComplete = () => {
    if (!reflection.confidence_rating) { alert('Please rate your confidence level (1–5).'); return }
    setSaving(true)
    saveSimAttempt({ student_id: student.id, procedure_id: procedure.id, procedure_name: procedure.title, score, max_score: procedure.maxScore, decisions, videos_watched: Object.keys(watchedVideos).filter(k => watchedVideos[k]), completed: true })
    saveReflection({ student_id: student.id, procedure_id: procedure.id, ...reflection })
    setSaving(false)
    setPhase(PHASE.COMPLETE)
  }

  const passed = score >= procedure.passingScore
  const pct = Math.round((score / procedure.maxScore) * 100)

  // ── LEARN ─────────────────────────────────────────────────
  if (phase === PHASE.LEARN) return (
    <div className="page-wrapper">
      <nav style={{ background: 'var(--primary)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', padding: '7px 13px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>← Dashboard</button>
        <span style={{ fontFamily: 'var(--font-heading)', color: 'white', fontWeight: 700 }}>{procedure.icon} {procedure.title}</span>
        <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>Phase 1 of 3: Learn</span>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px' }}>
        {/* Patient + objectives */}
        <div className="card animate-fade" style={{ padding: 24, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 40 }}>{procedure.icon}</span>
            <div><h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800 }}>{procedure.title}</h1><p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{procedure.description}</p></div>
          </div>

          <div style={{ background: 'var(--bg)', borderRadius: 9, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>📚 Learning Objectives</div>
            {procedure.learningObjectives.map((obj, i) => (
              <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 6 }}>
                <span style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: 13, lineHeight: 1.6 }}>{obj}</span>
              </div>
            ))}
          </div>

          {/* Patient card */}
          <div style={{ border: '2px solid var(--primary-pale)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: 'var(--primary)', padding: '9px 16px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 13 }}>🏥 Patient Information</span>
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>{procedure.patient.ward}</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 10, marginBottom: 12 }}>
                {[['Patient', `${procedure.patient.name}, ${procedure.patient.age}y ${procedure.patient.gender}`], ['Diagnosis', procedure.patient.diagnosis], ['Allergies', procedure.patient.allergies]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{l}</div><div style={{ fontSize: 13, color: l === 'Allergies' && v !== 'None known' ? 'var(--danger)' : 'var(--text)', fontWeight: l === 'Allergies' && v !== 'None known' ? 700 : 400, marginTop: 2 }}>{v}</div></div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 10 }}>
                {Object.entries(procedure.patient.vitals).map(([k, v]) => (
                  <div key={k} style={{ background: 'var(--bg)', borderRadius: 7, padding: '5px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 10 }}>
                {procedure.patient.medications.map((m, i) => <div key={i} style={{ fontSize: 12, padding: '3px 0', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)' }}>• {m}</div>)}
              </div>
              <div style={{ background: '#FFF9E6', borderRadius: 7, padding: '9px 13px', border: '1px solid #F9E4A0' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#B7770D', marginBottom: 3, textTransform: 'uppercase' }}>📋 Nurse's Note</div>
                <p style={{ fontSize: 12, color: '#7D6608', lineHeight: 1.7 }}>{procedure.patient.nurseNote}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key points */}
        <div className="card animate-fade" style={{ padding: 20, marginBottom: 18, borderLeft: '4px solid var(--secondary)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>⚡ Key Clinical Points — Read Before Watching</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 7 }}>
            {procedure.keyPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', gap: 7, background: 'var(--bg)', borderRadius: 7, padding: '9px 11px' }}>
                <span style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 12, lineHeight: 1.6 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, marginBottom: 2 }}>📹 Reference Videos</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>Watch and mark each video as watched before starting the simulation.</p>
            </div>
            <div style={{ background: watchedCount === procedure.videos.length ? 'var(--secondary-pale)' : 'var(--border-light)', color: watchedCount === procedure.videos.length ? 'var(--secondary)' : 'var(--text-muted)', padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
              {watchedCount}/{procedure.videos.length} watched
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 14 }}>
            {procedure.videos.map(video => (
              <VideoPlayer key={video.id} video={video} watched={!!watchedVideos[video.id]} onMarkWatched={() => markVideoWatched(video.id)} />
            ))}
          </div>
        </div>

        {/* Start */}
        <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Ready to simulate?</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              ⏱ {procedure.duration} · 🎯 {procedure.steps.length} decisions · ⭐ {procedure.maxScore} pts max
              {!allVideosWatched && <span style={{ color: 'var(--warning)', marginLeft: 8 }}>· Mark all videos watched first</span>}
            </div>
          </div>
          <button onClick={() => setPhase(PHASE.SIMULATE)} disabled={!allVideosWatched}
            style={{ background: allVideosWatched ? 'var(--primary)' : 'var(--border)', color: allVideosWatched ? 'white' : 'var(--text-muted)', border: 'none', padding: '12px 24px', borderRadius: 10, cursor: allVideosWatched ? 'pointer' : 'default', fontWeight: 700, fontSize: 14 }}>
            {allVideosWatched ? 'Begin Simulation →' : `Watch videos (${watchedCount}/${procedure.videos.length})`}
          </button>
        </div>
      </div>
    </div>
  )

  // ── SIMULATE ──────────────────────────────────────────────
  if (phase === PHASE.SIMULATE) return (
    <div className="page-wrapper">
      <nav style={{ background: 'var(--primary)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-heading)', color: 'white', fontWeight: 700 }}>{procedure.icon} {procedure.title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Decision {currentStep + 1}/{procedure.steps.length}</span>
          <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Score: {score}/{procedure.maxScore}</span>
        </div>
      </nav>
      <div style={{ height: 4, background: 'var(--border-light)' }}>
        <div style={{ height: '100%', width: `${Math.round((currentStep / procedure.steps.length) * 100)}%`, background: 'var(--secondary)', transition: 'width 0.4s' }} />
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px' }}>
        <div className="animate-fade" key={currentStep}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 34, height: 34, background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, flexShrink: 0 }}>{currentStep + 1}</div>
            <div><div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Decision Point</div><div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15 }}>{step.stepTitle}</div></div>
          </div>

          <div style={{ background: '#EFF8FF', border: '1.5px solid #BAE0FD', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 6 }}>📍 Clinical Scenario</div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{step.situation}</p>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{step.question}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {step.options.map(option => {
                const isSel = selectedOption?.id === option.id
                const fbReady = showFeedback && isSel
                const borderCol = fbReady ? (option.isCorrect ? 'var(--accent)' : option.points > 0 ? 'var(--warning)' : 'var(--danger)') : isSel ? 'var(--primary)' : 'var(--border)'
                const bgCol = fbReady ? (option.isCorrect ? '#EAFAF1' : option.points > 0 ? '#FEF9E7' : '#FDEDEC') : isSel ? 'var(--primary-pale)' : 'var(--surface)'
                return (
                  <div key={option.id}>
                    <button onClick={() => handleSelect(option)} disabled={showFeedback}
                      style={{ width: '100%', textAlign: 'left', padding: '13px 15px', border: `2px solid ${borderCol}`, borderRadius: 9, cursor: showFeedback ? 'default' : 'pointer', background: bgCol, transition: 'all 0.2s', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ width: 26, height: 26, borderRadius: 7, border: `2px solid ${borderCol}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0, background: isSel ? borderCol : 'transparent', color: isSel ? 'white' : borderCol }}>{option.id.toUpperCase()}</span>
                      <span style={{ fontSize: 13, lineHeight: 1.6, flex: 1 }}>{option.text}</span>
                    </button>
                    {fbReady && (
                      <div className="animate-fade" style={{ background: option.isCorrect ? '#EAFAF1' : option.points > 0 ? '#FEF9E7' : '#FDEDEC', border: `1px solid ${option.isCorrect ? '#A9DFBF' : option.points > 0 ? '#F9CA6F' : '#F5B7B1'}`, borderRadius: '0 0 9px 9px', padding: '11px 15px', marginTop: -2, fontSize: 13, lineHeight: 1.7 }}>
                        {option.feedback}<span style={{ marginLeft: 8, fontWeight: 700, color: option.points === 2 ? 'var(--accent)' : option.points === 1 ? 'var(--warning)' : 'var(--danger)' }}>+{option.points} pts</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            {showFeedback && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
                <button onClick={nextStep} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '11px 22px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {currentStep + 1 < procedure.steps.length ? 'Next Decision →' : 'Complete & Reflect →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  // ── REFLECT ───────────────────────────────────────────────
  if (phase === PHASE.REFLECT) return (
    <div className="page-wrapper">
      <nav style={{ background: 'var(--secondary)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-heading)', color: 'white', fontWeight: 700 }}>{procedure.icon} {procedure.title} — Reflection</span>
        <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Score: {score}/{procedure.maxScore}</span>
      </nav>
      <div style={{ maxWidth: 660, margin: '0 auto', padding: '24px 20px' }}>
        <div className="card animate-fade" style={{ padding: 26, marginBottom: 14 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 19, fontWeight: 700, marginBottom: 5 }}>Post-Simulation Reflection</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 22 }}>Reflection transforms experience into learning. Think critically and honestly about your performance.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { key: 'what_went_well', label: '✅ What went well during this simulation?', ph: 'Describe what you did correctly and why...' },
              { key: 'what_would_change', label: '🔄 What would you do differently next time?', ph: 'Identify specific areas for improvement...' },
              { key: 'key_learning', label: '💡 What is your key clinical learning from this case?', ph: 'What will you take into real clinical practice...' },
            ].map(f => (
              <div key={f.key}>
                <label className="form-label">{f.label}</label>
                <textarea className="form-input" rows={3} placeholder={f.ph} value={reflection[f.key]} onChange={e => setReflection(r => ({ ...r, [f.key]: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
            ))}
            <div>
              <label className="form-label">📊 How confident do you feel about this procedure now? (1 = Not at all · 5 = Very confident)</label>
              <div style={{ display: 'flex', gap: 9, marginTop: 7 }}>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setReflection(r => ({ ...r, confidence_rating: n }))}
                    style={{ flex: 1, padding: '13px 4px', border: 'none', borderRadius: 9, cursor: 'pointer', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 17, transition: 'all 0.2s',
                      background: reflection.confidence_rating === n ? 'var(--secondary)' : 'var(--bg)',
                      color: reflection.confidence_rating === n ? 'white' : 'var(--text-muted)',
                      transform: reflection.confidence_rating === n ? 'scale(1.08)' : 'scale(1)',
                      boxShadow: reflection.confidence_rating === n ? '0 4px 14px rgba(23,165,137,0.3)' : 'none' }}>
                    {n}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}><span>Not confident</span><span>Very confident</span></div>
            </div>
          </div>
        </div>
        <button onClick={saveAndComplete} disabled={saving}
          style={{ width: '100%', background: 'var(--secondary)', color: 'white', border: 'none', padding: '14px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {saving ? <><div className="spinner" style={{ width: 17, height: 17, borderTopColor: 'white' }} /> Saving...</> : '✓ Save & Complete Simulation'}
        </button>
      </div>
    </div>
  )

  // ── COMPLETE ──────────────────────────────────────────────
  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="animate-fade card" style={{ padding: 40, maxWidth: 480, textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>{passed ? '🏆' : '📚'}</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800, marginBottom: 6 }}>{passed ? 'Well Done!' : 'Keep Practising'}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>{procedure.title} Complete</p>
        <div style={{ background: passed ? 'var(--secondary-pale)' : 'var(--warning-pale)', borderRadius: 12, padding: 22, marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 800, color: passed ? 'var(--secondary)' : 'var(--warning)' }}>{pct}%</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: passed ? 'var(--secondary)' : 'var(--warning)' }}>{score} / {procedure.maxScore} points</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{passed ? `✓ Passed` : `Passing: ${procedure.passingScore} pts`}</div>
        </div>
        <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 14, marginBottom: 20, textAlign: 'left' }}>
          {decisions.map((d, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Step {i + 1}: {procedure.steps[i]?.stepTitle}</span>
              <span style={{ fontWeight: 700, color: d.correct ? 'var(--accent)' : d.points > 0 ? 'var(--warning)' : 'var(--danger)' }}>+{d.points} pts {d.correct ? '✓' : ''}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => { setPhase(PHASE.SIMULATE); setCurrentStep(0); setScore(0); setSelectedOption(null); setShowFeedback(false); setDecisions([]) }}
            style={{ flex: 1, background: 'var(--surface)', color: 'var(--primary)', border: '1.5px solid var(--primary)', padding: '11px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Retry</button>
          <button onClick={() => navigate('/dashboard')}
            style={{ flex: 1, background: 'var(--primary)', color: 'white', border: 'none', padding: '11px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Dashboard →</button>
        </div>
      </div>
    </div>
  )
}
