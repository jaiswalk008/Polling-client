import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './Components/User/Signup'
import Login from './Components/User/Login'
import { Provider, useSelector } from 'react-redux'
import { store } from './Components/Context/store'
import App from './App'
import Home from './Components/Polling/Home'
import Profile from './Components/Profile/Profile'
import PollDetails from './Components/Polling/PollDetails'


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSelector((state: any) => state.auth);
  return token.length > 0 ? children : <Navigate to="/login" />;
};
const appRouter = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children:[
     {
      path:'/',
      element:<Home/>
     },
     {
      path:'/:pollId',
      element:<PollDetails/>
     },
     {
      path:'/profile',
      element:<Profile/>
     },

    ]
  
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={appRouter}/>
    </Provider>
    
  </React.StrictMode>,

)
