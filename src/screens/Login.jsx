import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Use 'Content-Type' instead of 'Content-type'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();

    if (!json.success) {
      alert('Enter valid credentials');
    }
    if (json.success) {
      localStorage.setItem('userEmail',credentials.email)
      localStorage.setItem('authToken',json.authToken)
      navigate('/')
    }

  };

  const onChange = (event) => {
    setCredentials({
      ...credentials, [event.target.name]: event.target.value
    })
  }

  return (
    <div className='bg-light' style={{minHeight:'618px'}}>
      <div className='container pt-5'>
        <form className='' onSubmit={handleSubmit}>
          <p className='text-center fw-bold fst-italic h1'>Login</p>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-secondary text-white shadow-lg fs-5">Login</button>
          <Link to={"/createuser"} className='m-3 btn btn-outline-secondary text-dark fs-5'>New User ?</Link>
        </form>
      </div>
    </div>
  )
}

export default Login
