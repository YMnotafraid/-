import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Switch } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import UserForm from "../../../components/sandbox/user-manager/UserForm";

export default function RightList() {
  const [dataSource, setdataSource] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [regionList, setregionList] = useState([]);
  const [roleList, setroleList] = useState([]);
  const [isupdateModalOpen, setisupdateModalOpen] = useState(false);
  const [updateregion, setupdateregion] = useState(false);
  const [current, setcurrent] = useState(null);
  const addForm = useRef(null);
  const updateForm = useRef(null);
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
  const deletemethod = (value) => {
    //页面同步
    setdataSource(dataSource.filter((item) => item.id !== value.id));
    //后端同步
    axios.delete(`/users/${value.id}`);
  };
  const { username, region, roleId } = JSON.parse(
    localStorage.getItem("token")
  );
  useEffect(() => {
    axios.get("/users?_expand=role").then((res) => {
      setdataSource(
        roleId === 1
          ? res.data
          : [
              ...res.data.filter((item) => item.username === username),
              ...res.data.filter(
                (item) => item.region === region && item.roleId === 3
              ),
            ]
      );
    });
  }, [username, region, roleId]);
  useEffect(() => {
    axios.get("/regions").then((res) => {
      setregionList(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/roles").then((res) => {
      setroleList(res.data);
    });
  }, []);
  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      render: (region) => {
        return region === "" ? "全球" : region;
      },
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return role.roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      render: (item) => (
        <Switch
          checked={item.roleState}
          disabled={item.default}
          onChange={() => handleChange(item)}
        ></Switch>
      ),
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
            disabled={item.default}
          ></Button>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            disabled={item.default}
            onClick={() => {
              setcurrent(item.id);
              if (item.roleId === 1) {
                //禁用
                setupdateregion(true);
              } else {
                //不禁用
                setupdateregion(false);
              }
              setTimeout(() => {
                setisupdateModalOpen(true);
                updateForm.current.setFieldsValue({
                  ...item,
                });
              });
            }}
          ></Button>
        </div>
      ),
    },
  ];
  const handleChange = (item) => {
    item.roleState = !item.roleState;
    setdataSource([...dataSource]);
    axios.patch(`/users/${item.id}`, {
      roleState: item.roleState,
    });
  };
  const handleOk = () => {
    addForm.current
      .validateFields()
      .then((value) => {
        setisModalOpen(false);
        addForm.current.resetFields();
        axios
          .post("/users", {
            ...value,
            roleState: true,
            default: false,
          })
          .then((res) => {
            setdataSource([
              ...dataSource,
              {
                ...res.data,
                role: roleList.filter((item) => item.id === value.roleId)[0],
              },
            ]);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setisModalOpen(false);
  };

  const updatehandleOk = () => {
    updateForm.current
      .validateFields()
      .then((value) => {
        setisupdateModalOpen(false);
        setdataSource(
          dataSource.map((item) => {
            if (item.id === current) {
              return {
                ...item,
                ...value,
                role: roleList.filter((item) => item.id === value.roleId)[0],
              };
            }
            return item;
          })
        );
        axios.patch(`/users/${current}`, value);
      })
      .catch((err) => console.log(err));
  };
  const updatehandleCancel = () => {
    setisupdateModalOpen(false);
    setupdateregion(!updateregion);
  };
  return (
    <div>
      <Button type="primary" onClick={() => setisModalOpen(true)}>
        用户添加
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={(item) => item.id}
      />
      <Modal
        title="添加用户"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          ref={addForm}
        ></UserForm>
      </Modal>
      <Modal
        title="修改用户"
        open={isupdateModalOpen}
        onOk={updatehandleOk}
        onCancel={updatehandleCancel}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          ref={updateForm}
          updateregion={updateregion}
          isupdate={true}
        ></UserForm>
      </Modal>
    </div>
  );
}
