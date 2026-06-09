import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllStudents, getAllPreTests, getAllPostTests, getAllSimAttempts, getVerbalAvg } from '../lib/store'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [preTests, setPreTests] = useState([])
  const [postTests, setPostTests] = useState([])
  const [simAttempts, setSimAttempts] = useState([])
  const [filterUni, setFilterUni] = useState('All')
  const [filterGroup, setFilterGroup] = useState('All')

  const loadAll = () => {
    setStudents(getAllStudents())
    setPreTests(getAllPreTests())
    setPostTests(getAllPostTests())
    setSimAttempts(getAllSimAttempts())
  }

  useEffect(() => { loadAll() }, [])

  const filtered = students.filter(s =>
    (filterUni === 'All' || s.university === filterUni) &&
    (filterGroup === 'All' || s.group_type === filterGroup)
  )

  const getPre = (sid) => preTests.find(p => p.student_id === sid)
  const getPost = (sid) => postTests.find(p => p.student_id === sid)
  const getSimAvg = (sid) => {
    const atts = simAttempts.filter(a => a.student_id === sid && a.completed)
    if (!atts.length) return null
    return Math.round(atts.reduce((acc, a) => acc + (a.score / a.max_score) * 100, 0) / atts.length)
  }

  const exportCSV = () => {
    const headers = ['Student ID','Full Name','University','Year Group','Gender','Age','Group','Pre CT','Pre Conf','Pre Comp','Post CT','Post Conf','Post Comp','Sim Avg %','Pre Verbal %','Post Verbal %','Registered At']
    const rows = students.map(s => {
      const pre = getPre(s.id); const post = getPost(s.id)
      return [s.student_id, s.full_name, s.university, s.year_group, s.gender||'', s.age||'', s.group_type||'',
        pre?.total_ct_score||'', pre?.total_conf_score||'', pre?.total_comp_score||'',
        post?.total_ct_score||'', post?.total_conf_score||'', post?.total_comp_score||'',
        getSimAvg(s.id)??'', getVerbalAvg(s.id,'pre')??'', getVerbalAvg(s.id,'post')??'',
        new Date(s.created_at).toLocaleDateString()]
    })
    const csv = [headers,...rows].map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download=`nurssim_data_${new Date().toISOString().split('T')[0]}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const stats = [
    {l:'Total Students', v:students.length, c:'var(--primary)'},
    {l:'DSBL Group', v:students.filter(s=>s.group_type==='DSBL').length, c:'var(--primary-light)'},
    {l:'Traditional Group', v:students.filter(s=>s.group_type==='Traditional').length, c:'var(--neutral)'},
    {l:'Pre-Tests Done', v:preTests.length, c:'var(--secondary)'},
    {l:'Post-Tests Done', v:postTests.length, c:'var(--accent)'},
    {l:'Sims Completed', v:simAttempts.filter(a=>a.completed).length, c:'var(--warning)'},
  ]

  return (
    <div className="page-wrapper">
      <nav style={{ background: 'var(--primary)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>⚕️</span>
          <span style={{ fontFamily: 'var(--font-heading)', color: 'white', fontWeight: 700, fontSize: 15 }}>NursSim Admin</span>
          <span style={{ background: 'rgba(255,255,255,0.18)', color: 'white', padding: '2px 9px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>RESEARCHER</span>
        </div>
        <div style={{ display: 'flex', gap: 9 }}>
          <button onClick={() => navigate('/verbal-assessment')} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>🗣️ Verbal Assessment</button>
          <button onClick={exportCSV} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>⬇ Export CSV</button>
          <button onClick={loadAll} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', padding: '7px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}>↻ Refresh</button>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', padding: '7px 12px', cursor: 'pointer', fontSize: 12 }}>Exit</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, marginBottom: 3 }}>Research Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Effects of DSBL Study · University of Ghana & Central University · 2025</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.l} className="card" style={{ padding: '12px 14px', borderTop: `3px solid ${s.c}` }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 9, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          {[{l:'University', v:filterUni, s:setFilterUni, opts:['All','University of Ghana','Central University']},
            {l:'Group', v:filterGroup, s:setFilterGroup, opts:['All','DSBL','Traditional']}
          ].map(f => (
            <select key={f.l} className="form-input" value={f.v} onChange={e=>f.s(e.target.value)} style={{width:'auto',padding:'7px 11px'}}>
              {f.opts.map(o=><option key={o} value={o}>{o==='All'?`All ${f.l}s`:o}</option>)}
            </select>
          ))}
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Showing {filtered.length} of {students.length} students</span>
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: 'var(--bg)' }}>
                  {['Student','Uni','Year','Group','Pre CT/Conf/Comp','Post CT/Conf/Comp','Sim Avg','Verbal Pre','Verbal Post','Status'].map(h => (
                    <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', whiteSpace: 'nowrap', borderBottom: '1px solid var(--border-light)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => {
                  const pre = getPre(s.id); const post = getPost(s.id)
                  const sim = getSimAvg(s.id)
                  const vPre = getVerbalAvg(s.id, 'pre')
                  const vPost = getVerbalAvg(s.id, 'post')
                  const status = post ? 'Complete' : pre ? 'In Progress' : 'Registered'
                  const sc = post ? 'var(--accent)' : pre ? 'var(--warning)' : 'var(--neutral)'
                  return (
                    <tr key={s.id} style={{ borderTop: '1px solid var(--border-light)', background: i%2 ? 'var(--surface-2)' : 'var(--surface)' }}>
                      <td style={{ padding: '9px 12px' }}><div style={{ fontWeight: 600 }}>{s.full_name}</div><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{s.student_id}</div></td>
                      <td style={{ padding: '9px 12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{s.university?.replace('University of Ghana','UG').replace('Central University','CU')}</td>
                      <td style={{ padding: '9px 12px', color: 'var(--text-secondary)' }}>{s.year_group}</td>
                      <td style={{ padding: '9px 12px' }}><span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: s.group_type==='DSBL'?'var(--primary-pale)':'var(--border-light)', color: s.group_type==='DSBL'?'var(--primary)':'var(--neutral)' }}>{s.group_type||'—'}</span></td>
                      <td style={{ padding: '9px 12px', fontFamily: 'monospace' }}>{pre?`${pre.total_ct_score}/${pre.total_conf_score}/${pre.total_comp_score}`:<span style={{color:'var(--text-muted)'}}>—</span>}</td>
                      <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontWeight: post?700:400, color: post?'var(--accent)':'var(--text-muted)' }}>{post?`${post.total_ct_score}/${post.total_conf_score}/${post.total_comp_score}`:'—'}</td>
                      <td style={{ padding: '9px 12px', fontWeight: 700, color: sim!==null?sim>=70?'var(--accent)':'var(--warning)':'var(--text-muted)' }}>{sim!==null?`${sim}%`:'—'}</td>
                      <td style={{ padding: '9px 12px', fontWeight: 700, color: vPre!==null?vPre>=70?'var(--secondary)':'var(--warning)':'var(--text-muted)' }}>{vPre!==null?`${vPre}%`:'—'}</td>
                      <td style={{ padding: '9px 12px', fontWeight: 700, color: vPost!==null?vPost>=70?'var(--secondary)':'var(--warning)':'var(--text-muted)' }}>{vPost!==null?`${vPost}%`:'—'}</td>
                      <td style={{ padding: '9px 12px' }}><span style={{ padding: '2px 9px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${sc}20`, color: sc }}>{status}</span></td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && <tr><td colSpan={10} style={{ padding: '28px', textAlign: 'center', color: 'var(--text-muted)' }}>No students registered yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <p style={{ marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>CT = Critical Thinking · Conf = Confidence · Comp = Competence · Demo data stored in browser localStorage · Export CSV for SPSS</p>
      </div>
    </div>
  )
}
