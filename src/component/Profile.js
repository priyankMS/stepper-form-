import React from "react";
import { Card, DatePicker, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Profile = ({selectedValues,setSelectedValues,setDate}) => {
  
 


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
    <Card style={{ color: "black", fontSize: "15px" }}>
      <h2 style={{ height: "10px", marginBottom: "50px", marginRight: "20px" }}>Vaccine details</h2>
      
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
            <DatePicker onChange={(date, dateString) => handleDateChange(date, dateString, index)} />
          </Space>
        </div>
      ))}
    </Card>
  );
};

export default Profile;
