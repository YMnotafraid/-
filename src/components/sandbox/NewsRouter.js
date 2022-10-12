import React, { useEffect, useState } from "react";
import Home from "../../views/sandbox/home/Home";
import RightList from "../../views/sandbox/right-manager/RightList";
import RoleList from "../../views/sandbox/right-manager/RoleList";
import UserList from "../../views/sandbox/user-manager/UserList";
import Nopermision from "../../views/sandbox/nopermission/Nopermision";
import NewsAdd from "../../views/sandbox/news-manager/NewsAdd";
import NewsDraft from "../../views/sandbox/news-manager/NewsDraft";
import NewsCategory from "../../views/sandbox/news-manager/NewsCategory";
import NewsPreview from "../../views/sandbox/news-manager/NewsPreview";
import NewsUpdate from "../../views/sandbox/news-manager/NewsUpdate";
import Audit from "../../views/sandbox/audit-manage/Audit";
import AuditList from "../../views/sandbox/audit-manage/AuditList";
import Unpublished from "../../views/sandbox/publish-manage/Unpublished";
import Published from "../../views/sandbox/publish-manage/Published";
import Sunset from "../../views/sandbox/publish-manage/Sunset";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import { connect } from "react-redux";
const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/right/list": RightList,
  "/right-manage/role/list": RoleList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/news-manage/preview/:id": NewsPreview,
  "/news-manage/update/:id": NewsUpdate,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset,
};

function NewsRouter(props) {
  const [BackRightsList, setBackRightsList] = useState([]);

  useEffect(() => {
    Promise.all([axios.get("/rights"), axios.get("/children")]).then((res) =>
      setBackRightsList([...res[0].data, ...res[1].data])
    );
  }, []);
  const checkRoute = (item) => {
    return (
      LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    );
  };

  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem("token"));
  const checkUserPermision = (item) => {
    return rights.includes(item.key);
  };
  return (
    <Spin size="large" spinning={props.spinning}>
      <Switch>
        {BackRightsList.map((item) => {
          if (checkRoute(item) && checkUserPermision(item)) {
            return (
              <Route
                key={item.key}
                path={item.key}
                component={LocalRouterMap[item.key]}
                exact
              ></Route>
            );
          }
          return null;
        })}
        <Redirect from="/" to="/home" exact></Redirect>
        {BackRightsList.length > 0 && (
          <Route path="*" component={Nopermision}></Route>
        )}
      </Switch>
    </Spin>
  );
}
const mapStateToProps = ({ SpinningReducer: { spinning } }) => {
  return { spinning };
};
export default connect(mapStateToProps)(NewsRouter);
