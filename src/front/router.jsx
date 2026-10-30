import { createHashRouter } from 'react-router-dom'
import F1Home from './page/F1Home'
import F1Current from './page/F1Current'
import F1History from './Componente/F1History'
import F1News from './Componente/F1News'

const router = createHashRouter([
  {
    path: '/',
    element: <F1Home />,
  },
  {
    path: '/temporada',
    element: <F1Current />,
  },
  {
    path: '/historia',
    element: <F1History />,
  },
  {
    path: '/noticias',
    element: <F1News />,
  },
])

export default router
