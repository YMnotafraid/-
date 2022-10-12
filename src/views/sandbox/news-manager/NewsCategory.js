import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal} from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function NewsCategory() {
  const [dataSource, setdataSource] = useState([]);
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
    axios.delete(`/categories/${data.id}`);
  };
  useEffect(() => {
    axios.get("/categories").then((res) => {
      setdataSource(res.data);
    });
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "栏目名称",
      dataIndex: "title",
    },
    {
      title: "设置",
      render: (item) => (
        <div>
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => myconfirm(item)}
          ></Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={item=>item.id}
      />
    </div>
  );
}
