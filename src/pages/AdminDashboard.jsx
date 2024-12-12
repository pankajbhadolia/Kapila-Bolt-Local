import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Logo from '../components/Logo'

function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    activeUsers: 0
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdmin()
    fetchDashboardData()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.user_metadata.role !== 'admin') {
      navigate('/')
    }
  }

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const { data: users } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'user')

      setStats({
        totalSales: 150000,
        totalOrders: 45634,
        activeUsers: users?.length || 0
      })

      // Fetch recent activity
      const { data: activity } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentActivity(activity || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Logo />
        <nav className="sidebar-nav">
          {/* Add navigation items here */}
        </nav>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card sales">
            <div className="stat-value">${stats.totalSales.toLocaleString()}</div>
            <div className="stat-label">Total Sales</div>
          </div>
          <div className="stat-card orders">
            <div className="stat-value">{stats.totalOrders.toLocaleString()}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card users">
            <div className="stat-value">{stats.activeUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Sales Analytics</h3>
            {/* Add chart component here */}
          </div>
          <div className="chart-card">
            <h3>User Distribution</h3>
            {/* Add pie chart component here */}
          </div>
        </div>

        <div className="activity-table">
          <h3>Recent Activity</h3>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className="status-badge completed">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
