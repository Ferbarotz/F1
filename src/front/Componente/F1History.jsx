import { useEffect, useState } from 'react'
import F1Background from '../Componente/F1Background'

const WIKIPEDIA_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/'

// Historia de los Campeonatos Mundiales de Fórmula 1
// (temporada por temporada)
const championships = [
  { year: 1950, champion: 'Juan Manuel Fangio', team: 'Alfa Romeo', titles: 1, fact: 'Primer Mundial de Fórmula 1' },
  { year: 1951, champion: 'Alberto Ascari', team: 'Ferrari', titles: 1, fact: 'Debut campeón en la categoría' },
  { year: 1952, champion: 'Alberto Ascari', team: 'Ferrari', titles: 2, fact: 'Mantiene el liderato' },
  { year: 1953, champion: 'Juan Manuel Fangio', team: 'Alfa Romeo', titles: 2, fact: 'Regreso a la victoria' },
  { year: 1954, champion: 'Juan Manuel Fangio', team: 'Ferrari', titles: 3, fact: 'Tercer título' },
  { year: 1955, champion: 'Juan Manuel Fangio', team: 'Ferrari', titles: 4, fact: 'Cuarto título' },
  { year: 1956, champion: 'Juan Manuel Fangio', team: 'Ferrari', titles: 5, fact: 'Quinto y último título' },
  { year: 1957, champion: 'Jim Clark', team: 'Jaguar', titles: 1, fact: 'Dominio absoluto' },
  { year: 1958, champion: 'Mike Hawthorn', team: 'Ferrari', titles: 1, fact: 'Primer Mundial de Constructores' },
  { year: 1959, champion: 'Jack Brabham', team: 'Cooper', titles: 1, fact: 'Debut campeón' },
  { year: 1960, champion: 'Bruce McLaren', team: 'Cooper', titles: 1, fact: 'Correía su propio equipo' },
  { year: 1961, champion: 'Phil Hill', team: 'Ferrari', titles: 1, fact: 'Primer estadounidense campeón' },
  { year: 1962, champion: 'Graham Hill', team: 'BRM', titles: 1, fact: 'Primer británico campeón' },
  { year: 1963, champion: 'Jim Clark', team: 'Lotus', titles: 2, fact: 'Segunda corona' },
  { year: 1964, champion: 'John Surtees', team: 'Ferrari', titles: 1, fact: 'Único campeón europeo' },
  { year: 1965, champion: 'Jim Clark', team: 'Lotus', titles: 3, fact: 'Tercera corona' },
  { year: 1966, champion: 'Jack Brabham', team: 'Cooper', titles: 2, fact: 'Corrección de puntos' },
  { year: 1967, champion: 'Denny Hulme', team: 'McLaren', titles: 1, fact: 'Debut campeón' },
  { year: 1968, champion: 'Graham Hill', team: 'Lotus', titles: 2, fact: 'Segundo título' },
  { year: 1969, champion: 'Jackie Stewart', team: 'Matra', titles: 1, fact: 'Debut campeón' },
  { year: 1970, champion: 'Jochen Rindt', team: 'Lotus', titles: 1, fact: 'Campeón póstumo' },
  { year: 1971, champion: 'Jackie Stewart', team: 'Matra', titles: 2, fact: 'Segundo título' },
  { year: 1972, champion: 'Emerson Fittipaldi', team: 'McLaren', titles: 1, fact: 'Debut campeón' },
  { year: 1973, champion: 'Emerson Fittipaldi', team: 'McLaren', titles: 2, fact: 'Segundo título' },
  { year: 1974, champion: 'Emerson Fittipaldi', team: 'McLaren', titles: 3, fact: 'Tercer título' },
  { year: 1975, champion: 'Niki Lauda', team: 'Ferrari', titles: 1, fact: 'Debut campeón' },
  { year: 1976, champion: 'James Hunt', team: 'McLaren', titles: 1, fact: 'Leyenda en el título' },
  { year: 1977, champion: 'Alan Jones', team: 'Williams', titles: 1, fact: 'Debut campeón' },
  { year: 1978, champion: 'Mario Andretti', team: 'Lotus', titles: 1, fact: 'Récord de poles' },
  { year: 1979, champion: 'Jody Scheckter', team: 'Ferrari', titles: 1, fact: 'Debut campeón' },
  { year: 1980, champion: 'Alan Jones', team: 'Williams', titles: 2, fact: 'Segundo título' },
  { year: 1981, champion: 'Nelson Piquet', team: 'Brabham', titles: 1, fact: 'Debut campeón' },
  { year: 1982, champion: 'Keke Rosberg', team: 'Williams', titles: 1, fact: 'Debut campeón' },
  { year: 1983, champion: 'Nelson Piquet', team: 'Lotus', titles: 2, fact: 'Segundo título' },
  { year: 1984, champion: 'Alain Prost', team: 'McLaren', titles: 1, fact: 'Primer título moderno' },
  { year: 1985, champion: 'Alain Prost', team: 'Ferrari', titles: 2, fact: 'Segundo título' },
  { year: 1986, champion: 'Nigel Mansell', team: 'Williams', titles: 1, fact: 'Debut campeón' },
  { year: 1987, champion: 'Nelson Piquet', team: 'Lotus', titles: 3, fact: 'Tercer título' },
  { year: 1988, champion: 'Ayrton Senna', team: 'McLaren', titles: 1, fact: 'Debut campeón' },
  { year: 1989, champion: 'Ayrton Senna', team: 'McLaren', titles: 2, fact: 'Segundo título' },
  { year: 1990, champion: 'Ayrton Senna', team: 'McLaren', titles: 3, fact: 'Tercer título' },
  { year: 1991, champion: 'Ayrton Senna', team: 'McLaren', titles: 4, fact: 'Récord de poles' },
  { year: 1992, champion: 'Nigel Mansell', team: 'Williams', titles: 2, fact: 'Segundo título' },
  { year: 1993, champion: 'Alain Prost', team: 'Williams', titles: 3, fact: 'Tercer título' },
  { year: 1994, champion: 'Michael Schumacher', team: 'Ferrari', titles: 1, fact: 'Debut campeón' },
  { year: 1995, champion: 'Michael Schumacher', team: 'Ferrari', titles: 2, fact: 'Segundo título' },
  { year: 1996, champion: 'Damon Hill', team: 'Williams', titles: 1, fact: 'Debut campeón' },
  { year: 1997, champion: 'Jacques Villeneuve', team: 'Williams', titles: 1, fact: 'Debut campeón' },
  { year: 1998, champion: 'Mika Hakkinen', team: 'McLaren', titles: 1, fact: 'Debut campeón' },
  { year: 1999, champion: 'Eddie Irvine', team: 'Ferrari', titles: 1, fact: 'Debut campeón' },
  { year: 2000, champion: 'Mika Hakkinen', team: 'McLaren', titles: 2, fact: 'Segundo título' },
  { year: 2001, champion: 'Michael Schumacher', team: 'Ferrari', titles: 3, fact: 'Tercer título' },
  { year: 2002, champion: 'Michael Schumacher', team: 'Ferrari', titles: 4, fact: 'Cuarto título' },
  { year: 2003, champion: 'Michael Schumacher', team: 'Ferrari', titles: 5, fact: 'Quinto título' },
  { year: 2004, champion: 'Michael Schumacher', team: 'Ferrari', titles: 5, fact: 'Campeón con más títulos de la historia' },
  { year: 2005, champion: 'Fernando Alonso', team: 'Renault', titles: 1, fact: 'Debut campeón' },
  { year: 2006, champion: 'Fernando Alonso', team: 'Renault', titles: 2, fact: 'Segundo título' },
  { year: 2007, champion: 'Kimi Raikkonen', team: 'Ferrari', titles: 1, fact: 'Debut campeón' },
  { year: 2008, champion: 'Lewis Hamilton', team: 'McLaren', titles: 1, fact: 'Debut campeón' },
  { year: 2009, champion: 'Jenson Button', team: 'Brawn Mercedes', titles: 1, fact: 'Debut campeón' },
  { year: 2010, champion: 'Sebastian Vettel', team: 'Red Bull Racing', titles: 1, fact: 'Debut campeón' },
  { year: 2011, champion: 'Sebastian Vettel', team: 'Red Bull Racing', titles: 2, fact: 'Segundo título' },
  { year: 2012, champion: 'Sebastian Vettel', team: 'Red Bull Racing', titles: 3, fact: 'Tercer título' },
  { year: 2013, champion: 'Sebastian Vettel', team: 'Red Bull Racing', titles: 4, fact: 'Primer tetracampeón' },
  { year: 2014, champion: 'Lewis Hamilton', team: 'Mercedes', titles: 2, fact: 'Segundo título con Mercedes' },
  { year: 2015, champion: 'Lewis Hamilton', team: 'Mercedes', titles: 3, fact: 'Tercer título' },
  { year: 2016, champion: 'Nico Rosberg', team: 'Mercedes', titles: 1, fact: 'Debut campeón' },
  { year: 2017, champion: 'Lewis Hamilton', team: 'Mercedes', titles: 4, fact: 'Cuarto título' },
  { year: 2018, champion: 'Lewis Hamilton', team: 'Mercedes', titles: 5, fact: 'Quinto título' },
  { year: 2019, champion: 'Lewis Hamilton', team: 'Mercedes', titles: 6, fact: 'Sexto título' },
  { year: 2020, champion: 'Lewis Hamilton', team: 'Mercedes', titles: 7, fact: 'Récord histórico' },
  { year: 2021, champion: 'Lewis Hamilton', team: 'Mercedes', titles: 7, fact: 'Octavo título, nuevo récord' },
  { year: 2022, champion: 'Max Verstappen', team: 'Red Bull Racing', titles: 1, fact: 'Primer campeón neerlandés' },
  { year: 2023, champion: 'Max Verstappen', team: 'Red Bull Racing', titles: 2, fact: 'Segundo título' },
  { year: 2024, champion: 'Max Verstappen', team: 'Red Bull Racing', titles: 3, fact: 'Tercer título' },
  { year: 2025, champion: 'Max Verstappen', team: 'Red Bull Racing', titles: 4, fact: 'Cuarta corona consecutiva' },
];

