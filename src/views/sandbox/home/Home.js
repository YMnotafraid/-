import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Row, List, Avatar, Drawer } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import * as echarts from "echarts";
import _ from "lodash";
const { Meta } = Card;

export default function Home() {
  const [bigviewList, setbigviewList] = useState([]);
  const [bigstarList, setbigstarList] = useState([]);
  const {
    username,
    role: { roleName },
  } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6"
      )
      .then((res) => {
        setbigviewList(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6"
      )
      .then((res) => {
        setbigstarList(res.data);
      });
  }, []);
  const barref = useRef();
  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category").then((res) => {
      renderBarView(_.groupBy(res.data, (item) => item.category.title));
    });
    return () => {
      window.onresize = null;
    };
  }, []);

  const renderBarView = (obj) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(barref.current);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "新闻分类图示",
      },
      tooltip: {},
      legend: {
        data: ["数量"],
      },
      xAxis: {
        data: Object.keys(obj),
      },
      yAxis: { minInterval: 1 },
      series: [
        {
          name: "数量",
          type: "bar",
          data: Object.values(obj).map((item) => item.length),
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    window.onresize = () => {
      myChart.resize();
    };
  };

  const [open, setOpen] = useState(false);

  const pieref = useRef();
  const renderPieView = (obj) => {
    var myChart = echarts.init(pieref.current);
    var option;

    option = {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    myChart.clear();
    option && myChart.setOption(option);
  };
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              dataSource={bigviewList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              dataSource={bigstarList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined
                key="setting"
                onClick={() => {
                  let newPromise = new Promise((resolve) => {
                    resolve();
                  });
                  newPromise.then(() => {
                    //	此dom为echarts图标展示dom
                    setOpen(true);
                    renderPieView();
                  });
                }}
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={roleName}
            />
          </Card>
        </Col>
      </Row>

      <div
        ref={barref}
        style={{ width: "100%", height: "400px", margin: "30px" }}
      ></div>

      
      <Drawer
        width="500px"
        title="个人新闻"
        placement="right"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <div
        ref={pieref}
        style={{ width: "100%", height: "400px", margin: "30px" }}
      ></div>
      </Drawer>
    </div>
  );
}
