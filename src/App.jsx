import router from '../route/router';
import {RouterProvider} from 'react-router-dom'
import './assets/all.scss';

function App() {
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
