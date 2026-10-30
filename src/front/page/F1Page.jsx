import Navbar from '../Componente/Navbar'
import F1History from '../Componente/F1History'
import F1News from '../Componente/F1News'

const F1Page = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        color: '#eef2ff',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        backgroundImage: `linear-gradient(140deg, rgba(5, 8, 20, 0.84), rgba(6, 10, 24, 0.86)), radial-gradient(circle at 18% 14%, rgba(59,130,246,0.32), transparent 36%), radial-gradient(circle at 82% 0%, rgba(139,92,246,0.26), transparent 32%)`,
        backgroundSize: 'cover, cover, cover',
        backgroundPosition: 'center, center, center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />

      <main style={{ padding: '2rem 1.2rem 3rem', maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
        <section style={{ textAlign: 'center', display: 'grid', gap: '0.8rem', justifyItems: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              margin: 0,
              lineHeight: 1.1,
              textWrap: 'balance',
              background: 'linear-gradient(90deg, #9fd2ff 0%, #d4b7ff 50%, #ffa0de 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Fórmula 1
          </h1>
          <p style={{ color: '#a5b4fc', fontSize: '1.05rem', margin: 0, maxWidth: '640px', lineHeight: 1.7 }}>
            La historia de los campeones, los momentos más importantes y las noticias más frescas de la máxima categoría del automovilismo.
          </p>
          <p style={{ color: '#06b6d4', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
            Actualizado en vivo · {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </section>

        <F1History />

        <F1News />
      </main>
    </div>
  )
}

export default F1Page
