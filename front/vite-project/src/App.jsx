import { useContext, useEffect} from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import About from "./views/About/About";
import CrearTurnos from "./views/CrearTurnos/CrearTurnos";
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import MisTurnos from './views/MisTurnos/MisTurnos';
import Register from './views/Register/Register';
import NavBar from './components/NavBar/NavBar';
import NotFound from './views/NotFound/NotFound';
import styles from './App.module.css';
import { UserContext } from '../context/UsersContex';

function App() {
  const {userId}= useContext(UserContext)
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/login", "/register"];
    const protectedRoutes = ["/", "/misturnos", "/about", "/contacto"];

    if (!userId) {
      if (protectedRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    } else {
      if (publicRoutes.includes(location.pathname)) {
        navigate("/");
      }
    }
  }, [userId, location.pathname, navigate]);

  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    
    <div className={styles.background}>
      {userId && <NavBar />}

      <main className={!isAuthPage ? styles.contentPage : ''}>
        <Routes>
          
          <Route path='/login' element={ 
            <div className={styles.loginContainer} >
              <div className={styles.loginWrapper}>
                <div className={styles.leftPanel}>
                    <h2>Bienvenido</h2>
                    <div className={styles.logoPlaceholder}>
                        <img src='../public/images/logo.jpg' alt="Logo" className={styles.imgLogo }/>
                    </div>
                </div>
                <div className={styles.rightPanel}>
                    <Login />
                </div>
              </div>
            </div>} />

          
          <Route path='/register' element={<Register />} />
          
          {userId ? (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/misturnos' element={<MisTurnos />} />
              <Route path='/crearturnos' element={<CrearTurnos />} />
              <Route path='/about' element={<About />} />
            </>
          ) : (
            <Route path='*' element={<Login  />} />
          )}

          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;