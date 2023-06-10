import React,{useState} from 'react'
// import {useHistory} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
    // let history = useHistory()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            //   "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3ZjQ3ZTI2Y2RmZTkzNzBhZDc2NGU0In0sImlhdCI6MTY4NjIyMDU4MX0.q6GJXUlv3TNad06IPgwH36qjhvxcQKXmD7m2qU9Jwz4"
      
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){

              // Save the auth token and redirect
              localStorage.setItem('token', json.authtoken);
              navigate("/");
              props.showAlert("Logged in Successfully","success")
            }else{
                props.showAlert("Login failes","danger")
            }

    }
    const onChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password"/>
    </div>
    
    <button type="submit" className="btn btn-primary" >Submit</button>
  </form>
  </div>
  )
}

export default Login