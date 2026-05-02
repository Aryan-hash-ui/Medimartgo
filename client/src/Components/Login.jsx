import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function getInputData(e) {
    const { name, value } = e.target;
    setData((old) => ({ ...old, [name]: value }));
  }

  async function postData(e) {
    e.preventDefault();

    if (!BASE_URL) {
      alert("❌ REACT_APP_API_URL is not configured in Vercel!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ 
          username: data.username, 
          password: data.password 
        })
      });

      const result = await response.json();

      if (result.status === 200) {
        localStorage.setItem("login", true);
        localStorage.setItem("userid", result.data._id);
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("username", result.data.username);
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("token", result.token);

        if (result.data.role === "Buyer") {
          navigate("/profile");
        } else {
          navigate("/adminhome");
        }
      } else {
        setShow(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setShow(true);
    }
  }

  // Eye Icons (kept your design)
  const EyeOpenIcon = () => <span>👁️</span>;
  const EyeClosedIcon = () => <span>🙈</span>;

  return (
    <>
      <div className="container-fluid my-3">
        <div className="w-75 m-auto">
          <h5 className='text-center bg-primary p-2 text-light'>
            <span className='text-warning fs-3'>Login</span> to Your Account
          </h5>
          {show && <p className='text-danger text-center p-2'>Invalid Username or Password</p>}

          <form onSubmit={postData}>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={getInputData}
                placeholder='User Name'
                className='form-control'
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label>Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={getInputData}
                  placeholder="Password"
                  className="form-control"
                  required
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <div className="btn-group w-100">
                <Link to="/signup" className='btn btn-success'>Signup</Link>
                <button type="submit" className='btn btn-success'>Login</button>
              </div>
              <Link to="/forget-password-1" className="d-block mt-2">Forget Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}