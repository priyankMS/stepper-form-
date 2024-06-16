import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Admin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    firstname: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value // Removed the brackets around value for correct assignment
    });
  };

  const handleSubmit = (e) => {
    if(adminData.email === "admin@gmail.com" && adminData.password === "1234"){
           alert("Login Success");
            navigate('/dash');
    }
    e.preventDefault();
    console.log(adminData); // Logging the data to see what's submitted
    // Reset form fields
    setAdminData({
      email: "",
      password: ""
    });
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column", 
    alignItems: "center", 
    gap: "10px", 
    margin: "20px",
  };

  const inputStyle = {
    width: "300px", 
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px", 
  };

  const buttonStyle = {
    width: "calc(300px + 20px)",
    padding: "10px",
    background: "#007bff", 
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h4>Admin user</h4>
      <input
        type='email'
        name='email'
        value={adminData.email}
        onChange={handleChange}
        placeholder='Email '
        style={inputStyle}
      />
      <input
        type='password'
        name='password'
        value={adminData.password}
        onChange={handleChange}
        placeholder='password'
        style={inputStyle}
      />
      <button type='submit' style={buttonStyle}>Get Data</button>
    </form>
  );
}

export default Admin;
