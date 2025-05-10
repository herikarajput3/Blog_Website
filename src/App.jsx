import './App.css'
import AuthModal from './Components/AuthModal';
import Home from './Pages/Home/Home';
import PublicHome from './Pages/Home/PublicHome'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<PublicHome />} />
          <Route path='/home' element={<Home />} />

        </Routes>
      </Router>
    </>
  )
}

export default App;
