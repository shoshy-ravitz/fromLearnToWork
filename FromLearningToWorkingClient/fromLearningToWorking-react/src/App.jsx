import './App.css'
import { RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import { router } from './router'
import Home from './components/Home'
// import { RouterProvider } from 'react-router'
import Login from './components/Login'
import Register from './components/Register'
import ResumeUpload from './components/ResumeUpload'
import { Provider } from 'react-redux'
import Questions from './components/f'
import Interview from './components/Interview'
import store from './store/store'
function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        {/* <Interview/> */}
        ------------------
        {/* <Navbar/> */}
        {/* <RouterProvider router={router} /> */}
      </Provider>
    </>
  )
}

export default App
