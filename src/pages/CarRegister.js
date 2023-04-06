import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Table } from "antd";
import { ethers } from "ethers";
import { address, carRegisterABI } from "../constants";

const CarForm = () => {
  const [storeCarDetailsForm] = Form.useForm();
  const [contract, setContract] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [carDetails, setCarDetails] = useState("");
  const { ethereum } = window;

  const connectWallet = async () => {
    try {
      const [selectedAddress] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setSelectedAddress(selectedAddress);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner(0);

      const contract = new ethers.Contract(address, carRegisterABI, signer);
      setContract(contract);
    } catch (err) {
      console.log(err, "error");
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  const storeCarDetails = async ({ carNumber, carName, color, year }) => {
    try {
      const storeDetail = await contract.storeCarDetails(
        carNumber,
        carName,
        color,
        year
      );
      await storeDetail.wait();
    } catch (err) {
      console.log(err);
    }
    storeCarDetailsForm.resetFields();
  };

  const getCarDetailsFN = async ({ carNumber }) => {
    try {
      const carDetails = await contract.getCarDetails(carNumber);
      const carDetailData = [
        {
          nameOfCar: carDetails[1],
          color: carDetails[2],
          year: carDetails[3].toString(),
        },
      ];
      setCarDetails(carDetailData);
    } catch (err) {
      console.log(err);
    }
  };

  const transferOwnership = async ({ carNumber, newOwner }) => {
    try {
      const transferOwner = await contract.transferOwnership(
        carNumber,
        newOwner
      );
      await transferOwner.wait();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form
        onFinish={storeCarDetails}
        form={storeCarDetailsForm}
        layout="vertical"
      >
        <h1>Store Car Details</h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Car Number"
              name="carNumber"
              rules={[
                { required: true, message: "Please enter car number" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Please enter only numbers for car number",
                },
              ]}
            >
              <Input placeholder="Enter car number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Car Name"
              name="carName"
              rules={[{ required: true, message: "Please enter car name" }]}
            >
              <Input placeholder="Enter car name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Color"
              name="color"
              rules={[{ required: true, message: "Please enter car color" }]}
            >
              <Input placeholder="Enter car color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Year"
              name="year"
              rules={[
                { required: true, message: "Please enter car year" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Please enter only numbers for car year",
                },
              ]}
            >
              <Input placeholder="Enter car year" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* Get Details ======== */}
      <Form onFinish={getCarDetailsFN} layout="vertical">
        <h1>Get Car Details</h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Car Number"
              name="carNumber"
              rules={[
                { required: true, message: "Please enter car number" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Please enter only numbers for car number",
                },
              ]}
            >
              <Input placeholder="Enter car number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={[
          {
            title: "Car Name",
            dataIndex: "nameOfCar",
            key: "nameOfCar",
          },
          {
            title: "Car Color",
            dataIndex: "color",
            key: "color",
          },
          {
            title: "Car Year",
            dataIndex: "year",
            key: "year",
          },
        ]}
        dataSource={carDetails}
      />

      {/* Transfer ownership   ======== */}
      <Form onFinish={transferOwnership} layout="vertical">
        <h1>Transfer Ownership</h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Car Number"
              name="carNumber"
              rules={[
                { required: true, message: "Please enter car number" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Please enter only numbers for car number",
                },
              ]}
            >
              <Input placeholder="Enter car number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="New Owner"
              name="newOwner"
              rules={[
                { required: true, message: "Please enter new owner address" },
              ]}
            >
              <Input placeholder="Enter new owner address" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CarForm;
