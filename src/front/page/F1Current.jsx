import { useEffect, useState } from 'react'
import Navbar from '../Componente/Navbar'
import F1Background from '../Componente/F1Background'

const JOLPICA = 'https://api.jolpi.ca/ergast/f1'

const pageStyle = {
  minHeight: '100vh',
  position: 'relative',
  zIndex: 1,
  color: '#f2f5f9',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  backgroundImage: 'none',
}

const redGradient = 'linear-gradient(90deg, #E10600 0%, #FF5800 60%, #FFB000 100%)'

const sectionTitleStyle = {
  margin: 0,
  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
  lineHeight: 1.15,
  textWrap: 'balance',
  fontWeight: 800,
  letterSpacing: '-0.01em',
  background: redGradient,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
}

const cardStyle = {
  background: 'linear-gradient(180deg, rgba(16,20,30,0.95) 0%, rgba(10,14,22,0.97) 100%)',
  border: '1px solid rgba(225,6,0,0.45)',
  borderRadius: '16px',
  boxShadow: '0 18px 48px rgba(0,0,0,0.6), 0 8px 30px rgba(225,6,0,0.22)',
  backdropFilter: 'blur(8px)',
}

const badgeStyle = {
  display: 'inline-block',
  background: 'linear-gradient(90deg, rgba(225,6,0,0.38), rgba(255,88,0,0.32))',
  border: '1px solid rgba(225,6,0,0.65)',
  color: '#ff9a7a',
  padding: '0.35rem 0.95rem',
  borderRadius: '20px',
  fontSize: '0.74rem',
  fontWeight: 800,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

const avatarStyle = {
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: 'linear-gradient(140deg, rgba(30,41,59,0.95), rgba(15,23,42,0.98))',
  border: '2px solid rgba(225,6,0,0.65)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ff8a75',
  fontWeight: 800,
  fontSize: '1.1rem',
  flexShrink: 0,
}

const tableWrapStyle = { overflowX: 'auto' }
const tableStyle = { width: '100%', borderCollapse: 'collapse', minWidth: '560px' }
const thStyle = {
  textAlign: 'left',
  padding: '0.75rem 0.8rem',
  color: '#ff8a75',
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  borderBottom: '1px solid rgba(225,6,0,0.45)',
}
const tdStyle = {
  padding: '0.7rem 0.8rem',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  color: '#e8edf5',
  fontSize: '0.95rem',
  fontWeight: 500,
}

const podiumColors = ['#FFD700', '#C0C0C0', '#CD7F32']

const initialsFor = (givenName, familyName) => {
  const name = `${givenName || ''} ${familyName || ''}`.trim()
  const initials = name
    .split(/\s+/)
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return initials || 'F1'
}

// Fetch con reintentos (la API de Jolpica aplica rate limit)
const fetchJson = async (url, retries = 3) => {
  let lastError = null
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url)
    if (res.ok) return res.json()
    lastError = new Error(`HTTP ${res.status}`)
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 800 * (i + 1)))
      continue
    }
    break
  }
  throw lastError
}

const formatDate = (dateStr) => {
  const parsed = new Date(String(dateStr).replace('T', ' ').split(' ')[0])
  if (Number.isNaN(parsed.getTime())) return dateStr || ''
  return parsed.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
}

const teamColors = {
  mclaren: '#ff8000',
  ferrari: '#e8002e',
  mercedes: '#27f4d2',
  red_bull: '#3671c6',
  williams: '#64c4ff',
  alpine: '#ff87bc',
  astar: '#7a8dff',
  haas: '#b6ac9c',
  audi: '#bb62fa',
  cadillac: '#e8e8f0',
  rb: '#4b6cb7',
}

const teamColor = (id) => teamColors[String(id || '').toLowerCase()] || '#9fd2ff'

const teamInitials = (name = '') =>
  String(name)
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'F1'

