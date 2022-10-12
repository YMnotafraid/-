import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router-dom";
import "./index.css";
import axios from "axios";
import {connect} from 'react-redux'
const { SubMenu } = Menu;
const { Sider } = Layout;
function Sidemenu(props) {
  useEffect(() => {
    axios.get("/rights?_embed=children").then((res) => {
      setmenulist(res.data);
    });
  }, []);
  const [menulist, setmenulist] = useState([]);
  const checkpagepermission = (item) => {
    return item.pagepermisson && rights.includes(item.key);
  };
  const rendermenu = (menulist) => {
    return menulist.map((item) => {
      if (item.children?.length > 0 && checkpagepermission(item)) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {rendermenu(item.children)}
          </SubMenu>
        );
      } 
        return (
          checkpagepermission(item) && (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => {
                props.history.push(item.key);
              }}
            >
              {item.title}
            </Menu.Item>
          )
        );
      }
     );
  };
  // console.log("/" + props.location.pathname.split("/")[1]);
  const selectkeys = [props.location.pathname];
  const openkeys = ["/" + props.location.pathname.split("/")[1]];
  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem("token"));
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">全球新闻发布系统</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={selectkeys}
            defaultOpenKeys={openkeys}
          >
            {rendermenu(menulist)}
          </Menu>
        </div>
      </div>
    </Sider>
  );
}
const mapStateToProps = ({ CollapsedReducer: { collapsed } }) => {
  return { collapsed };
};
export default connect(
  mapStateToProps
)(withRouter(Sidemenu));
