import { Routes, Route } from 'react-router-dom'
import { InitialScreen } from './components/InitialScreen'
import Dashboard from './components/Dashboard'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<InitialScreen />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
