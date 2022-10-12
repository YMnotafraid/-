import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const { Header } = Layout;
function Topheader(props) {
  const {
    role: { roleName },
    username,
  } = JSON.parse(localStorage.getItem("token"));
  const menu = (
    <Menu>
      <Menu.Item>{roleName}</Menu.Item>
      <Menu.Item
        danger
        onClick={() => {
          localStorage.removeItem("token");
          props.history.push("/");
        }}
      >
        退出
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Header
        className="site-layout-background"
        style={{
          padding: "0 16px",
        }}
      >
        {props.collapsed ? (
          <MenuUnfoldOutlined
            onClick={() => {
              console.log(props.collapsed);
              props.changeCollapsed();
            }}
          ></MenuUnfoldOutlined>
        ) : (
          <MenuFoldOutlined
            onClick={() => {
              console.log(props.collapsed);
              props.changeCollapsed();
            }}
          ></MenuFoldOutlined>
        )}
        <div style={{ float: "right" }}>
          <span>
            欢迎<span style={{ color: "blue" }}>{username}</span>
          </span>
          <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
    </div>
  );
}
const mapStateToProps = ({ CollapsedReducer: { collapsed } }) => {
  return { collapsed };
};
const mapDispatchToProps = {
  changeCollapsed() {
    return { type: "change_collapsed" };
  },
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Topheader));
