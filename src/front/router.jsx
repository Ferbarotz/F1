import { createHashRouter } from 'react-router-dom'
import F1Page from './page/F1Page'

const router = createHashRouter([
  {
    path: '/',
    element: <F1Page />
  }
])

export default router
