import { Button } from "antd";
import React from "react";
import Newspublish from "../../../components/sandbox/pubish-manage/Newspublish";
import usePublish from "../../../components/sandbox/pubish-manage/usePublish";
export default function Published() {
  const { dataSource,handleSunset} = usePublish(3);
  return (
    <div>
      <Newspublish
        dataSource={dataSource}
        button={(id) => <Button danger onClick={()=>handleSunset(id)}>删除</Button>}

      ></Newspublish>
    </div>
  );
}
