import React, { useEffect, useState } from "react";
import { Descriptions, PageHeader } from "antd";
import axios from "axios";
import moment from "moment";
import {HeartTwoTone} from '@ant-design/icons';
export default function NewsPreview(props) {
  const [newsdetail, setnewsdetail] = useState(null);
  useEffect(() => {
    axios
      .get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
      .then((res) => {
        setnewsdetail({
          ...res.data,
          view: res.data.view + 1,
        });
        return res.data;
      })
      .then((res) =>
        axios.patch(`/news/${props.match.params.id}`, {
          view: res.view + 1,
        })
      );
  }, [props.match.params.id]);
  return (
    <div>
      {newsdetail && (
        <div>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={newsdetail.title}
            subTitle={<div>{newsdetail.category.title}<HeartTwoTone twoToneColor="#eb2f96" onClick={()=>{
                setnewsdetail({
                    ...newsdetail,
                    star: newsdetail.star + 1,
                  });
                  axios.patch(`/news/${props.match.params.id}`, {
                    star: newsdetail.star + 1,
                  })
            }}/></div>}
             >
            <Descriptions size="small" column={3}>
              {console.log(newsdetail.title)}
              <Descriptions.Item label="创建者">
                {newsdetail.author}
              </Descriptions.Item>

              <Descriptions.Item label="发布时间">
                {newsdetail.publishTime
                  ? moment(newsdetail.publishTime).format("YYYY/MM/DD HH:mm:ss")
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item label="区域">
                {newsdetail.region}
              </Descriptions.Item>

              <Descriptions.Item label="访问数量">
                {newsdetail.view}
              </Descriptions.Item>
              <Descriptions.Item label="点赞数量">
                {newsdetail.star}
              </Descriptions.Item>
              <Descriptions.Item label="评论数量">0</Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <div dangerouslySetInnerHTML={{ __html: newsdetail.content }}></div>
        </div>
      )}
    </div>
  );
}
