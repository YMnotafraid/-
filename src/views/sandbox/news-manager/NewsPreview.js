import React, { useEffect, useState } from "react";
import { Descriptions, PageHeader } from "antd";
import axios from "axios";
import moment from "moment";
export default function Detail(props) {
  const [newsdetail, setnewsdetail] = useState(null);
  useEffect(() => {
    axios
      .get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
      .then((res) => setnewsdetail(res.data));
  }, [props.match.params.id]);
  const auditList = ["未审核", "审核中", "已通过", "未通过"];
  const publishList = ["未发布", "待发布", "已上线", "已下线"];
  return (
    <div>
      {newsdetail && (
        <div>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={newsdetail.title}
            subTitle={newsdetail.category.title}
          >
            <Descriptions size="small" column={3}>
              {console.log(newsdetail.title)}
              <Descriptions.Item label="创建者">
                {newsdetail.author}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {moment(newsdetail.createTime).format("YYYY/MM/DD HH:mm:ss")}
              </Descriptions.Item>
              <Descriptions.Item label="发布时间">
                {newsdetail.publishTime
                  ? moment(newsdetail.publishTime).format("YYYY/MM/DD HH:mm:ss")
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item label="区域">
                {newsdetail.region}
              </Descriptions.Item>
              <Descriptions.Item label="审核状态">
                {auditList[newsdetail.auditState]}
              </Descriptions.Item>
              <Descriptions.Item label="发布状态">
                {publishList[newsdetail.publishState]}
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
