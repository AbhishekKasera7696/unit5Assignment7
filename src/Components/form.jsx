import React from "react";

const Form = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    address: "",
    // slaray : "",
    maritalState: false,
    department: "",
  });

  const [allData, setAllData] = React.useState([])
  React.useEffect(() =>{
    getFormData();
  } , [])

  const handleChange = (e) => {
    //   console.log("e.target.id",e.target.id);
    //   console.log("e.target.value",e.target.value);
 
    const { id, value, checked, type} = e.target;

    // console.log("id, value, checked, type" , id, value, checked, type)

    setFormData({
        ...formData,
        [id] : type === "checkbox" ? checked : value
    })
  };

  const {name,age,address,salary,maritalState,department} = formData;


  const getFormData = () => {
    fetch (`http://localhost:3004/data`)
    .then((res) => res.json())
    .then((res) => {
        // console.log(res)
        setAllData(res);
      
    })
    .catch((res) => console.log(res))
  }




  const handleSubmit = (e) => {
     e.preventDefault();
    //  console.log(formData);
     const payloadjson= JSON.stringify(formData)

     fetch(`http://localhost:3004/data`, {
        method: "POST",
        body: payloadjson,
        headers: {
            "content-type" : "application/json"
        }
    }).then((res) => {
        // console.log(res)
        // console.log(res.data)
        // getData();
    })
    .catch((err) => console.log(err))
     
  }

  console.log(allData);

  return (
    <>
    <form onSubmit={handleSubmit}>
    
      {/* <div className="form"> */}
        <h1>Forms</h1>
        <input
          id="name"
          type="text"
          onChange={handleChange}
          placeholder="Enter name"
          value={name}
        />

        <br />

        <input 
        id="age"
        type="number" 
        onChange={handleChange} 
        placeholder="Enter Age"
        value={age}
        
        />

        <br />

        <input
          id="address"
          type="text"
          onChange={handleChange}
          placeholder="Enter Address"
          value={address}
        />


        <br />

        <input
          id="salary"
          type="number"
          onChange={handleChange}
          placeholder="Salary"
          value={salary}
        />

        <br />

        <label>
          Marital State:
         <input 
          id="maritalState" 
          type="checkbox" 
          onChange={handleChange} 
           checked={maritalState}
          /> 
           {/* <select onChange={handleChange} id="maritalState" value={maritalState}>
            <option value="">Select Marital State</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
            <option value="Divorce">Divorce</option>
            <option value="Widow">Widow</option>
          </select> */}

        </label>

        <br />
        <label>
          Department:
          <select onChange={handleChange} id="department" value={department}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
          </select>
        </label>
        <br />
       <br />
        <input type="submit" value="SUBMIT"/>
      {/* </div> */}
    </form>
      {
          allData.map((item)=>{
              return (
                  <div>
                      <h2>
                          Name:{item.name}
                          <br />
                          Age:{item.age}
                          <br />
                          Address:{item.address}
                          <br />
                          Salary:{item.salary}
                          <br />
                          Marital State:{item.maritalState}
                    
                          <br />
                          Department:{item.department}
                         
                      </h2>
                  </div>
              )
          })
      }
    </>
  );
};

export default Form;
