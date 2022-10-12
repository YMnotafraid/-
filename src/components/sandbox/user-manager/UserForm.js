import React, { forwardRef, useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const UserForm = forwardRef((props, ref) => {
  const [regionshow, setregionshow] = useState(false);
  useEffect(() => {
    setregionshow(props.updateregion);
  }, [props.updateregion]);
  const { roleId, region } = JSON.parse(localStorage.getItem("token"));
  const checkRegionDisabled = (item) => {
    if (props.isupdate) {
      //修改按钮
      if (roleId === 1) {
        return false;
      } else {
        return true;
      }
    } else {
      //添加按钮
      if (roleId === 1) {
        return false;
      } else {
        return item.value !== region;
      }
    }
  };
  const checkRoleDisabled = (item) => {
    console.log(item);
    if (props.isupdate) {
      //修改按钮
      if (roleId === 1) {
        return false;
      } else {
        return true;
      }
    } else {
      //添加按钮
      if (roleId === 1) {
        return false;
      } else {
        console.log(item.id);
        return item.id !== 3;
      }
    }
  };

  return (
    <Form layout="vertical" ref={ref}>
      <Form.Item
        label="用户名"
        name="username"
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
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="区域"
        name="region"
        rules={
          regionshow
            ? ""
            : [
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]
        }
      >
        <Select disabled={regionshow}>
          {props.regionList.map((item) => {
            return (
              <Option
                value={item.value}
                key={item.id}
                disabled={checkRegionDisabled(item)}
              >
                {item.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="角色"
        name="roleId"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Select
          onChange={(value) => {
            if (value === 1) {
              setregionshow(true);
              ref.current.setFieldsValue({
                region: "",
              });
            } else {
              setregionshow(false);
            }
          }}
        >
          {props.roleList.map((item) => {
            return (
              <Option
                value={item.id}
                key={item.id}
                disabled={checkRoleDisabled(item)}
              >
                {item.roleName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
});
export default UserForm;
