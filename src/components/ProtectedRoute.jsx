import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../lib/constants'

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  if (requireAdmin && profile?.role !== 'admin') {
    return <Navigate to={ROUTES.USER_DASHBOARD} replace />
  }

  return children
}
