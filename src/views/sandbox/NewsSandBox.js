import React from "react";
import Sidemenu from "../../components/sandbox/sidemenu/Sidemenu";
import Topheader from "../../components/sandbox/Topheader";
import "./NewSandBox.css";
import { Layout } from "antd";
import NewsRouter from "../../components/sandbox/NewsRouter";
const { Content } = Layout;

export default function NewsSandBox() {
  return (
    <Layout>
      <Sidemenu></Sidemenu>
      <Layout className="site-layout">
        <Topheader></Topheader>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          {<NewsRouter></NewsRouter>}
        </Content>
      </Layout>
    </Layout>
  );
}
