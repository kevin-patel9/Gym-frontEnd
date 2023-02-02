import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginFail, loginStart, loginSuccess } from "../../components/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(()=> {
    localStorage.setItem("user", JSON.stringify(auth.user))
  }, [auth.user])

  const handleChange = (e) => {
    setCredential(prev => ({...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch(loginStart())

    try {

        const res = await axios.post("http://localhost:9000/auth/login", credential)
        dispatch(loginSuccess(res.data))
        navigate("/")
        
    } catch (err) {
        dispatch(loginFail(err.response.data))
    }
  }

  return (
    <div className="login">
      <div className="loginContain">
        <h2>User & Owner Can Login</h2>
        <input
          type="text"
          onChange={handleChange}
          placeholder="email"
          id="email"
          className="loginInput"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="password"
          id="password"
          className="passwordInput"
        />
        <button disabled={auth.loading} onClick={handleClick} className="loginBtn"> Login </button>
        <Link to="/register" className="signUpLink" >
          <p>Sign Up</p>
        </Link>
        {auth.error && <span className="databaseResponse">{auth.error}</span>}
      </div>
    </div>
  );
};

export default LoginPage;
