import React, { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import axios from "axios";
export default function AuditList(props) {
  const [dataSource, setdataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get(
        `/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`
      )
      .then((res) => {
        setdataSource(res.data);
        console.log(res.data);
      });
  }, [username]);
  const columns = [
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>;
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "新闻分类",
      dataIndex: "category",
      render: (category) => {
        return category.title;
      },
    },
    {
      title: "审核状态",
      dataIndex: "auditState",
      render: (auditState) => {
        const color = ["", "orange", "green", "red"];
        const auditList = ["未审核", "审核中", "已通过", "未通过"];
        return <Tag color={color[auditState]}>{auditList[auditState]}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        if (item.auditState === 2) {
          return <Button danger onClick={()=>handlepublish(item)}>发布 </Button>;
        }
        if (item.auditState === 1) {
          return <Button type="default" onClick={()=>handleback(item)}>撤销</Button>;
        }
        if (item.auditState === 3) {
          return <Button type="primary" onClick={()=>handlechange(item)}>修改</Button>;
        }
      },
    },
  ];
  const handleback = (item)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`/news/${item.id}`,{
        auditState:0
    })
  }
  const handlechange = (item)=>{
    props.history.push(`/news-manage/update/${item.id}`)
  }
  const handlepublish = (item)=>{
    axios.patch(`/news/${item.id}`, {
        publishState:2,
        publishTime:Date.now()
      }).then(res=>{
          props.history.push('/publish-manage/published')
      })
  }
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 5 }}
      ></Table>
    </div>
  );
}
