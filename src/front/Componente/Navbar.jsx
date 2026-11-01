import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/temporada', label: 'Temporada Actual' },
    { to: '/historia', label: 'Historia' },
    { to: '/noticias', label: 'Noticias' },
  ]

  const baseLinkStyle = {
    color: '#e8edf5',
    textDecoration: 'none',
    fontSize: '0.88rem',
    fontWeight: 600,
    padding: '0.45rem 0.95rem',
    borderRadius: '8px',
    fontFamily: "'Rajdhani', 'Inter', system-ui, sans-serif",
  }

  const activeLinkStyle = {
    ...baseLinkStyle,
    background: 'linear-gradient(90deg, rgba(225, 6, 0, 0.35), rgba(255, 88, 0, 0.3))',
    border: '1px solid rgba(225, 6, 0, 0.75)',
    color: '#fff',
    fontFamily: "'Rajdhani', 'Inter', system-ui, sans-serif",
  }

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.9rem 2rem',
        background: 'linear-gradient(90deg, rgba(12,8,10,0.97) 0%, rgba(16,10,14,0.95) 60%, rgba(24,10,14,0.92) 100%)',
        borderBottom: '1px solid rgba(225, 6, 0, 0.45)',
        boxShadow: '0 6px 20px rgba(225, 6, 0, 0.16)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        fontFamily: "'Rajdhani', 'Inter', system-ui, sans-serif",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: '1.55rem',
          fontWeight: 900,
          letterSpacing: '0.02em',
          fontFamily: "'Rajdhani', 'Inter', system-ui, sans-serif",
          background: 'linear-gradient(90deg, #E10600 0%, #FF5800 60%, #FFB000 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textDecoration: 'none',
        }}
      >
        Pit Lane F1
      </Link>

      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
        {links.map((l) => (
          <Link key={l.to} to={l.to} style={location.pathname === l.to ? activeLinkStyle : baseLinkStyle}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
