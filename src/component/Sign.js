import React, { useState } from "react";
import { Button, Radio, Form, Input } from "antd";

const App = ({
  current,
  setUserId,
  setCurrent,
  formData,
  setFormData,
  setVisible,
  setCurrentData,
  onFinish
}) => {
  setVisible(false);

  const [value, setValue] = useState("male");

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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{
        marginTop: "50px",
        width: "50%",
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
            required: true,
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
            required: true,
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
            required: true,
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
            required: true,
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
        <Button
          style={{ backgroundColor: "lightblue", marginTop: "15px" }}
          type="submit"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
