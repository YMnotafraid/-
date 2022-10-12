import { Table, Button, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";

export default function RoleList(props) {
  const [dataSource, setdataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get(`/news?author=${username}&auditState=0&_expand=category`)
      .then((res) => {
        setdataSource(res.data);
      });
  }, [username]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
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
      render: (item) => (
        <div>
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => myconfirm(item)}
          ></Button>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              props.history.push(`/news-manage/update/${item.id}`);
            }}
          ></Button>
          <Button
            type="primary"
            shape="circle"
            icon={<UploadOutlined />}
            onClick={() => handleCheck(item)}
          ></Button>
        </div>
      ),
    },
  ];
  const handleCheck = (item) => {
    axios
      .patch(`/news/${item.id}`, {
        auditState: 1,
      })
      .then((res) => {
        props.history.push("/audit-manage/list");
      });
  };
  const myconfirm = (item) => {
    Modal.confirm({
      title: "你确定要删除",
      icon: <ExclamationCircleOutlined />,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deletemethod(item);
      },
      onCancel: () => {},
    });
  };
  const deletemethod = (data) => {
    setdataSource(dataSource.filter((item) => item.id !== data.id));
    axios.delete(`/news/${data.id}`);
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
    </div>
  );
}
