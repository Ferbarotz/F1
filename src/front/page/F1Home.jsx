import { useState } from 'react'
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
  const [slide, setSlide] = useState(0)
  const slides = [
    { team: 'Audi R26', car: '/F1/audi-r26.jpg' },
    { team: 'Red Bull RB22', car: '/F1/red-bull-rb22.avif' },
    { team: 'Mercedes W17', car: '/F1/mercedes-w17.avif' },
    { team: 'Alpine A526', car: '/F1/alpine-a526.avif' },
    { team: 'Racing Bulls VCARB03', car: '/F1/racing-bulls-vcarb03.avif' },
  ]
  const carouselBtnStyle = {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    border: '1px solid rgba(225,6,0,0.65)',
    background: 'linear-gradient(90deg, rgba(225,6,0,0.38), rgba(255,88,0,0.32))',
    color: '#fff',
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const carouselIndicatorStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.25)',
    padding: 0,
  }
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
        <section style={{ display: 'grid', gap: '1rem', justifyItems: 'center', alignContent: 'start', padding: '2rem 0', width: 'min(920px, 100%)' }}>
          <div
            style={{
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(225,6,0,0.45)',
              boxShadow: '0 18px 48px rgba(0,0,0,0.6), 0 8px 30px rgba(225,6,0,0.22)',
            }}
          >
            <div style={{ display: 'flex', transition: 'transform 0.6s ease', transform: `translateX(-${slide * 100}%)` }}>
              {slides.map((s, i) => (
                <div key={i} style={{ minWidth: '100%', height: '360px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0508' }}>
                  <img src={s.car} alt={s.team} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,6,12,0.1) 0%, rgba(4,6,12,0.85) 100%)' }} />
                  <span style={{ position: 'absolute', bottom: '1rem', left: '1.2rem', color: '#fff', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>{s.team}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button type="button" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} style={carouselBtnStyle}>‹</button>
              <button type="button" onClick={() => setSlide((slide + 1) % slides.length)} style={carouselBtnStyle}>›</button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {slides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  style={{ ...carouselIndicatorStyle, background: i === slide ? '#E10600' : 'rgba(255,255,255,0.25)' }}
                />
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default F1Home
