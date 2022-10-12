import { Button } from "antd";
import React from "react";
import Newspublish from "../../../components/sandbox/pubish-manage/Newspublish";
import usePublish from "../../../components/sandbox/pubish-manage/usePublish";
export default function Unpublished() {
  const {dataSource,handleUnpublished} = usePublish(1);

  return (
    <div>
      <Newspublish
        dataSource={dataSource}
        button={(id) => <Button type="primary" onClick={()=>handleUnpublished(id)}>发布</Button>}
      ></Newspublish>
    </div>
  );
}
