"use client";

import React from "react";
import { Button, DatePicker, Flex, Form, Input, Radio, Select } from "antd";
import { useDispatch } from "react-redux";
import { addForm, resetForm } from "../app/redux/formSlice";
import { nanoid } from "@reduxjs/toolkit";
const { Option } = Select;
import { useTranslation } from "react-i18next";



const FormComponent = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const handleSubmit = (values: any) => {
    console.log(values.mobileNumber)
    const fullMobile = `${values.mobilePrefix}${values.mobileNumber}`; // Prefix + Mobile Number
    const newEntry = {
      key: nanoid(),
      name: `${values.title} ${values.firstName} ${values.lastName}`,
      gender: values.gender,
      mobile: fullMobile, 
      nationality: values.nationality,
      passport: values.passport,
      salary: values.salary
    };

    dispatch(addForm(newEntry));
    form.resetFields();
  };
  
  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ border: "solid", width: "1000px", padding: "20px",borderRadius:'20px' }}>
      <Form layout="inline" form={form} onFinish={handleSubmit}>
        <Form.Item label={t('Title')} name="title" rules={[{ required: true }]}>
          <Select style={{width:'120px'}} placeholder="Title">
            <Option value="Mr.">Mr.</Option>
            <Option value="Ms.">Ms.</Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('Firstname')} name="firstName" rules={[{ required: true }]}>
          <Input style={{ width: 300, textAlign: "center" }}/>
        </Form.Item>

        <Form.Item label={t('Lastname')} name="lastName" rules={[{ required: true }]}>
          <Input style={{ width: 300, textAlign: "center" }}/>
        </Form.Item>
        <div style={{ width: "100%" , display:'flex', marginTop:'20px'}}>
            <Form.Item label={t('Birthday')} name="birthday" rules={[{ required: true }]} >
            <DatePicker />
            </Form.Item>

            <Form.Item label={t('Nationality')} name="nationality" rules={[{ required: true }]}>
            <Select style={{ width: 250}} placeholder="- - Please Select - -">
                <Option value="Thai">Thai</Option>
                <Option value="Chinese">Chinese</Option>
                <Option value="Japanese">Japanese</Option>
            </Select>
            </Form.Item>
        </div>


        <div style={{ width: "100%" , display:'flex', marginTop:'20px'}}>
        <Form.Item
  label={t("CitizenID")}
  required
>
  <Input.Group compact>
  <div style={{display: "flex", gap: "8px"}}>
    <Form.Item name={["citizenID", "part1"]} noStyle>
      <Input style={{ width: 100, textAlign: "center" }} maxLength={1} />
    </Form.Item>
    <span>-</span>
    <Form.Item name={["citizenID", "part2"]} noStyle>
      <Input style={{ width: 150, textAlign: "center" }} maxLength={4} />
    </Form.Item>
    <span>-</span>
    <Form.Item name={["citizenID", "part3"]} noStyle>
      <Input style={{ width: 150, textAlign: "center" }} maxLength={5} />
    </Form.Item>
    <span>-</span>
    <Form.Item name={["citizenID", "part4"]} noStyle>
      <Input style={{ width: 110, textAlign: "center" }} maxLength={2} />
    </Form.Item>
    <span>-</span>
    <Form.Item name={["citizenID", "part5"]} noStyle>
      <Input style={{ width: 100, textAlign: "center" }} maxLength={1} />
    </Form.Item>
    </div>
  </Input.Group>
</Form.Item>

        </div>

        <div style={{ width: "100%" , display:'flex', marginTop:'20px'}} >
        <Form.Item label={t('Gender')} name="gender" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="Male"> {t('Male')} </Radio>
            <Radio value="Female"> {t('Female')} </Radio>
            <Radio value="Unsex"> {t('Unsex')} </Radio>
          </Radio.Group>
        </Form.Item>

        </div>
    
    <div style={{ width: "100%", display: "flex", marginTop: "20px"}}>
        <Form.Item label={t('Mobile Phone')} required>
            <Input.Group compact>
            <div style={{ gap: "8px", display: "flex", alignItems: "center" }}>
            <Form.Item name="mobilePrefix" noStyle>
                <Select style={{ width: 150}}>
                <Select.Option value="+66">+66</Select.Option>
                </Select>
                <span>-</span>
            </Form.Item>
            <Form.Item name="mobileNumber" noStyle>
              <Input style={{ width: 300}} maxLength={9} name="mobileNumber" />
            </Form.Item>
            </div>
           
            </Input.Group>
        </Form.Item>
    </div>

    <div style={{ width: "100%", display: "flex", marginTop: "20px" }} >
       <Form.Item label={t('Passport No')}name="passport">
          <Input style={{ width: 354 }} name="passport" />
       </Form.Item>
    </div>

    <div style={{ width: "100%", display: "flex", marginTop: "20px" , marginBottom:'20px'}} >
       <Form.Item label={t('Expected Salary')} name="salary" rules={[{ required: true }]}>
          <Input style={{ width: 320,marginRight:200 }} name="salary" />
       </Form.Item>
       <Form.Item>
          <Button type="default" onClick={handleReset} style={{marginRight:100}}>
          {t('RESET')}
          </Button>
          <Button type="default" htmlType="submit">
          {t('SUBMIT')}
          </Button>
        </Form.Item>
    </div>
        
      </Form>
    </div>
  );
};

export default FormComponent;