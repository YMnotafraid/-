import { Table, Button, Modal,Tree} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function RoleList() {
  const [dataSource, setdataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [treeData, settreeData] = useState([]);
  const [checkrights, setcheckrights] = useState([])
  const [checkid, setcheckid] = useState(0)
  useEffect(() => {
    axios.get("/roles").then((res) => {
      setdataSource(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/rights?_embed=children").then((res) => {
        settreeData(res.data)
      });
  }, [])

  const handleOk = () => {
    setIsModalOpen(false);
    //页面同步
    setdataSource(dataSource.map(item=>{
        if(item.id===checkid){
            return {
                ...item,
                rights:checkrights
            }
        }
        return item;
    }))
    //后端同步
    axios.patch(`/roles/${checkid}`,{
        rights:checkrights
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
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
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setIsModalOpen(true);
              setcheckrights(item.rights)
              setcheckid(item.id)
            }}
          ></Button>
        </div>
      ),
    },
  ];
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
    axios.delete(`/roles/${data.id}`);
  };
  const onCheck = (checkedKeys) => {
    setcheckrights(checkedKeys.checked);
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>
      <Modal
        title="权限选择"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          treeData={treeData}
          checkedKeys={checkrights}
          onCheck={onCheck}
          checkStrictly={true}
        />
      </Modal>
    </div>
  );
}
