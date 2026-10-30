import { useEffect, useState } from 'react'

const buildRssUrl = (query) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`

// Extrae el nombre de la fuente del HTML de la descripción del artículo
const getSourceFromDescription = (description) => {
  try {
    if (!description) return 'F1'
    const html = String(description)
    const afterAnchor = html.split('</a>')[1]
    if (!afterAnchor) return 'F1'
    const source = afterAnchor
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    return source || 'F1'
  } catch {
    return 'F1'
  }
}

const stripHtml = (html) =>
  String(html || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()

const formatDate = (pubDate) => {
  const parsed = new Date(String(pubDate).replace(' ', 'T'))
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
}

const F1News = () => {
  const [query, setQuery] = useState('Formula 1')
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadNews = async (searchQuery) => {
    setLoading(true)
    setError(null)
    try {
      const rssUrl = buildRssUrl(searchQuery)
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
      const data = await res.json()
      if (data && data.status === 'ok' && data.feed && Array.isArray(data.feed.items)) {
        setNews(data.feed.items.map((item) => ({
          ...item,
          source: getSourceFromDescription(item.description),
        })))
      } else {
        setNews([])
        setError('No se pudieron cargar las noticias en este momento.')
      }
    } catch {
      setNews([])
      setError('No se pudieron cargar las noticias en este momento.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews('Formula 1')
  }, [])

  const cardStyle = {
    background: 'linear-gradient(180deg, rgba(13,18,35,0.9) 0%, rgba(10,14,28,0.94) 100%)',
    border: '1px solid rgba(157, 177, 255, 0.34)',
    borderRadius: '16px',
    boxShadow: '0 16px 44px rgba(8, 12, 28, 0.55), 0 6px 22px rgba(99,102,241,0.2)',
    backdropFilter: 'blur(6px)',
  }

  const inputStyle = {
    background: 'rgba(11,17,34,0.9)',
    border: '1px solid rgba(111,137,255,0.35)',
    borderRadius: '8px',
    color: '#eaf1ff',
    padding: '0.7rem 0.9rem',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    width: '100%',
  }

  const buttonStyle = {
    background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 55%, #ec4899 100%)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.25)',
    padding: '0.5rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
  }

  const outlineBtnStyle = {
    background: 'transparent',
    color: '#a5b4fc',
    border: '1px solid rgba(111,137,255,0.35)',
    padding: '0.5rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
  }

  return (
    <section id="f1-news" style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ textAlign: 'center', display: 'grid', gap: '0.5rem', justifyItems: 'center' }}>
        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            lineHeight: 1.15,
            textWrap: 'balance',
            background: 'linear-gradient(90deg, #9fd2ff 0%, #d4b7ff 50%, #ffa0de 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Noticias de F1
        </h2>
        <p style={{ color: '#a5b4fc', fontSize: '1rem', margin: 0 }}>
          Lo último de las principales fuentes de la Fórmula 1
        </p>
      </div>

      {/* Buscador */}
      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && loadNews(query)}
          placeholder="Ej: Formula 1, Verstappen, Gran Premio..."
          style={inputStyle}
          onFocus={(e) => e.target.select()}
        />
        <button onClick={() => loadNews(query)} style={buttonStyle}>
          Buscar
        </button>
      </div>

      {loading ? (
        <div style={{ ...cardStyle, padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#a5b4fc', margin: 0 }}>Buscando noticias...</p>
        </div>
      ) : error ? (
        <div style={{ ...cardStyle, padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#fca5a5', margin: 0 }}>{error}</p>
        </div>
      ) : news.length === 0 ? (
        <div style={{ ...cardStyle, padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#a5b4fc', margin: 0 }}>No se encontraron noticias para tu búsqueda.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {news.map((item, idx) => (
            <article
              key={item.guid || idx}
              style={{ ...cardStyle, padding: '1.2rem', display: 'grid', gap: '0.6rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: 'linear-gradient(90deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25), rgba(236,72,153,0.25))',
                    border: '1px solid rgba(157, 177, 255, 0.35)',
                    borderRadius: '20px',
                    padding: '0.25rem 0.8rem',
                    color: '#eaf1ff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Fuente: {item.source}
                </span>
                {item.pubDate && <time style={{ color: '#06b6d4', fontSize: '0.85rem', fontWeight: 600 }}>{formatDate(item.pubDate)}</time>}
              </div>

              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', lineHeight: 1.35, color: '#eaf1ff' }}>{stripHtml(item.title)}</h3>
              </a>

              {item.description && (
                <p style={{ margin: 0, color: '#c7d2fe', lineHeight: 1.65, fontSize: '0.95rem' }}>{stripHtml(item.description)}</p>
              )}

              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#9fd2ff', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                Leer la noticia completa →
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default F1News
