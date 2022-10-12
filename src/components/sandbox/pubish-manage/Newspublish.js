import React from "react";
import { Table } from "antd";

export default function Unpublished(props) {
    const columns = [
      {
        title: "新闻标题",
        dataIndex: "title",
        render: (title, item) => {
          return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>;
        },
      },
      {
        title: "作者",
        dataIndex: "author",
      },
      {
        title: "新闻分类",
        dataIndex: "category",
        render: (category) => {
          return category.title;
        },
      },
      {
        title: "操作",
        render: (item) =>  props.button(item.id)
      }
    ];
  return (
    <div>
      <Table
        dataSource={props.dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 5 }}
      ></Table>
    </div>
  );
}
