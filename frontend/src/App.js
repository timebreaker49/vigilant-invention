import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Home } from './components/Home';
import { Navigation } from './components/navigation';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-up" element={<Signup/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
