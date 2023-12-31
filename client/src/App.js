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
import Dashboard from './components/Dashboard';
import CreateTask from './components/CreateTask';
import TaskState from './context/tasks/TaskState';




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
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/create',
    element: <CreateTask />
  },
  
])

function App() {
  return (
    <main className="App">
      <TaskState>
      <RouterProvider router={router}>

      </RouterProvider>
      </TaskState>
    </main>
  );
}

export default App;
