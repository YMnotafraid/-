import { Steps, Button, Form, Input, Select, message,notification } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { PageHeader } from "antd";
import style from "./NewsAdd.module.css";
import axios from "axios";
import NewsEditor from "../../../components/sandbox/NewsEditor";
const { Option } = Select;
const { Step } = Steps;
export default function NewsAdd(props) {
  const [current, setCurrent] = useState(0);
  const [categories, setcategories] = useState([]);
  const [formInfo, setformInfo] = useState({});
  const [content, setcontent] = useState("");
  const getForm = useRef(null);
  const next = () => {
    if (current === 0) {
      //console.log(getForm.current);
      getForm.current
        .validateFields()
        .then((res) => {
          setformInfo(res);
          setCurrent(current + 1);
        })
        .catch((err) => console.log(err));
    } else {
        if(content==="" || content.trim()==='<p></p>'){
            message.error("新闻内容不能为空")
        }
        else{
            setCurrent(current + 1);
        }
      
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    axios.get("/categories").then((res) => {
      setcategories(res.data);
    });
  }, []);
  const User = JSON.parse(localStorage.getItem("token"));
  const handlesave = (auditState)=>{
    notification.open({
        message: '通知',
        description:
        auditState===0?'已保存到草稿箱':'已提交审核'
      });
    axios.post("/news", {
        ...formInfo,
        content: content,
        region: User.region === "" ? "全球" : User.region,
        author: User.username,
        roleId: User.roleId,
        auditState: auditState,
        publishState: 0,
        createTime: Date.now(),
        star: 0,
        view: 0,
        //publishTime: 0,
      }).then(res=>{
          props.history.push(auditState===0?'/news-manage/draft':'/audit-manage/audit')
      })
  }
  return (
    <div>
      <PageHeader title="撰写新闻" />

      <Steps current={current}>
        <Step title="基本信息" description="新闻标题,新闻分类" />
        <Step title="新闻内容" description="新闻主体内容" />
        <Step title="新闻提交" description="保存草稿或者提交审核" />
      </Steps>

      <div style={{ margin: "50px" }}>
        <div className={current === 0 ? "" : style.active}>
          <Form
            ref={getForm}
            labelCol={{
              span: 4,
            }}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Select>
                {categories.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current === 1 ? "" : style.active}>
          <NewsEditor
            getContent={(value) => {
              setcontent(value);
            }}
          ></NewsEditor>
        </div>
        <div className={current === 2 ? "" : style.active}>33</div>
      </div>

      <div>
        {current < 2 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === 2 && (
          <Button
            type="primary"
            onClick={() => handlesave(0)}
          >
            保存草稿箱
          </Button>
        )}
        {current === 2 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            danger
            onClick={() => handlesave(1)}
          >
            提交审核
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            上一步
          </Button>
        )}
      </div>
    </div>
  );
}
