import { Link } from 'react-router-dom'
import Navbar from '../Componente/Navbar'
import F1Background from '../Componente/F1Background'

const redGradient = 'linear-gradient(90deg, #E10600 0%, #FF5800 60%, #FFB000 100%)'

const pageStyle = {
  minHeight: '100vh',
  position: 'relative',
  zIndex: 1,
  color: '#f2f5f9',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  backgroundImage: 'none',
}

const cardStyle = {
  background: 'linear-gradient(180deg, rgba(16,20,30,0.95) 0%, rgba(10,14,22,0.97) 100%)',
  border: '1px solid rgba(225,6,0,0.45)',
  borderRadius: '16px',
  boxShadow: '0 18px 48px rgba(0,0,0,0.6), 0 8px 30px rgba(225,6,0,0.22)',
  backdropFilter: 'blur(8px)',
}

const ctaStyle = {
  display: 'inline-block',
  marginTop: '1rem',
  padding: '0.65rem 1.4rem',
  borderRadius: '10px',
  background: 'linear-gradient(90deg, #E10600 0%, #FF5800 60%, #FFB000 100%)',
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.95rem',
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.2)',
}

const F1Home = () => {
  const cards = [
    {
      to: '/temporada',
      tag: 'Campeonato',
      title: 'Temporada Actual',
      desc: 'Puntos, clasificación y todo lo relacionado con el campeonato en curso.',
    },
    {
      to: '/historia',
      tag: 'Legado',
      title: 'Historia',
      desc: 'La línea de tiempo con todos los campeonatos mundiales de Fórmula 1.',
    },
    {
      to: '/noticias',
      tag: 'Frescura',
      title: 'Noticias',
      desc: 'Las noticias más importantes de la F1, siempre con su fuente.',
    },
  ]

  return (
    <div style={pageStyle}>
      <F1Background />
      <Navbar />

      <main style={{ padding: '2.5rem 1.2rem 3rem', maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
        <section style={{ display: 'grid', gap: '1.2rem', justifyItems: 'center', alignContent: 'center', minHeight: '55vh', textAlign: 'center', padding: '2rem 0' }}>
          <span
            style={{
              background: 'linear-gradient(90deg, rgba(225,6,0,0.38), rgba(255,88,0,0.32))',
              border: '1px solid rgba(225,6,0,0.65)',
              borderRadius: '20px',
              padding: '0.35rem 0.95rem',
              color: '#ff9a7a',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Explora
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)',
              lineHeight: 1.05,
              textWrap: 'balance',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              background: 'linear-gradient(90deg, #E10600 0%, #FF5800 60%, #FFB000 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Pit Lane F1
          </h1>
          <p style={{ color: '#c3cedd', fontSize: '1rem', margin: 0, maxWidth: '620px', lineHeight: 1.7 }}>
            Elige una sección para seguir interactuando.
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.4rem' }}>
            <Link to="/noticias" style={{ ...ctaStyle, marginTop: 0 }}>Noticias</Link>
            <Link to="/temporada" style={{ ...ctaStyle, marginTop: 0 }}>Temporada Actual</Link>
            <Link to="/historia" style={{ ...ctaStyle, marginTop: 0 }}>Historia</Link>
          </div>
        </section>

      </main>
    </div>
  )
}

export default F1Home
