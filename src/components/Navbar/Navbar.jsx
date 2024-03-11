import React , {useState , useEffect} from 'react';
import { useContext } from 'react';
import {Link} from 'react-router-dom'
import './navbar.scss';
import axios from 'axios';
import toast from 'react-hot-toast';
// import playstore from '../../assets/navbarIcons/google-play.png';
// import appstore from '../../assets/navbarIcons/app-store.png';
// import donation from '../../assets/navbarIcons/donation.png';
// import help from '../../assets/navbarIcons/help.png'
// import shopping from '../../assets/navbarIcons/shopping.png';
// import login from '../../assets/navbarIcons/login.png';
// import logo from '../../assets/navbarIcons/logo.png';
// import Dropdown from './Dropdowns/Dropdown.jsx';
// import DropdownWisdom from './DropdownWisdom/DropdownWisdom.jsx';
// import AboutDropdown from './AboutDropdown';
// import WisdomDropdown from './WisdomDropdown';

// import SocialDropdown from './SocialDropdown';
// import DropdownSocial from './DropdownSocial/DropdownSocial';

// import EventsDropdown from './EventsDropdown';
// import DropdownEvents from './DropdownEvents/DropdownEvents';
import { useNavigate, useLocation } from 'react-router-dom'
// import { useContext } from 'react';
import {Context} from '../../index.js';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice.js';
import { useSelector } from 'react-redux';


const topNavbar = [
  {
    name : 'Google PlayStore',
    // icon : playstore
  },
  {
    name : 'Appstore',
    // icon : appstore
  },

]

const topNavbar2 = [

  {
    name : 'Donate',
    // icon : donation,
    link : '/donation'
  },

  {
    name : 'Login/SignUp',
    // icon : login,
    link: '/login'
  },
  {
    name : 'Volunteer',
    // icon : help,
    link: '/volunteer'
  }
]



const Navbar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // const {user} = useSelector((state)=> state?.auth?.user);
  // console.log('user',user)
  const url ="http://localhost:4000";
  // const {isAuthenticated ,setIsAuthenticated} =  useContext(Context);
  // console.log(user)

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownwisdom, setDropdownwisdom] = useState(false);
  const [dropdownsocial, setDropdownsocial] = useState(false);
  const [dropdownevents, setDropdownevents] = useState(false);

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useSendLogoutMutation();

const Logout = () => {
  return sendLogout;
  
}


useEffect(() => {
  if (isSuccess) navigate('/')
}, [isSuccess, navigate])

if (isLoading) return <p>Logging Out...</p>

