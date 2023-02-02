import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarItem } from './hooks/navbar';
import { HomePage } from './pages/HomePage/homePage';
import { LoginPage } from './pages/LoginPage/loginPage';
import { PageNotFound } from './pages/PageNotFound/pageNotFound';
import { RegisterPage } from './pages/RegisterPage/registerPage';

const App = () => {

  return (
    <div className="App">
      <Router>
        <NavbarItem />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
