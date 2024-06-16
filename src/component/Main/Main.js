import React, {  useState } from "react";
import { Button, message, Steps, theme } from "antd";
import {
  LoginOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Sign from "../Sign";
import Profile from "../Profile";
import Finish from "../Finish";

function Main() {
  const { token } = theme.useToken();
  const [currentData, setCurrentData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState(null);

 

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    age: "",
  });


  const [selectedValues, setSelectedValues] = useState([null, null, null]);
  const  [date, setDate] = useState("");

  
  
  const onFinish = (values) => {
    console.log("Success:", values);
    setCurrent((prev) => prev + 1);
    setVisible(true);
    setCurrentData(formData);
  };

  const steps = [
    {
      title: "login",
      content: (
        <Sign
          onFinish={onFinish}
          setCurrent={setCurrent}
          current={current}
          setUserId={setUserId}
          formData={formData}
          setFormData={setFormData}
          setCurrentData={setCurrentData}
          setVisible={setVisible}
        />
      ),
      icon: <LoginOutlined />,
    },
    {
      title: "Details",
      content: (
        <Profile
          selectedValues={selectedValues}
          userId={userId}
          setSelectedValues={setSelectedValues}
          date={date}
          setDate={setDate}
        />
      ),
      icon: <ProfileOutlined />,
    },
    {
      title: "finish",
      content: <Finish setVisible={setVisible} current={current} />,
      icon: <CheckCircleOutlined />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  const clickHandler = () => {
    message.success("Processing complete!");
    setVisible(false);
    setCurrent(0);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      age: "",
      
    });
    setSelectedValues([null, null, null]);
    let storedData = JSON.parse(localStorage.getItem("formData")) || [];

    const userId = Date.now();

    setUserId(userId);

    const finalFormData = { 
      ...formData,
      selectedValues,
      useId: userId,
      date,
    };

    if (!Array.isArray(storedData)) {
      console.error("Data retrieved from local storage is not an array.");
      storedData = [];
    }

    const updatedData = [...storedData, finalFormData];

    localStorage.setItem("formData", JSON.stringify(updatedData));
    setDate("");
  };
  const contentStyle = {
    lineHeight: "260px",
    width: "50%",
    margin: "auto",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <div>
      <Steps
        style={{ padding: "20px", width: "60%", margin: "auto" }}
        current={current}
        items={items}
      />

      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        <div style={{ marginLeft: "45%" }}>
          {visible === true && current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}

          {current === steps.length - 1 && (
            <Button type="primary" onClick={clickHandler}>
              Done
            </Button>
          )}
          {visible === true && current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
