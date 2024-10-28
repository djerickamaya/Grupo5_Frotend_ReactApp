import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/css/App.css'
import { Login } from './pages/Auth/login/Login'
import { Register } from './pages/Auth/register/Register'
import { PrivateRoute } from './pages/Auth/Components/PrivateRoute'
import Dashboard from './pages/Dashboard/Dashboard';
import { Home } from './pages/Home/Home'
import { NotFound } from './pages/NotFound/NotFound'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
  
};

export default App
