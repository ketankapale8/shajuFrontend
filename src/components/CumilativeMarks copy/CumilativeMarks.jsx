import { useSelector } from 'react-redux';
import './marks.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const CumilativeMarks = () => {
    const user = useSelector((state)=> state.auth.user);
    console.log(user._id)
    let [marksheet , setMarkssheet] = useState([])

    useEffect(()=> {
        axios.get('https://shajubackend.vercel.app/api/v1/marks/getsheet')
        .then(resp=>
           setMarkssheet(resp.data?.marksheets),
        
           
           
           
           ).catch(err=>{
               console.log(err)
            })
    
            
        },[])
  return (
    <div>CumilativeMarks</div>
  )
}

export default CumilativeMarks