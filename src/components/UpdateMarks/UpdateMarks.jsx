// import logo from './logo.svg';
import { useSelector } from 'react-redux';
import './home1.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';




function UpdateMarks() {
  const user = useSelector((state)=> state.auth.user);



  console.log(user)
  let [array,setArray]=useState([]);
  const [markstotal , setmarksTotal] = useState([])
  let [inputdata,setInputdata]=useState({SubjectName:"",marks:0});

  let [isUpdated ,setisUpdated] = useState(false)
  let [index,setIndex]=useState()
  let [bolin,setBolin]=useState(false);
  let {SubjectName,marks}=inputdata;
  let [marksheet , setMarkssheet] = useState([])

  // useEffect(()=>{
  //   axios.get('http://localhost:4000/api/v1/marks/getsheet')
  //   .then(resp=>
  //      setMarkssheet(resp.data?.marksheets),
  //      setisUpdated(marksheet?.filter(item=>item?.id == user._id).map(item=> item?.isUpdated))
  //      )

  // },[marksheet])

  // console.log(marksheet.filter(item=>item.id == user._id).map(item=> item.isUpdated))

 console.log(isUpdated)






  function data(e){
      setInputdata({...inputdata,[e.target.name]:e.target.value})
  }


  function addinputdata(){

      if(SubjectName==="" && marks===""){
          alert("Enter Name and Roll no ")
      }
      else{
      setArray([...array,{ SubjectName, marks}])
      // console.log(inputdata)
      setInputdata({SubjectName:"",marks:0})
  }
  }




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
    axios.put('https://shajubackend.vercel.app/api/v1/marks/updatemarks',{
      id: user?._id,
      marksdata : array
    },{
      headers : {
        "Content-Type" : "application/json",

      }, 
      withCredentials : true
    })
    toast.success("Marks Successfully Added")


  }catch(err){
    console.log(err)
  }
}
return (
  <div>
        <h3>Welcome {user.name}</h3>
          <input type="text" value={inputdata.SubjectName || ""} name='SubjectName' autoComplete='off' placeholder='Add your Subject' onChange={data}  />
          <input type="number" value={inputdata.marks || ""} name="marks" placeholder='add your marks' onChange={data} />

          <button onClick={!bolin?addinputdata:updateinfo}>{!bolin?`Add data`:`Update data`}</button>

          <br />

          <table border="1" >
              <tbody>
                  <tr>
                      <th>Subject Name</th>
                      <th>Marks</th>
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
    
          
            <button onClick={submitData}>Update Data</button>
            
  </div>
)

}

export default UpdateMarks;
