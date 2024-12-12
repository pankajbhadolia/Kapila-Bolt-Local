import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Logo from '../components/Logo'

function UserDashboard() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      navigate('/')
      return
    }

    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError
      setProfile(profileData)

      // Set dummy stats for now
      setStats({
        totalOrders: 25,
        pendingOrders: 3,
        completedOrders: 22
      })
    } catch (error) {
      console.error('Error fetching user data:', error)
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
          <h1>Welcome, {profile?.name}!</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card orders">
            <div className="stat-value">{stats.totalOrders}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card sales">
            <div className="stat-value">{stats.pendingOrders}</div>
            <div className="stat-label">Pending Orders</div>
          </div>
          <div className="stat-card users">
            <div className="stat-value">{stats.completedOrders}</div>
            <div className="stat-label">Completed Orders</div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Order History</h3>
            {/* Add chart component here */}
          </div>
          <div className="chart-card">
            <h3>Recent Activity</h3>
            {/* Add activity list here */}
          </div>
        </div>

        <div className="activity-table">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Add dummy data for now */}
              <tr>
                <td>#ORD-001</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td>$150.00</td>
                <td>
                  <span className="status-badge completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td>#ORD-002</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td>$89.99</td>
                <td>
                  <span className="status-badge pending">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default UserDashboard
