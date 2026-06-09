import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import TestPage from './pages/TestPage'
import SimulationModule from './pages/SimulationModule'
import AdminDashboard from './pages/AdminDashboard'
import VerbalAssessment from './pages/VerbalAssessment'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/pretest" element={<TestPage isPost={false} />} />
        <Route path="/posttest" element={<TestPage isPost={true} />} />
        <Route path="/simulation/:procedureId" element={<SimulationModule />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/verbal-assessment" element={<VerbalAssessment />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
