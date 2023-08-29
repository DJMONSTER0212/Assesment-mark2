import logo from './logo.svg';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

import { AuthorizeUser, ProtectRoute } from './middleware/auth';




// Root Routes
const router = createBrowserRouter([
  {
    path:'/',
    element : <Username/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/password',
    element: <ProtectRoute><Password /></ProtectRoute>
  },
  {
    path: '/profile',
    element: <AuthorizeUser><Profile /></AuthorizeUser>
  },
  {
    path: '/recovery',
    element: <Recovery/>
  },
  {
    path: '/reset',
    element: <Reset/>
  },
  {
    path: '*',
    element: <PageNotFound/>
  },
  
])

function App() {
  return (
    <main className="App">
      <RouterProvider router={router}>

      </RouterProvider>
    </main>
  );
}

export default App;
