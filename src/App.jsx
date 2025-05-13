import './App.css'
import AuthModal from './Components/AuthModal';
import Layout from './Layout/Layout';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import BlogCreate from './Pages/BlogCreate/BlogCreate';
import Home from './Pages/Home/Home';
import PublicHome from './Pages/Home/PublicHome'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Post from './Pages/Post/Post';

function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<PublicHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/blog-create' element={<BlogCreate />} />
            <Route path='/post/:id' element={<Post />} />


          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App;
