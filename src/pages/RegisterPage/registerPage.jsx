
import "./register.css";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import QRCode from 'qrcode';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";



export const RegisterPage = () => {
  const [register, setRegister] = useState("");
  const [credential, setCredential] = useState({
    name: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    qrCode: undefined,
    userCode: undefined,
  });
  const [url, setUrl] = useState("a");
  const [qrCode, setCode] = useState("a");
  const [randomUserCode, setRandomUserCode] = useState("ABCDEF");

  const navigate = useNavigate()

  const handleChange = (e) => {
    QRCode.toDataURL(url, (err, url) =>{
      if (err) console.error(err);

      setCode(url);
  })
    setUrl(e.target.value);

    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value, 
      qrCode, userCode: randomUserCode }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
       await axios.post("http://localhost:9000/auth/register", credential);
      navigate("/login");
      
    } catch (err) {
      console.log(err.response.data);
      setRegister(err.response.data);
    }
  };

  let colors = [0, 1, 2, 3, 4 , 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G",
                "H", "I", "J", "K", "L", "M", "N", "O", "P"];

  useEffect(()=>{
    const userCode = () => {
      let hex = "";
    for (let i = 0 ; i < 6 ; i++) {
        hex += colors[getNumbers()] ;
      }
      setRandomUserCode(hex);
    }
    userCode()
  }, [])



function getNumbers () {
  return Math.floor(Math.random () * colors.length);
}


  return (
    <div className="register">
      <div className="registerContain">
        <h2>User Registration</h2>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Full Name"
          id="name"
          className="registerInput"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Username"
          id="username"
          className="registerInput"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Email"
          id="email"
          className="registerInput"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="Password"
          id="password"
          className="passwordInput"
        />
        <Button onClick={handleClick} id="registerBtn">
          Register
        </Button>
        <Link to="/login" className="loginPage">
        <p>Already have a account? <i>Login</i></p>
        </Link>
        {register}
      </div>
    </div>
  );
};

export default RegisterPage;
