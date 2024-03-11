import { useSelector } from 'react-redux';
import './cumilative.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const CumilativeMarks = () => {
    const user = useSelector((state)=> state.auth.user);
    console.log(user._id)
    let [marksheet , setMarkssheet] = useState([])
    let [allusers , setAllUsers] = useState([])


    useEffect(()=> {
        getAllMarksheets();
        getAllUsers()
    },[])
    
    
    const getAllMarksheets = () =>{
      
      axios.get('https://shajubackend.vercel.app/api/v1/marks/getsheet')
      .then(resp=>
         setMarkssheet(resp.data?.marksheets),
      
         
         
         
         ).catch(err=>{
             console.log(err)
          })
        }
    const getAllUsers = () => {
      axios.get('https://shajubackend.vercel.app/api/v1/all/allusers')
      .then(resp=>
        setAllUsers(resp.data),
      
         
         
         
         ).catch(err=>{
             console.log(err)
          })
    }

        console.log(marksheet.map(item =>item.marksdata.map(i=>i)))
  return (
    <div className='cumilative'>
        <div className="mainContainer">
          {marksheet.map(item=>{
            return (
              <>
                <div className="boxContainer">
            
                </div>
              </>
            )
          })}
        </div>
    </div>


  )
}

export default CumilativeMarks