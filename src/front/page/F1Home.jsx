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
  backgroundImage:
    'linear-gradient(160deg, rgba(5,7,12,0.94) 0%, rgba(9,5,8,0.95) 60%, rgba(12,8,16,0.96) 100%), radial-gradient(circle at 15% 6%, rgba(225,6,0,0.30), transparent 45%), radial-gradient(circle at 88% 0%, rgba(255,88,0,0.20), transparent 40%)',
  backgroundSize: 'cover, cover, cover',
  backgroundPosition: 'center, center, center',
  backgroundAttachment: 'fixed',
}

const cardStyle = {
  background: 'linear-gradient(180deg, rgba(15,18,27,0.92) 0%, rgba(9,12,20,0.96) 100%)',
  border: '1px solid rgba(225,6,0,0.32)',
  borderRadius: '16px',
  boxShadow: '0 18px 48px rgba(0,0,0,0.55), 0 8px 26px rgba(225,6,0,0.14)',
  backdropFilter: 'blur(6px)',
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
                  background: 'linear-gradient(90deg, rgba(225,6,0,0.3), rgba(255,88,0,0.26))',
                  border: '1px solid rgba(225,6,0,0.55)',
                  borderRadius: '20px',
                  padding: '0.22rem 0.8rem',
                  color: '#ffb4a2',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
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
