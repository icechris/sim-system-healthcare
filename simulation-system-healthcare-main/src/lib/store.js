// ============================================================
// LOCAL STORE — replaces Supabase for demo
// All data lives in localStorage. Swap this file for
// supabase.js calls later when you're ready to go live.
// ============================================================

const get = (key) => JSON.parse(localStorage.getItem(key) || 'null')
const set = (key, val) => localStorage.setItem(key, JSON.stringify(val))

// ── Students ──────────────────────────────────────────────
export function registerStudent(data) {
  const students = get('ns_students') || []
  if (students.find(s => s.student_id === data.student_id)) {
    throw new Error('DUPLICATE')
  }
  const student = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() }
  set('ns_students', [...students, student])
  return student
}

export function getStudentById(studentId) {
  const students = get('ns_students') || []
  return students.find(s => s.student_id === studentId) || null
}

export function getAllStudents() {
  return get('ns_students') || []
}

// ── Pre / Post Test ───────────────────────────────────────
export function savePreTest(studentId, payload) {
  const all = get('ns_pretests') || []
  const record = { ...payload, student_id: studentId, id: crypto.randomUUID(), created_at: new Date().toISOString() }
  set('ns_pretests', [...all.filter(r => r.student_id !== studentId), record])
}

export function savePostTest(studentId, payload) {
  const all = get('ns_posttests') || []
  const record = { ...payload, student_id: studentId, id: crypto.randomUUID(), created_at: new Date().toISOString() }
  set('ns_posttests', [...all.filter(r => r.student_id !== studentId), record])
}

export function getPreTest(studentId) {
  return (get('ns_pretests') || []).find(r => r.student_id === studentId) || null
}

export function getPostTest(studentId) {
  return (get('ns_posttests') || []).find(r => r.student_id === studentId) || null
}

export function getAllPreTests() { return get('ns_pretests') || [] }
export function getAllPostTests() { return get('ns_posttests') || [] }

// ── Simulation Attempts ───────────────────────────────────
export function saveSimAttempt(payload) {
  const all = get('ns_sims') || []
  const record = { ...payload, id: crypto.randomUUID(), created_at: new Date().toISOString() }
  set('ns_sims', [...all, record])
}

export function getCompletedProcs(studentId) {
  return (get('ns_sims') || [])
    .filter(s => s.student_id === studentId && s.completed)
    .map(s => s.procedure_id)
}

export function getAllSimAttempts() { return get('ns_sims') || [] }

// ── Reflections ───────────────────────────────────────────
export function saveReflection(payload) {
  const all = get('ns_reflections') || []
  set('ns_reflections', [...all, { ...payload, id: crypto.randomUUID(), created_at: new Date().toISOString() }])
}

// ── Verbal Assessments ────────────────────────────────────
export function saveVerbalAssessment(payload) {
  const all = get('ns_verbal') || []
  set('ns_verbal', [...all, { ...payload, id: crypto.randomUUID(), created_at: new Date().toISOString() }])
}

export function getAllVerbalAssessments() { return get('ns_verbal') || [] }

export function getVerbalAvg(studentId, phase) {
  const all = (get('ns_verbal') || []).filter(v => v.student_id === studentId && v.phase === phase)
  if (!all.length) return null
  const total = all.reduce((a, v) => a + v.total_score, 0)
  const max = all.reduce((a, v) => a + v.max_score, 0)
  return max > 0 ? Math.round((total / max) * 100) : null
}
