import React , {useState , useMemo} from 'react';
import './signup.scss';
import { useContext } from 'react';
import {Context} from '../../index.js';
// import logo from '../../assets/logo.png';
import { Link , Navigate} from 'react-router-dom';
// import countryList from 'react-select-country-list';
// import DatePicker from "react-datepicker";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const url ="https://shajubackend.vercel.app/api/v1";
  // const {isAuthenticated, setIsAuthenticated , loading , setloading} = useContext(Context)
    // const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    // const [countryList , setCountryList] = useState([{label : Country.getAllCountries().map(item=>item.name)}]);

    const [values , setValues] = useState({
      name : '',
      email :'',
      password :'',
 
    })


    const { email , password , name } = values;


    const handleSubmit = async (e) => {
      e.preventDefault();
      try{

        const {data} = await axios.post(
          `${url}/create/createuser`, 
          {
            name  , 
            email ,
            password,
          
          },
          {
            headers : {
              "Content-Type" : "application/json",
            }, 
            // withCredentials : true
          }
        )

        toast.success(data.success)
        
      }catch(err){
        toast.error(err.message)

      }
      

    
  }


  // if(isAuthenticated) return <Navigate to={"/"}/>

  console.log(values)
     

    


   
    // console.log(State.getStatesOfCountry("IN"))
  return (
    <>
    
    <div className='signup'>
        <div className="loginContainer1">
            <div className="topTitleBox">

                <div className="titles" >
                    <h2>Signup</h2>
                    {/* <p>Login to your VJM Profile</p> */}

                </div>
            </div>

                <div className="inputBox">
                    <h4>Full Name</h4>
                    <input placeholder='Please enter your name' type='text' onChange={(e)=> setValues({...values , name : e.target.value})}/>
      
                    <h4>Email</h4>
                    <input placeholder='Please enter your email' type='email' onChange={(e)=> setValues({...values , email : e.target.value})}/>
                    <h4>Password</h4>
                    <input placeholder='please enter your password' type='password' onChange={(e)=> setValues({...values , password : e.target.value})}/>
                   

                    
                    <div className="loginSignUp" >
                        <button className='loginBtn' onClick={handleSubmit}>Sign Up</button>
                    </div>
                    <div className="signUpContainer">
                        <h4>Already have an account?</h4>
                        <Link to="/" style={{textDecoration:'none', color:'inherit'}}>
                        <button className='loginBtns' style={{marginLeft:'25px'}}>Login</button>
                        </Link>
                        
                    </div>
                </div>

        </div>
    </div>
    </>
  )
}

export default Signup