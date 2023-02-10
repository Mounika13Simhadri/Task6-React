import React, { useEffect,useState} from "react";
import Employees from './Employees.js'


function Departments() {
  const [emp,setEmp]=useState()
  const [department, setDepartment] = useState([]);
  const [open, setOpen] = useState("");
  const [message, setMessage] = useState("");
  const [dsubmit, setSubmit] = useState(true);
  const [dName,setDname]=useState("");
  const[did,setDid]=useState()
 
  const[t,setT]=useState()
  const [counter, setCounter] = useState(30);
    useEffect(()=>{
      if(counter>0){
          setT(setTimeout(() => setCounter(counter - 1), 1000));
      }
      else {
        setOpen("")
      }
    },[emp,dName,counter])
  const resetTimer=()=>{
    clearTimeout(t);
    setCounter(30);
  }
  const submitInfo = (event) => {
    setDname(event.target.value);
    resetTimer();
  };   

  const handleDepartment = (event) => {

    event.preventDefault();
    const val =department.dptName;
    if (val !== "") {
      setDepartment((prevValues) => [
        ...prevValues,
        {
          id: Math.floor(new Date().valueOf() * Math.random()),
          dptName: dName.toUpperCase(),
          employees:[]
        }
      ]);
      setOpen("")
    } else {
      setMessage("department");
    }
    setDname("")
  };

  const departmentEdit = (dep) => {

    setDname(dName)
    resetTimer();
    setDid(dep.id);
    setSubmit(false);
    setOpen("department"); 
  };

  const departmentUpdate=()=>{
    setDepartment([...department].filter((value) => {

      if (value.id ===did) {
        return (value.dptName=dName);
      } else {
        return value.dptName;
      }
    }))
  }
  
  const departmentDelete = (dep) => {
    const newValue = [...department].filter((value) => value.id !== dep.id);
    setDepartment(newValue);
  };

  const handleEmployee=(d)=>{
    resetTimer();
    setDid(d.id);
    setOpen("table");
       
  }
  
  return (
    <>
       {/* Department Details */}
      <div className="first-div">
        <label>
          <h1>Department List</h1>
        </label>
        <button className="btadd" onClick={()=>{resetTimer();setOpen("department")}}>ADD</button>
        <div className="div-3">
          <ol >
            {department.map((d) => (
                <li key={d.id}>
                  <button className="dlink" onClick={()=>handleEmployee(d)}>{d.dptName}</button>
                  <button onClick={() => departmentEdit(d)}>Edit</button>
                  <button onClick={()  => {
                    if (window.confirm("Do you want to delete ?")) {
                      departmentDelete(d)
                    }}}>Delete</button>
                </li>
               
            ))}
          </ol>
        </div>
      </div>

      <div className="second-div">
      
      {(open==="department") &&<form  className="form1">
        <div className="timer2">
        <button id="close" onClick={()=>setOpen("")}>X</button>
          <label className="timer">{counter}</label>
        </div>
        <label>Enter the Department to be added</label>
       
        <input autoFocus type="text" className="txt1" placeholder="e.x:IT" onChange={(event)=>submitInfo(event)} value={dName}/>
        {(message==="department") && <h5>Please Enter the value!</h5>}
        <button className="btsbmt"onClick={dsubmit ? handleDepartment : departmentUpdate}>{dsubmit ? "Submit" : "Update"}</button>
      </form>}
    </div>
    <Employees resetTimer={resetTimer}setEmp={setEmp} counter={counter} setOpen={setOpen} open={open}  did={did} setMessage={setMessage} message={message} setDepartment={setDepartment} department={department}/>
  </>
  );
}

export default Departments;
