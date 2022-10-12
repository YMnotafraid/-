import React from "react";
import { Button, Form, Input, message } from "antd";
import {withRouter} from 'react-router-dom'
import "./login.css";
import axios from "axios";
function Login(props) {
  const onFinish = (values) => {
    axios
      .get(
        `/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
      )
      .then((res) =>{
        console.log(res.data);
        if(res.data.length===0){
            message.error('用户名或者密码出错');
        }else{
            localStorage.setItem("token",JSON.stringify(res.data[0]))
            props.history.push('/')
        }
      });
  };
  return (
    <div style={{ background: "rgb(35,39,65)", height: "100%" }}>
      <div className="formContainer">
        <div
          style={{
            color: "white",
            fontSize: "30px",
            textAlign: "center",
            margin: "10px",
          }}
        >
          全球新闻发布系统
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default withRouter(Login)
