import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Table,Button,Tag,Modal,Popover,Switch} from 'antd'
import{
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined 
}from '@ant-design/icons'


export default function RightList() {
    const [dataSource, setdataSource] = useState([]);
    const myconfirm = (item)=>{
        Modal.confirm({
            title: '你确定要删除',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                deletemethod(item);
            },
            onCancel:()=>{

            }
            
          });
    }
    const deletemethod = (data)=>{
        if(data.grade===1){
            setdataSource(dataSource.filter(item=>item.id!==data.id));
            axios.delete(`/rights/${data.id}`)
        }else{
            //找爹
            const father = dataSource.filter(item=>item.id===data.rightId)
            //找儿子
            father[0].children=father[0].children.filter(item=>item.id!==data.id);
            //因为是浅拷贝，father[0]就是dataSource的一个子集，当f改变时，d也跟着变了
            setdataSource([...dataSource]);
            axios.delete(`/children/${data.id}`)
        }
    }
      useEffect(() => {
          axios.get("/rights?_embed=children").then(res=>{
            res.data.forEach(item=>{
                if(item.children.length===0){
                    item.children='';
                }
            })
            setdataSource(res.data);
          })
      }, [])
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: '权限名称',
          dataIndex: 'title',
        },
        {
          title: '权限路径',
          dataIndex: 'key',
          render:(key)=>
            <Tag color="blue">{key}</Tag>
          
        },
        {
          title: '设置',
          render:(item)=>
            <div>
                <Button danger shape="circle" icon={<DeleteOutlined />} onClick={()=>myconfirm(item)} ></Button>
                <Popover content={<div style={{textAlign:'center'}}>
                  <Switch checked={item.pagepermisson} onClick={()=>{
                      item.pagepermisson=item.pagepermisson===1?0:1
                      setdataSource([...dataSource])
                      if(item.grade===1){
                        axios.patch(`/rights/${item.id}`,{
                          pagepermisson:item.pagepermisson
                        })
                      }else{
                        axios.patch(`/children/${item.id}`,{
                          pagepermisson:item.pagepermisson
                        })
                      }
                    
                }}></Switch>
                  </div>} title="页面配置项" trigger={item.pagepermisson===undefined?'':'click'}>
                  <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson===undefined}></Button>
                </Popover>
            </div> 
        }
      ];
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}}/>
        </div>
    )
}