if (isError) return <p>Error: {error.data?.message}</p>


  // const [dropdown2, setDropdown2] = useState(false);
  // const [dropdown3, setDropdown3] = useState(false);
  // const [dropdown4, setDropdown4] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = async () => {
    // setloading(true)
    // try{
    //    await axios.get(
    //     `${url}/api/v1/logout`,
        
    //     // { withCredentials : true }
    //   )
    //   toast.success("Logged out Successfully")
    //   setIsAuthenticated(false);
    //   setUser({})
    //   setloading(false)
      

    // }catch(err){
    //   toast.error(err.msg);
    //   setIsAuthenticated(true)
    //   setloading(false)

    // }

    // dispatch(login(values.email , values.password , values.name))
    // localStorage.setItem("currentUser", JSON.stringify({values}))
    // dispatch(login(values.email , values.password));
  };



  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);

    } else {
      setDropdown(true);

    }
  };

  const onMouseEnter1 = () => {
    if (window.innerWidth < 960) {
      setDropdownwisdom(false);

    } else {
      setDropdownwisdom(true);

    }
  };

  const onMouseEnter2 = () => {
    if (window.innerWidth < 960) {
      setDropdownsocial(false);

    } else {
      setDropdownsocial(true);

    }
  };

  const onMouseEnter3 = () => {
    if (window.innerWidth < 960) {
      setDropdownevents(false);

    } else {
      setDropdownevents(true);

    }
  };


  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);

    } else {
      setDropdown(false);

    }
  };

  const onMouseLeave1 = () => {
    if (window.innerWidth < 960) {
      setDropdownwisdom(false);

    } else {
      setDropdownwisdom(false);

    }
  };

  const onMouseLeave2 = () => {
    if (window.innerWidth < 960) {
      setDropdownsocial(false);

    } else {
      setDropdownsocial(false);

    }
  };

  const onMouseLeave3 = () => {
    if (window.innerWidth < 960) {
      setDropdownevents(false);

    } else {
      setDropdownevents(false);

    }
  };


    
  return (
    <div className='navbar'>
      <div className="navbarTop">
    
        <div className="top2">

  
  



<>

<Link to='/' style={{textDecoration:'none', color:'inherit'}}>
                  <div className='top2Container'>
                    <h5>Login</h5>

                  </div>
                
</Link>


<Link to='/private/home' style={{textDecoration:'none', color:'inherit'}}>
                  <div className='top2Container'>
                    <h5>Home</h5>

                  </div>
                
</Link>

  


  <Link to='/private/mymarks' style={{textDecoration:'none', color:'inherit'}}>
                    <div className='top2Container'>
                      <h5>My Marks</h5>

                    </div>
                  
  </Link>

  <Link to='/private/updatemarks' style={{textDecoration:'none', color:'inherit'}}>
                    <div className='top2Container'>
                      <h5>Update</h5>

                    </div>
                  
  </Link>

  {/* <Link to='/private/cumilativemarks' style={{textDecoration:'none', color:'inherit'}}>
                    <div className='top2Container'>
                      <h5>All Candidates</h5>

                    </div>
                  
  </Link> */}
</>


  <>
    <Link to='/' style={{textDecoration:'none', color:'inherit'}} >
                    <div className='top2Container' onClick={sendLogout}>
                      <h5>Logout</h5>

                    </div>
                  
  </Link>
  </>


{/* )} */}



        </div>
      </div>
      <div className="navbarBottom">
        {/* <div className="bottomLeft">
          <Link to="/">
              <img className='brandLogo' src={logo}/>

          </Link>
        </div>
        <div className="bottomRight">
            <nav className='bottomNavbar'>
               <ul className={click ? 'nav-menu active' : 'nav-menu'}>
               <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            >
              <Link 
                to="/"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About <i className='fas fa-caret-down' />
              </Link>
              {dropdown && <Dropdown item={AboutDropdown}/>}
              </li>

              <li
            className='nav-item'
            onMouseEnter={onMouseEnter1}
            onMouseLeave={onMouseLeave1}
            >
              <Link 
                to="/"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Wisdom <i className='fas fa-caret-down' />
              </Link>
              {dropdownwisdom && <DropdownWisdom item={WisdomDropdown}/>}
              </li>
              
              <li
            className='nav-item'
            onMouseEnter={onMouseEnter3}
            onMouseLeave={onMouseLeave3}
            >
              <Link 
                to="/"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Events <i className='fas fa-caret-down' />
              </Link>
              {dropdownevents && <DropdownEvents item={EventsDropdown}/>}
              </li>

              <li
            className='nav-item'
            onMouseEnter={onMouseEnter2}
            onMouseLeave={onMouseLeave2}
            >
              <Link 
                to="/about"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Social Initiatives 
              </Link>
              {dropdownsocial && <DropdownSocial item={SocialDropdown}/>}
              </li>

              <li
            className='nav-item'
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
            >
              <Link 
                to="/about"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Yug Rishi Pooja Center <i className='fas fa-caret-down' />
              </Link>
              </li>

              <li
            className='nav-item'
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
            >
              <Link 
                to="/about"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Pooja & Medidation <i className='fas fa-caret-down' />
              </Link>
              </li>

              <li
            className='nav-item'
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
            >
              <Link 
                to="/about"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                News <i className='fas fa-caret-down' />
              </Link>
              </li>

              <li
            className='nav-item'
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
            >
              <Link 
                to="/about"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Be A Member <i className='fas fa-caret-down' />
              </Link>
              </li>


              <li
            className='nav-item'
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
            >
              <Link 
                to="/centers"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Centers <i className='fas fa-caret-down' />
              </Link>
              </li>
               </ul>
            </nav>
        </div> */}
      </div>

    </div>
  )
}

export default Navbar