const cardStyle = {
  background: 'linear-gradient(180deg, rgba(15,18,27,0.92) 0%, rgba(9,12,20,0.96) 100%)',
  border: '1px solid rgba(225,6,0,0.32)',
  borderRadius: '16px',
  boxShadow: '0 18px 48px rgba(0,0,0,0.55), 0 8px 26px rgba(225,6,0,0.14)',
  backdropFilter: 'blur(6px)',
}

const sectionTitleStyle = {
  margin: 0,
  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
  lineHeight: 1.15,
  textWrap: 'balance',
  background: 'linear-gradient(90deg, #E10600 0%, #FF5800 60%, #FFB000 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
}

const slugify = (name = '') =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '_')

const ChampionPhoto = ({ champion }) => {
  const [src, setSrc] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    setLoaded(false)
    setSrc(null)

    fetch(`${WIKIPEDIA_API}${slugify(champion)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return
        if (data && data.thumbnail && data.thumbnail.source) {
          setSrc(data.thumbnail.source)
          setLoaded(true)
        }
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [champion])

  const initials = champion
    .split(' ')
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const placeholderStyle = {
    width: '100%',
    height: '100%',
    minHeight: '120px',
    borderRadius: '10px',
    border: '1px solid rgba(225,6,0,0.35)',
    background: 'linear-gradient(140deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ff8a75',
    fontWeight: 800,
    fontSize: '1.6rem',
  }

  if (!loaded || !src) {
    return <div style={placeholderStyle}>{initials}</div>
  }

  return (
    <img
      src={src}
      alt={champion}
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px', border: '1px solid rgba(225,6,0,0.35)' }}
    />
  )
}

const F1History = () => {
  return (
    <>
      <F1Background />
      <section id="f1-history" style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center', display: 'grid', gap: '0.5rem', justifyItems: 'center' }}>
        <h2 style={sectionTitleStyle}>Historia de los Campeonatos</h2>
        <p style={{ color: '#b8c2d0', fontSize: '1rem', margin: 0 }}>Línea de tiempo de las temporadas que marcaron la Fórmula 1</p>
      </div>

      {/* Línea de tiempo histórica */}
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {championships.map((c) => (
          <div
            key={c.year}
            style={{
              ...cardStyle,
              padding: '1rem',
              display: 'flex',
              gap: '1.2rem',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ width: '96px', height: '96px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(225,6,0,0.35)', flexShrink: 0, background: 'linear-gradient(140deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))' }}>
              <ChampionPhoto champion={c.champion} />
            </div>
            <div style={{ display: 'grid', gap: '0.3rem', flex: 1, minWidth: '240px' }}>
              <span style={{ color: '#ff9a7a', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.08em' }}>{c.year}</span>
              <h3 style={{ margin: 0, fontSize: '1.35rem' }}>{c.champion}</h3>
              <p style={{ margin: 0, color: '#b8c2d0', fontSize: '0.95rem' }}>Equipo: {c.team}</p>
              <p style={{ margin: 0, color: '#e8edf5', fontSize: '0.95rem', lineHeight: 1.6 }}>{c.fact}</p>
              {c.titles > 1 && (
                <p style={{ margin: 0, color: '#ffd166', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  Total de títulos: {c.titles}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      </section>
    </>
  )
}

export default F1History
