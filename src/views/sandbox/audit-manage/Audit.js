import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "antd";

export default function Audit() {
  const [dataSource, setdataSource] = useState([]);
  const { username, region, roleId } = JSON.parse(
    localStorage.getItem("token")
  );
  useEffect(() => {
    axios.get("/news?auditState=1&_expand=category").then((res) => {
      setdataSource(
        roleId === 1
          ? res.data
          : [
              ...res.data.filter((item) => item.author === username),
              ...res.data.filter(
                (item) => item.region === region && item.roleId === 3
              ),
            ]
      );
    });
  }, [username, region, roleId]);
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
      title: "操作",
      render: (item) => 
        <div>
          <Button type="primary" onClick={()=>handleAudit(item,2,1)}>通过</Button>
          <Button danger onClick={()=>handleAudit(item,3,0)}>驳回</Button>
        </div>
      
    },
  ];
  const handleAudit=(item,auditState,publishState)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`/news/${item.id}`,{
        auditState,
        publishState
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
