import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1B4F72 0%, #2E86AB 55%, #17A589 100%)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, background: 'white', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⚕️</div>
        <div>
          <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15 }}>NursSim Ghana</div>
          <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>Digital Simulation-Based Learning Platform</div>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ animation: 'fadeIn 0.4s ease', maxWidth: 600 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.28)', borderRadius: 20, padding: '5px 14px', marginBottom: 26 }}>
            <span style={{ fontSize: 13 }}>🇬🇭</span>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>University of Ghana · Central University · Accra</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 5vw, 54px)', fontWeight: 800, color: 'white', marginBottom: 14, lineHeight: 1.1 }}>
            Clinical Simulation<br />
            <span style={{ color: '#7DDECC' }}>Learning Platform</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(14px, 2vw, 17px)', lineHeight: 1.8, marginBottom: 40 }}>
            Complete pre- and post-intervention assessments, use digital simulation modules for the approved nursing procedures,
            and build critical thinking, confidence, and clinical competence safely before working with real patients.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <button
              onClick={() => navigate('/register')}
              style={{ background: 'white', color: 'var(--primary)', border: 'none', borderRadius: 14, padding: '20px 32px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 8px 28px rgba(0,0,0,0.18)', minWidth: 150 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.22)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.18)' }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>👩‍⚕️</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16 }}>I'm a Student</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400, marginTop: 2 }}>Register or continue learning</div>
            </button>

            <button
              onClick={() => navigate('/admin')}
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', color: 'white', border: '2px solid rgba(255,255,255,0.32)', borderRadius: 14, padding: '20px 32px', cursor: 'pointer', transition: 'all 0.2s', minWidth: 150 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>🔬</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16 }}>Researcher / Admin</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 400, marginTop: 2 }}>View data & record assessments</div>
            </button>
          </div>

          <div style={{ display: 'flex', gap: 36, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['📹', '5', 'Clinical Procedures\nwith Video Demos'], ['🎯', '3', 'Outcome Variables\nMeasured'], ['📋', '46', 'Item Validated\nQuestionnaire'], ['🗣️', '10', 'Point Verbal\nAssessment']].map(([ic, v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{ic}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800, color: 'white' }}>{v}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', whiteSpace: 'pre-line' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ padding: '16px 40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
          NursSim Ghana · Effects of Digital Simulation-Based Learning Research Study · 2025
        </p>
      </footer>
    </div>
  )
}