const F1Current = () => {
  const year = new Date().getFullYear()
  const [standings, setStandings] = useState([])
  const [resultsByRound, setResultsByRound] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    fetchJson(`${JOLPICA}/${year}/driverStandings.json`)
      .then((data) => {
        if (!active) return
        const table = data?.MRData?.StandingsTable
        const lists = table?.StandingsLists || []
        const flat = lists.flatMap((l) => l?.DriverStandings || [])
        setStandings(flat)
      })
      .catch(() => {
        if (active) setError('No se pudieron cargar los standings del campeonato.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    fetchJson(`${JOLPICA}/${year}/results/1.json`)
      .then((data) => {
        if (!active) return
        const list = data?.MRData?.RaceTable?.Races || []
        const map = {}
        list.forEach((r) => {
          const results = r?.Results || []
          if (!results.length) return
          const sorted = [...results].sort((a, b) => Number(a.position) - Number(b.position))
          const winner = sorted[0]
          if (!winner) return
          map[String(r.round)] = {
            round: r.round,
            raceName: r.raceName,
            circuit: r.Circuit?.circuitName || '',
            date: r.date,
            winner: `${winner.Driver?.givenName || ''} ${winner.Driver?.familyName || ''}`.trim(),
          }
        })
        setResultsByRound(map)
      })
      .catch(() => {
        if (active) setError('No se pudieron cargar las carreras del campeonato.')
      })

    return () => {
      active = false
    }
  }, [year])

  const leader = standings[0]
  const completedRaces = Object.values(resultsByRound).sort((a, b) => Number(a.round) - Number(b.round))

  return (
    <div style={pageStyle}>
      <F1Background />
      <Navbar />

      <main style={{ padding: '2rem 1.2rem 3rem', maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
        <section style={{ textAlign: 'center', display: 'grid', gap: '0.7rem', justifyItems: 'center' }}>
          <span style={badgeStyle}>Temporada en curso</span>
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)',
              lineHeight: 1.05,
              textWrap: 'balance',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              background: redGradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Temporada {year}
          </h1>
          <p style={{ color: '#c3cedd', fontSize: '1rem', margin: 0, maxWidth: '620px', lineHeight: 1.7 }}>
            Posiciones, puntos y todo lo relacionado con el campeonato actual de Fórmula 1.
          </p>
        </section>

        {loading ? (
          <div style={{ ...cardStyle, padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#ff9a7a', margin: 0 }}>Consultando el campeonato en vivo...</p>
          </div>
        ) : error ? (
          <div style={{ ...cardStyle, padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#ff9a7a', margin: 0 }}>{error}</p>
          </div>
        ) : (
          <>
            {leader && (
              <div style={{ ...cardStyle, padding: '1.4rem', display: 'grid', gap: '0.8rem' }}>
                <span style={badgeStyle}>Líder del campeonato</span>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={avatarStyle}>{initialsFor(leader.Driver?.givenName, leader.Driver?.familyName)}</div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.8rem' }}>
                      {leader.Driver?.givenName} {leader.Driver?.familyName}
                    </h2>
                    <p style={{ margin: '0.2rem 0', color: '#b8c2d0' }}>Equipo: {leader.Constructors?.[0]?.name || '—'}</p>
                    <p style={{ margin: 0, color: '#ff9a7a', fontWeight: 700 }}>
                      {leader.points} puntos · {leader.wins} victorias
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div style={{ ...cardStyle, padding: '1.2rem' }}>
              <h2 style={{ ...sectionTitleStyle, fontSize: '1.5rem', marginBottom: '1rem' }}>Posiciones del campeonato</h2>
              <div style={tableWrapStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Pos</th>
                      <th style={thStyle}>Piloto</th>
                      <th style={thStyle}>Equipo</th>
                      <th style={thStyle}>Puntos</th>
                      <th style={thStyle}>Victorias</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((s) => (
                      <tr key={s.position}>
                        <td style={{ ...tdStyle, fontWeight: 800, color: podiumColors[s.position - 1] || '#ffffff' }}>{s.position}</td>
                        <td style={tdStyle}>
                          {s.Driver?.givenName} {s.Driver?.familyName}
                        </td>
                        <td style={tdStyle}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
                            <span
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: '#f8fafc',
                                border: `2px solid ${teamColor(s.Constructors?.[0]?.constructorId)}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0,
                              }}
                            >
                              <img
                                src="/F1/shield.png"
                                alt="Escudo de la escudería"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                              />
                            </span>
                            <span>{s.Constructors?.[0]?.name || '—'}</span>
                          </span>
                        </td>
                        <td style={tdStyle}>{s.points}</td>
                        <td style={tdStyle}>{s.wins}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ ...cardStyle, padding: '1.2rem', display: 'grid', gap: '1rem' }}>
              <h2 style={{ ...sectionTitleStyle, fontSize: '1.5rem' }}>Carreras del campeonato</h2>
              {completedRaces.length === 0 ? (
                <p style={{ color: '#b8c2d0', margin: 0 }}>Todavía no hay carreras disputadas en esta temporada.</p>
              ) : (
                <div style={{ display: 'grid', gap: '0.7rem' }}>
                  {completedRaces.map((r) => (
                    <div
                      key={r.round}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        padding: '0.9rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(225,6,0,0.25)',
                        background: 'rgba(225,6,0,0.05)',
                      }}
                    >
                      <span
                        style={{
                          minWidth: '44px',
                          textAlign: 'center',
                          padding: '0.35rem 0.5rem',
                          borderRadius: '8px',
                          background: 'linear-gradient(90deg, rgba(225,6,0,0.35), rgba(255,88,0,0.3))',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                        }}
                      >
                        R{r.round}
                      </span>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <strong>{r.raceName}</strong>
                        <span style={{ color: '#b8c2d0', fontSize: '0.9rem', marginLeft: '0.5rem' }}>{r.circuit}</span>
                      </div>
                      <time style={{ color: '#06b6d4', fontSize: '0.85rem', fontWeight: 700 }}>{formatDate(r.date)}</time>
                      <span style={{ color: '#ff9a7a', fontWeight: 700, fontSize: '0.9rem' }}>Ganador: {r.winner}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default F1Current
