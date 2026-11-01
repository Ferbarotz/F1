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
        <section style={{ textAlign: 'center', display: 'grid', gap: '0.9rem', justifyItems: 'center' }}>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              lineHeight: 1.05,
              textWrap: 'balance',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              background: 'linear-gradient(90deg, #E10600 0%, #FF5800 55%, #FFB000 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Fórmula 1
          </h1>
          <p style={{ color: '#c3cedd', fontSize: '1.08rem', margin: 0, maxWidth: '620px', lineHeight: 1.7 }}>
            La historia de los campeones, el campeonato en curso con todos los puntos, y las noticias más frescas de la máxima categoría del automovilismo.
          </p>
          <p style={{ color: '#ff9a7a', fontSize: '0.9rem', fontWeight: 700, margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Actualizado en vivo
          </p>
        </section>

        <div style={{ display: 'grid', gap: '1.2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              style={{
                ...cardStyle,
                padding: '1.5rem',
                textDecoration: 'none',
                color: 'inherit',
                display: 'grid',
                gap: '0.4rem',
                justifyItems: 'start',
              }}
            >
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
                {c.tag}
              </span>
              <h2 style={{ margin: 0, fontSize: '1.6rem' }}>{c.title}</h2>
              <p style={{ margin: 0, color: '#b8c2d0', lineHeight: 1.6 }}>{c.desc}</p>
              <span style={{ ...ctaStyle, marginTop: '0.8rem' }}>Explorar →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default F1Home
