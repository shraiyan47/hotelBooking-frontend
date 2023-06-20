import React, { useContext, useState } from 'react'
import "./login.css"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const navigate = useNavigate()

    const { user, loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (param) => { 
        setCredentials(prev => ({...prev, [param.target.id]:param.target.value}))
     }

     const handleLogin = async (param) => { 
        param.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({type:"LOGIN_SUCCESS", payload: res.data})
            navigate("/")
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE", payload:error.response.data})
        }
      }

      console.log("USER -> ", user)

    return (
        <div className='login'>
            <div className="lContainer">
                <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
                <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
                <button className="lButton" disabled={loading} onClick={handleLogin}>Login</button>
                {error &&
                    <span>
                        {error.message}
                    </span>
                }
            </div>
        </div>
    )
}
