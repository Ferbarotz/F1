const F1Background = () => {
  const glowA = {
    position: 'absolute',
    top: '-12%',
    left: '-8%',
    width: '55vw',
    height: '55vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(225,6,0,0.85) 0%, rgba(225,6,0,0) 70%)',
    animation: 'f1GlowA 13s ease-in-out infinite alternate',
  }

  const glowB = {
    position: 'absolute',
    top: '8%',
    right: '-14%',
    width: '50vw',
    height: '50vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,88,0,0.85) 0%, rgba(255,88,0,0) 70%)',
    animation: 'f1GlowB 17s ease-in-out infinite alternate',
  }

  const glowC = {
    position: 'absolute',
    bottom: '-22%',
    left: '28%',
    width: '60vw',
    height: '60vw',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(150,20,0,0.75) 0%, rgba(150,20,0,0) 70%)',
    animation: 'f1GlowC 21s ease-in-out infinite alternate',
  }

  const grid = {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(225,6,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(225,6,0,0.12) 1px, transparent 1px)',
    backgroundSize: '56px 56px',
    maskImage: 'radial-gradient(circle at 50% 18%, black 25%, transparent 78%)',
    WebkitMaskImage: 'radial-gradient(circle at 50% 18%, black 25%, transparent 78%)',
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          overflow: 'hidden',
          background: '#07050a',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

export default F1Background
