import { useSelector } from 'react-redux';
import './marks.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { makeStyles } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';

const MyMarks = () => {
  const user = useSelector((state)=> state.auth.user);
  console.log(user._id)
  let [marksheet , setMarkssheet] = useState([])
  let [getmysheet , setgetmysheet]= useState([])
  let [array,setArray]=useState([]);

  useEffect(()=> {
    axios.get('https://shajubackend.vercel.app/api/v1/marks/getsheet')
    .then(resp=>
       setMarkssheet(resp.data?.marksheets),
    
       
       
       
       ).catch(err=>{
           console.log(err)
        })

        
    },[])


    useEffect(()=>{
        getData()
    },[array])
    
    function getData(){
        setArray(marksheet?.filter(item=>item?.id == user._id))
    }

    console.log(array)






  return (
      <>
      <div>
        <h2>
        {user.name}'s Marks 

        </h2>
        </div>

      <table border="1" >
              <tbody>
                  <tr>
                      <th>Subject Name</th>
                      <th>Marks</th>
                    
                      
                  </tr>
              {

array && array.map(item=> item?.marksdata?.map(
(item,i)=>{
  return(
      <tr key={i}>
          <td>{item.SubjectName}</td>
          <td>{item.marks}</td>

      </tr>
  )
}
))

              }







              </tbody>
          </table>
    
    </>
  )
}

export default MyMarks