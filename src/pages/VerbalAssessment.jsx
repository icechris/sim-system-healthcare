import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllStudents, saveVerbalAssessment, getAllVerbalAssessments } from '../lib/store'
import { procedures } from '../data/procedures'

export default function VerbalAssessment() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [existing, setExisting] = useState([])
  const [sel, setSel] = useState({ student: '', proc: '', phase: 'pre', assessedBy: '' })
  const [scores, setScores] = useState({})
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => { setStudents(getAllStudents()); setExisting(getAllVerbalAssessments()) }, [])

  const procedure = procedures.find(p => p.id === sel.proc)
  const checklist = procedure?.verbalChecklist || []
  const totalScore = checklist.filter(item => scores[item.id]).length

  const handleSave = () => {
    if (!sel.student || !sel.proc || !sel.assessedBy) { alert('Please select a student, procedure, and enter your name.'); return }
    const itemScores = {}
    checklist.forEach(item => { itemScores[item.id] = scores[item.id] ? 1 : 0 })
    saveVerbalAssessment({ student_id: sel.student, procedure_id: sel.proc, phase: sel.phase, item_scores: itemScores, total_score: totalScore, max_score: checklist.length, assessed_by: sel.assessedBy, notes })
    setExisting(getAllVerbalAssessments())
    setScores({}); setNotes(''); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="page-wrapper">
      <nav style={{ background: 'var(--primary)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <button onClick={() => navigate('/admin')} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', padding: '7px 13px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>← Admin</button>
          <span style={{ fontFamily: 'var(--font-heading)', color: 'white', fontWeight: 700, fontSize: 15 }}>🗣️ Verbal Assessment Tool</span>
        </div>
        <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '3px 11px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>RESEARCHER ONLY</span>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ background: 'var(--warning-pale)', border: '1px solid #F9CA6F', borderRadius: 9, padding: '10px 14px', marginBottom: 20, fontSize: 13 }}>
          <strong>📋 Instructions:</strong> Ask the student to verbally describe how they would perform each procedure step-by-step. Tick each item they correctly describe. Award 1 point per item.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 20 }}>
          {/* Setup */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Assessment Setup</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label className="form-label">Student *</label>
                <select className="form-input" value={sel.student} onChange={e => { setSel(s=>({...s,student:e.target.value})); setScores({}) }}>
                  <option value="">Select a student</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.full_name} ({s.student_id})</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Procedure *</label>
                <select className="form-input" value={sel.proc} onChange={e => { setSel(s=>({...s,proc:e.target.value})); setScores({}) }}>
                  <option value="">Select a procedure</option>
                  {procedures.map(p => <option key={p.id} value={p.id}>{p.icon} {p.title}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Phase *</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[['pre','Pre-Intervention'],['post','Post-Intervention']].map(([v,l]) => (
                    <button key={v} onClick={() => setSel(s=>({...s,phase:v}))}
                      style={{ flex:1, padding:'9px', border:`2px solid ${sel.phase===v?'var(--primary)':'var(--border)'}`, borderRadius:8, cursor:'pointer', fontWeight:600, fontSize:12, background:sel.phase===v?'var(--primary-pale)':'var(--surface)', color:sel.phase===v?'var(--primary)':'var(--text-muted)' }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="form-label">Assessed By *</label>
                <input className="form-input" placeholder="Your name" value={sel.assessedBy} onChange={e => setSel(s=>({...s,assessedBy:e.target.value}))} />
              </div>
              <div>
                <label className="form-label">Notes</label>
                <textarea className="form-input" rows={2} placeholder="Any observations..." value={notes} onChange={e => setNotes(e.target.value)} style={{ resize: 'vertical' }} />
              </div>
              {saved && <div style={{ background: 'var(--secondary-pale)', color: 'var(--secondary)', padding: '9px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>✓ Assessment saved!</div>}
            </div>
          </div>

          {/* Score card */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Score Summary</h3>
            {procedure ? (
              <>
                <div style={{ background: totalScore >= checklist.length * 0.7 ? 'var(--secondary-pale)' : 'var(--warning-pale)', borderRadius: 10, padding: '18px', textAlign: 'center', marginBottom: 14 }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 42, fontWeight: 800, color: totalScore >= checklist.length * 0.7 ? 'var(--secondary)' : 'var(--warning)' }}>{totalScore}/{checklist.length}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{Math.round((totalScore/checklist.length)*100)}% · {totalScore >= checklist.length*0.7 ? 'Pass' : 'Below threshold'}</div>
                </div>
                <div style={{ height: 6, background: 'var(--border-light)', borderRadius: 3, overflow: 'hidden', marginBottom: 14 }}>
                  <div style={{ height: '100%', width: `${(totalScore/checklist.length)*100}%`, background: totalScore >= checklist.length*0.7 ? 'var(--secondary)' : 'var(--warning)', borderRadius: 3, transition: 'width 0.3s' }} />
                </div>
              </>
            ) : <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: 20 }}>Select a procedure to begin</div>}
            <button onClick={handleSave} disabled={!sel.student || !sel.proc || !sel.assessedBy}
              style={{ width: '100%', marginTop: 8, background: !sel.student||!sel.proc||!sel.assessedBy ? 'var(--border)' : 'var(--secondary)', color: !sel.student||!sel.proc||!sel.assessedBy ? 'var(--text-muted)' : 'white', border: 'none', padding: '11px', borderRadius: 8, cursor: !sel.student||!sel.proc||!sel.assessedBy ? 'default' : 'pointer', fontWeight: 700, fontSize: 13 }}>
              ✓ Save Assessment
            </button>
          </div>
        </div>

        {/* Checklist */}
        {procedure && (
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15 }}>{procedure.icon} {procedure.title} — Verbal Checklist</h3>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Click each item the student correctly describes</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {checklist.map((item, idx) => (
                <div key={item.id} onClick={() => setScores(s => ({ ...s, [item.id]: !s[item.id] }))}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 14px', borderRadius: 9, border: `2px solid ${scores[item.id] ? 'var(--secondary)' : 'var(--border-light)'}`, background: scores[item.id] ? 'var(--secondary-pale)' : 'var(--surface)', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, border: `2px solid ${scores[item.id] ? 'var(--secondary)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: scores[item.id] ? 'var(--secondary)' : 'transparent', transition: 'all 0.15s' }}>
                    {scores[item.id] && <span style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginRight: 7 }}>Item {idx + 1}</span>
                    <span style={{ fontSize: 13, lineHeight: 1.6 }}>{item.text}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: scores[item.id] ? 'var(--secondary)' : 'var(--border)' }}>{scores[item.id] ? '+1' : '0'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent */}
        {existing.length > 0 && (
          <div className="card" style={{ padding: 20, marginTop: 18 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Recent Assessments</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead><tr style={{ background: 'var(--bg)' }}>{['Student','Procedure','Phase','Score','By','Date'].map(h=><th key={h} style={{padding:'8px 11px',textAlign:'left',fontWeight:700,color:'var(--text-muted)',fontSize:10,textTransform:'uppercase'}}>{h}</th>)}</tr></thead>
                <tbody>
                  {existing.slice(-15).reverse().map((a,i) => {
                    const s = students.find(st=>st.id===a.student_id)
                    const p = procedures.find(pr=>pr.id===a.procedure_id)
                    const pct = Math.round((a.total_score/a.max_score)*100)
                    return (
                      <tr key={a.id} style={{ borderTop: '1px solid var(--border-light)', background: i%2?'var(--surface-2)':'var(--surface)' }}>
                        <td style={{padding:'8px 11px'}}>{s?.full_name||'—'}<div style={{fontSize:10,color:'var(--text-muted)'}}>{s?.student_id}</div></td>
                        <td style={{padding:'8px 11px'}}>{p?.icon} {p?.title||a.procedure_id}</td>
                        <td style={{padding:'8px 11px'}}><span style={{padding:'2px 8px',borderRadius:20,fontSize:10,fontWeight:700,background:a.phase==='pre'?'var(--primary-pale)':'var(--secondary-pale)',color:a.phase==='pre'?'var(--primary)':'var(--secondary)'}}>{a.phase}</span></td>
                        <td style={{padding:'8px 11px',fontWeight:700,color:pct>=70?'var(--secondary)':'var(--warning)'}}>{a.total_score}/{a.max_score} ({pct}%)</td>
                        <td style={{padding:'8px 11px',color:'var(--text-muted)'}}>{a.assessed_by}</td>
                        <td style={{padding:'8px 11px',color:'var(--text-muted)'}}>{new Date(a.created_at).toLocaleDateString()}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
