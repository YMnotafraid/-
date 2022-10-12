import React, { useEffect,useState } from "react";
import { PageHeader, Card, Col, Row, List} from "antd";
import axios from "axios";
import _ from 'lodash';
export default function News() {
    const [list, setlist] = useState([])
    useEffect(()=>{
        axios.get("/news?publishState=2&_expand=category").then(res=>{
            console.log(Object.entries(_.groupBy(res.data,item=>item.category.title)));
            setlist(Object.entries(_.groupBy(res.data,item=>item.category.title)))
        }
        )
    },[])
  return (
    <div>
      <PageHeader className="site-page-header" title="新闻列表" />
      <div
        className="site-card-wrapper"
        style={{ width: "95%", margin: "0 auto" }}
      >
        <Row gutter={[16, 16]}>
          {list.map(item=>
              <Col span={8} key={item[0]}>
              <Card title={item[0]}bordered={true} hoverable={true}>
                <List
                  dataSource={item[1]}
                  pagination={{pageSize:3}}
                  renderItem={(data) => <List.Item key={data.title}><a href={`#/detail/${data.id}`}>{data.title}</a></List.Item>}
                />
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}
