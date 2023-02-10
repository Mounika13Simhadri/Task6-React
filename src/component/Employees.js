import React, { useState } from "react";

const intialDetails = {
  name: "",
  mobile: "",
  address: "",
};
function Employees({
  setOpen,
  open,
  did,
  setMessage,
  message,
  setDepartment,
  department,counter,setEmp,resetTimer
}) {
  const [esubmit, setEsubmit] = useState(true);
  const [eid, setEid] = useState();
  const [details, setDetails] = useState(intialDetails);

  const submitEinfo = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,

    });
    setEmp(e.target.value)
    resetTimer();
 
   
  };

  const employeeData = (e) => {
    e.preventDefault();
    if (
      details.name === "" ||
      details.mobile === "" ||
      details.address === ""
    )
    {
      setMessage("employee");
      setEsubmit(true);
    } else {
      const empValue = [...department].filter((value) => {
        if (value.id === did) {
          value.employees.push({
            empId: Math.floor(new Date().valueOf() * Math.random()),
            empName: details.name.toUpperCase(),
            empMobNo: details.mobile.toUpperCase(),
            empAddress: details.address.toUpperCase(),
          });
        }
        return value;
      });
      department = empValue;
      setOpen("table");
      setMessage("");
      setDetails(intialDetails);
    }
  };
  const employeeEdit = (v) => {
    setDetails(details);
    resetTimer();
    setEsubmit(false);
    setOpen("employee");
    setEid(v.empId);
  };
  const employeeUpdate = () => {

    [...department]
      .filter((dep) => dep.id === did)
      .map((item) =>
        item.employees.map((p) => {
          if (p.empId === eid) {
            return [
              (p.empId = eid),
              (p.empName = details.name.toUpperCase()),
              (p.empAddress = details.mobile.toUpperCase()),
              (p.empMobNo = details.address.toUpperCase()),
            ];
          } else {
            return (p.empId, p.empName, p.empAddress, p.empMobNo);
          }
        })
      );

    setEsubmit(true);
    setOpen("table");
  };

  const employeeDelete = (eeid) => {
    let ind;
    [...department].forEach((dep) => {
      if (dep.id === did) {
        ind = department.indexOf(dep);
      }
    });
    const newValue = [...department]
      .filter((d, index) => d.id === did)
      .map((item) => item.employees.filter((p) => p.empId !== eeid));
    console.log("index", ind);
    department[ind].employees = newValue[0];
    setDepartment(department);
    setOpen("");
  };

  return (
    <>
      {/* Employee Details */}
  
      {open === "employee" && (
        <form className="emp-form">
           <button id="eclose" onClick={()=>setOpen("")}>X</button>
          <div className="timer1">
            <label className="timer">{counter}</label>
          </div>
           
          <label className="elbl">Name</label>
          <input autoFocus
            type="text"
            name="name" 
            className="etxt"
            placeholder="ex:John"
            onChange={(event) => submitEinfo(event)}
            value={details?.name}
          /> 
          <br />
          <label className="elbl">Mobile</label>
          <input
            type="text"
            name="mobile"
            className="etxt"
            placeholder="ex:1234567890"
            onChange={(event) => submitEinfo(event)}
            value={details?.mobile}
          />
          <br />
          <label className="elbl">Address</label>
          <input
            type="text"
            className="etxt"
            name="address"
            placeholder="ex:California"
            onChange={(event) => submitEinfo(event)}
            value={details?.address}
          />
          <br />
          <button
            className="ebtn"
            type="submit"
            onClick={esubmit ? employeeData : employeeUpdate}
          >
            {esubmit ? "Submit" : "Update"}
          </button>
          {message === "employee" && <h5>Please Enter the value!</h5>}
        </form>
      )}

      {open === "table" && (
        <div className="emp-data">
          <table className="etable">
            <thead>
              <tr>
                <th>EmpId</th>
                <th>EmpName</th>
                <th>MobNo</th>
                <th>Address</th>
                <th>
                  <button onClick={() =>{setOpen("employee"); resetTimer();} }>Add</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {department
                .filter((d) => d.id === did)
                .map((item) =>
                  item.employees.map((p) => (
                    <tr key={p.empId}>
                      <td>{p.empId}</td>
                      <td>{p.empName}</td>
                      <td>{p.empMobNo}</td>
                      <td>{p.empAddress}</td>
                      <td>
                        <button onClick={() => employeeEdit(p)}>Edit</button>
                        <button onClick={() => {
                          if (window.confirm("Do you want to delete ?")) {
                            employeeDelete(p.empId)
                          }}}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Employees;
