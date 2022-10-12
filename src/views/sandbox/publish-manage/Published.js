import React from "react";
import { Button } from "antd";
import Newspublish from "../../../components/sandbox/pubish-manage/Newspublish";
import usePublish from "../../../components/sandbox/pubish-manage/usePublish";
export default function Published() {
  const { dataSource,handlePublished } = usePublish(2);
  return (
    <div>
      <Newspublish
        dataSource={dataSource}
        button={(id) => <Button danger onClick={()=>handlePublished(id)}>下线</Button>}

      ></Newspublish>
    </div>
  );
}
