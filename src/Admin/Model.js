import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Radio, Form, Input } from "antd";
import { Card, DatePicker, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
const Model = ({useId, userData, setUserData}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [formData, setFormData] = useState( ()=>{
    
    if(useId){
      const userData = localStorage.getItem("formData");
      const data = userData ? JSON.parse(userData) : [];
      const findUserData = data.find((item) => item.useId === useId);
      return findUserData; 
    }
  
  });
  const [selectedValues,setSelectedValues]= useState( ()=>{
    if(useId){
      const userData = localStorage.getItem("formData");
      const data = userData ? JSON.parse(userData) : [];
      const findUserData = data.find((item) => item.useId === useId);
      return [findUserData.selectedValues[0], findUserData.selectedValues[1], findUserData.selectedValues[2],]; 
    }
    return ["", "", ""];
    
  })
  
  
  
  const [date, setDate] = useState(()=>{
    if(useId){
      const userData = localStorage.getItem("formData");
      const data = userData ? JSON.parse(userData) : [];
      const findUserData = data.find((item) => item.useId === useId);
      return [findUserData.date[0], findUserData.date[1], findUserData.date[2],]; 
    }
    return ["", "", ""];
  
  })
  const [value, setValue] = useState("male");
  





  function onFinish(value){

  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleOk = () => {
    setIsModalOpen(false);
    // save all the data in local storage this userid
    let storedData = JSON.parse(localStorage.getItem("formData")) || [];
    const finalFormData = { 
      ...formData,
      selectedValues,
      useId: useId,
      date,
    };
    const index = storedData.findIndex((item) => item.useId === useId);
    storedData[index] = finalFormData;
    localStorage.setItem("formData", JSON.stringify(storedData));
    setUserData(storedData);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


 //date and vaccine
   const handleMenuClick = (index, { key }) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = key;
    setSelectedValues(newSelectedValues);
  };

  const handleDateChange = (date, dateString, index) => {
    // Update the state with the selected date
    setDate((prevDate)=>{
      const newDate = [...prevDate]
      newDate[index] = dateString
      return newDate
    })
  }; 

  return (
    <>
      <Button style={{width:"50px",height:"22px",fontSize:"13px",padding:"0",borderRadius:"2px"}} onClick={showModal}>
        edit
      </Button>
      <Modal title="Edit user Data " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         

      <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{
        
        width: "80%",
        height:"300px",
        margin: "auto",

        padding: "20px",
      }}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={formData}
      autoComplete="off"
    >
      <Form.Item
        label="First Name :"
        name="firstname"
        rules={[
          {
            
            message: "Please input your first name!",
          },
        ]}
      >
        <Input
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Last Name :"
        name="lastname"
        rules={[
          {

            message: "Please input your last name!",
          },
        ]}
      >
        <Input
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Email :"
        name="email"
        rules={[
          {
            
            message: "Please input your email address!",
          },
        ]}
      >
        <Input name="email" value={formData.email} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Enter Age:"
        name="age"
        rules={[
          {

            message: "Please input your age!",
          },
        ]}
      >
        <Input
          style={{ width: "50%", marginRight: "95px" }}
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label="Gender :" name="gender">
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={"male"}>Male</Radio>
          <Radio value={"female"}>Female</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      >
       
      </Form.Item>
    </Form>

     <Card >
      
      
      {[...Array(3)].map((_, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <Dropdown overlay={(
          <Menu onClick={(e) => handleMenuClick(index, e)}>
            <Menu.Item key="">select vaccine</Menu.Item>
            <Menu.Item key="Covaxin">Covaxin</Menu.Item>
            <Menu.Item key="ZyCoV-D">ZyCoV-D</Menu.Item>
            <Menu.Item key="AstraZeneca">AstraZeneca</Menu.Item>
          </Menu>)} placement="bottomCenter">
          
            <label onClick={(e) => e.preventDefault()}>
              <Space>
                {selectedValues[index] || "Select a vaccine"}
                <DownOutlined />
              </Space>
            </label>
          </Dropdown>

          <Space direction="vertical" style={{ marginLeft: "50px" }}>
            <DatePicker  onChange={(date, dateString) => handleDateChange(date, dateString, index)} />
          </Space>
        </div>
      ))}
    </Card>



      </Modal>
    </>
  );
};
export default Model;