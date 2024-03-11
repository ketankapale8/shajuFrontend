import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice.js';
import { useLoginMutation } from '../../features/auth/authApiSlice.js';

import usePersist from '../../hooks/usePersist.js';

import { useContext } from 'react';
import {Navigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss';
// import Footer from '../../common/Footer/Footer';
// import logo from '../../assets/logo.png';
import toast from 'react-hot-toast';
import { Context } from '../../index.js';

const Login = () => {

        // const {isAuthenticated, setIsAuthenticated } = useContext(Context)
        // console.log(isAuthenticated)
    // const [values, setValues] = useState({
    //     email: "",
    //     password: "",
    //     // confirmPassword: "",
    //   });
    //   const { email , password } = values;

    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
    

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { accessToken, foundUser } = await login({ email, password }).unwrap()
            dispatch(setCredentials({ accessToken ,foundUser}))
            setEmail('')
            setPassword('')
            navigate('/private/home')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing email or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            // errRef.current.focus();
        }

        // setloading(true)
        // try{
        //   const {data} = await axios.post(
        //     `${url}/api/v1/login`, 
        //     {
             
        //       email,
        //       password
        //     },
        //     {
        //       headers : {
        //         "Content-Type" : "application/json",
        //         // "Content-Type": "multipart/form-data",
                
                
        //       }, 
        //       // withCredentials : true
        //     }
        //   )
         
        //   toast.success("Logged In Successfully!")
        //   setUser(data.user)
        //   setIsAuthenticated(true)
        //   setloading(false)
          

        // }catch(err){
        //   toast.error("Check your Credentials!")
        //   setIsAuthenticated(false)
        //   setloading(false)

        // }

        // dispatch(login(values.email , values.password , values.name))
        // localStorage.setItem("currentUser", JSON.stringify({values}))
        // dispatch(login(values.email , values.password));
      };

      // if(isAuthenticated) return <Navigate to={"/"}/>

      const handleUserInput = (e) => setEmail(e.target.value)
      const handlePwdInput = (e) => setPassword(e.target.value)
      const handleToggle = () => setPersist(prev => !prev)

      
    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

  return (
    <>
    
    <div className='login'>
    <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
        <div className="loginContainer">
            <div className="topTitleBox">
                {/* <img alt='brand' src={logo} className='logo'/> */}

            </div>
                <div className="titles" >
                    <h2>Login</h2>
                    {/* <p>Login to your VJM Profile</p> */}

                </div>

                <div className="inputBox">
                    <h4>Email</h4>
                    <input placeholder='please enter your email' type='email' ref={userRef} value={email} onChange={handleUserInput} autoComplete='off' required />
                    <h4>Password</h4>
                    <input placeholder='please enter your password' type='password' value={password} 
                        onChange={handlePwdInput}
                        required
                    />
                    <div className="loginSignUp">
                        <button className='loginBtn' type='button' onClick={handleSubmit}>Login</button>
                    </div>
                    <div className="persistBtn">
                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>

                    </div>
                    <div className="signUpContainer">
                        <h4>Don't have an account?</h4>
                        <Link to="/signup" style={{textDecoration:'none', color:'inherit'}}>
                            <button className='loginBtns'>Sign Up</button>
                        
                        </Link>
                        
                    </div>
                </div>

        </div>
    </div>
    </>
  )
}

export default Login