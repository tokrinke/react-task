import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { addData } from "../redux/dataSlice";

const { Column } = Table;

interface DataType {
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    address: string;
    city: string;
    country: string;
    state: string;
}
type FieldType = {
    username?: string;
    firstName?: string;
    lastName?: string;
    age: number;
    gender?: string;
    address?: string;
    city?: string;
    country?: string;
    state?: string;
};

const MyTable = ()=>{
    // const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const data = useSelector ((state: any) => state.database.data)
    const [inputDetails, setInputDetails] = useState<any>();
    const [selectedUser, setSelectedUser] = useState<any>();
    const [isModalShown, setIsModalShown] = useState(false);

    const showModal = (user: any) => {
        setSelectedUser(user);
        setIsModalShown(true);
      };
    
      const handleOkay = () => {
        setIsModalShown(false);
      };
    
      const handleCancel = () => {
        setIsModalShown(false);
      };

      const handleOnFinish = (values: DataType) =>{
        dispatch(addData(values))
        console.log(values)
      }

      useEffect(()=>{
        const getData = async ()=>{
          const response = await fetch('https://dummyjson.com/users');
          const dummyData: any = await response.json();
          let fetchedData = dummyData.users
          fetchedData.map((user: DataType)=>{
            dispatch(addData(user));
          })
        }
        getData();
      },[dispatch])

    return (
    <>
            <Table<DataType> dataSource={data} rowKey="id">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Details" key="details" 
            render={( record: DataType) => (
                <Button onClick={() => {showModal(record);}}> Show Details</Button>
                )} />
        </Table>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleOnFinish}
        autoComplete="off">

        <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please input your name!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please input your surname!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="Age"
        name="age"
        rules={[{ required: true, message: 'Please input your age!' }]}
        >
        <Input type="number" />
        </Form.Item>

        <Form.Item<FieldType>
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please input your gender!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="City"
        name="city"
        rules={[{ required: true, message: 'Please input your city!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="Country"
        name="country"
        rules={[{ required: true, message: 'Please input your country!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="State"
        name="state"
        rules={[{ required: true, message: 'Please input your state!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
  </Form>
        <Modal title="Details" open={isModalShown} onOk={handleOkay} onCancel={handleCancel}>
            <p>{selectedUser?.gender}</p>
            <p>{selectedUser?.address.city}</p>
            <p>{selectedUser?.city}</p>
            <p>{selectedUser?.address.country}</p>
            <p>{selectedUser?.country}</p>
            <p>{selectedUser?.address.state}</p>
            <p>{selectedUser?.state}</p>
        </Modal>
    </>
    )
}
export default MyTable;