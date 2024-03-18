// import logo from './logo.svg';
import { useSelector } from 'react-redux';
import './home.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



function Home() {
  const user = useSelector((state)=> state.auth.user);
  const navigate = useNavigate()



  // console.log(user)
  let [array,setArray]=useState([]);
  const [markstotal , setmarksTotal] = useState([])
  let [inputdata,setInputdata]=useState({SubjectName:"",marks:0 , marks1:0,marks2:0 ,marks3:0,marks4:0});
  let [divider , setDivider] = useState(0)

  let [isUpdated ,setisUpdated] = useState([])
  let [index,setIndex]=useState()
  let [bolin,setBolin]=useState(false);
  let {SubjectName,marks}=inputdata;
  let [marksheet , setMarkssheet] = useState([])

  useEffect(()=>{
    axios.get('https://shajubackend.vercel.app/api/v1/marks/getsheet')
    .then(resp=>
       setMarkssheet(resp.data?.marksheets),
       setisUpdated(marksheet?.filter(item=>item?.id == user._id).map(item=> item?.isUpdated))
       )

  },[marksheet])

  // console.log(marksheet.filter(item=>item.id == user._id).map(item=> item.isUpdated))







  function data(e){
      setInputdata({...inputdata,[e.target.name]:e.target.value})
  
  }


  function addinputdata(){
 

      if(SubjectName=="" && marks==""){
          alert("Enter Name and Marks first before submitting ")
      }
      else{
   
      setArray([...array,{ SubjectName, marks : (Number(inputdata.marks1) + Number(inputdata.marks2) + Number(inputdata.marks3) + Number(inputdata.marks4))  / (divider * 10)  }])
      // console.log(inputdata)
      setInputdata({SubjectName:"",marks:0})
  }
  }

  console.log(divider)




// deleting row 
function deletedata(i){
  console.log(i,"this index row want to be delete")
  let total=[...array]
  total.splice(i,1)
  setArray(total)

}

// updatedata
function updatedata(i){

  let {SubjectName,marks}=array[i]//this perticular index no row data shoud be update so we get this index no row data in name or number 
  setInputdata({SubjectName,marks})
  setBolin(true)
  setIndex(i)

}



//know add data at perticular index means update it on that index
function updateinfo(){
  let total=[...array]
  total.splice(index,1,{SubjectName,marks})
  setArray(total)
   setBolin(false)
   setInputdata({SubjectName:"",marks:0})
}

const submitData = () => {
  try{
    axios.post('https://shajubackend.vercel.app/api/v1/marks/addmarks',{
      id: user?._id,
      marksdata : array
    },{
      headers : {
        "Content-Type" : "application/json",

      }, 
      withCredentials : true
    })
    toast.success("Marks Successfully Added");
    navigate('/private/mymarks')
    
    


  }catch(err){
    console.log(err)
  }
}


return (
  <div>
        <h3>Welcome ,{user.name}</h3>
          <input type="text" value={inputdata.SubjectName || ""} name='SubjectName' autoComplete='off' placeholder='Add your Subject' onChange={data}  />
          {/* <input type="number" value={inputdata.marks || ""} name="marks" placeholder='add your marks' disabled onChange={data} /> */}
          <input type="number" className='inputMarks' value={inputdata.marks1 || ""} name="marks1" placeholder='add marks betn 1 to 10' min={1} max={10}  onChange={data} onInputCapture={()=>setDivider(1)}/>
          <input type="number" className='inputMarks' value={inputdata.marks2 || ""} name="marks2" placeholder='add marks betn 1 to 10' min={1} max={10} onChange={data} onInputCapture={()=>setDivider(2)} />
          <input type="number" className='inputMarks' value={inputdata.marks3 || ""} name="marks3" placeholder='add marks betn 1 to 10' min={1} max={10}  onChange={data} onInputCapture={()=>setDivider(3)}/>
          <input type="number" className='inputMarks' value={inputdata.marks4 || ""} name="marks4" placeholder='add marks betn 1 to 10' min={1} max={10} onChange={data} onInputCapture={()=>setDivider(4)} />



          <button onClick={!bolin?addinputdata:updateinfo}>{!bolin?`Add data`:`Update data`}</button>

          <br />

          <table border="1" >
              <tbody>
                  <tr>
                      <th>Subject Name</th>
                      <th>Cumilative/Average Marks out of 10</th>
                      <th>Update Fields</th>
                      <th>Delete Item</th>
                      
                  </tr>
              {

array && array.map(
(item,i)=>{
  return(
      <tr key={i}>
          <td>{item.SubjectName}</td>
          <td>{item.marks}</td>
          <td><button onClick={()=>updatedata(i)}>update</button></td>
          <td><button onClick={()=>deletedata(i)}>Delete</button></td>
      </tr>
  )
}
)

              }







              </tbody>
          </table>
          {/* {isUpdated = true ? (
            <button type='disabled' onClick={null}>Update Data</button>
          ) : (isUpdated = null || []) ? ( */}
            <button onClick={submitData}>Update Data</button>
          {/* ) : null} */}

  </div>
)

}

export default Home;
