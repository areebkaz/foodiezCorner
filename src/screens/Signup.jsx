import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        geolocation: ''
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Use 'Content-Type' instead of 'Content-type'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                location: credentials.geolocation,
                password: credentials.password
            })
        });

        const json = await response.json();

        if (!json.success) {
            alert('Enter valid credentials');
        }
        if (json.success) {
            navigate('/login')
          }
    };

    const onChange = (event) => {
        setCredentials({
            ...credentials, [event.target.name]: event.target.value
        })
    }

    return (
        <div className='bg-light' style={{minHeight:'618px'}}>
            <div className='container'>
                <form className='pt-5' onSubmit={handleSubmit}>
                <p className='text-center fw-bold fst-italic h1'>SignUp</p>
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" name="name" value={credentials.name} onChange={onChange} aria-describedby="name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="geolocation" className="form-label">Location</label>
                        <input type="name" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} aria-describedby="location" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                    <button type="submit" className="m-3 btn btn-primary text-white">Sign Up</button>
                    <Link to={'/login'} className='m-3 btn btn-outline-primary'>Already a user</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup
