"use client";

import React, { useEffect } from "react";
import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { addForm } from "../app/redux/formSlice";
import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface FormComponentProps {
  editData: any;
  setEditData: (value: any) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ editData, setEditData }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const storedData = useSelector((state: RootState) =>
    editData ? state.form.find(item => item.key === editData.key) || editData : null
  );

  useEffect(() => {
    if (editData) {
      let mobilePrefix = editData.mobilePrefix || "";
      let mobileNumber = editData.mobileNumber || "";

      if (editData.mobile) {
        const mobileMatch = editData.mobile.match(/^(\+\d{1,3})\s*(\d+)$/);
        if (mobileMatch) {
          mobilePrefix = mobileMatch[1] || "+66"; 
          mobileNumber = mobileMatch[2] || ""; 
        }
      }

      form.setFieldsValue({
        ...editData,
        birthday: editData.birthday ? moment(editData.birthday, "YYYY-MM-DD") : null, 
        mobilePrefix: mobilePrefix, 
        mobileNumber: mobileNumber, 
      });
    } else {
      form.resetFields();
    }
  }, [editData, form]);


  const handleSubmit = (values: any) => {
    const fullMobile = `${values.mobilePrefix} ${values.mobileNumber}`.trim();

    const newEntry = {
      key: editData?.key || nanoid(),
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      name: `${values.title} ${values.firstName} ${values.lastName}`,
      gender: values.gender,
      nationality: values.nationality,
      passport: values.passport,
      salary: values.salary,
      birthday: values.birthday?.format("YYYY-MM-DD") || "",
      mobilePrefix: values.mobilePrefix || "", 
      mobileNumber: values.mobileNumber || "", 
      mobile: fullMobile, 
      citizenID: values.citizenID || [],
    };

    dispatch(addForm(newEntry));
    form.resetFields();
    setEditData(null);
  };


  const handleReset = () => {
    form.resetFields();
    setEditData(null); 
  };


  return (
    <div style={{ border: "solid", width: "1000px", padding: "20px", borderRadius: '20px' }}>
      <Form layout="inline" form={form} onFinish={handleSubmit}>
        <Form.Item label={t('Title')} name="title" rules={[{ required: true }]}>
          <Select style={{ width: '120px' }} placeholder={t('Title')}>
            <Option value="Mr.">{t("Mr.")}</Option>
            <Option value="Mrs.">{t("Mrs.")}</Option>
            <Option value="Ms.">{t("Ms.")}</Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('Firstname')} name="firstName" rules={[{ required: true }]}>
          <Input style={{ width: 280, textAlign: "center" }} />
        </Form.Item>

        <Form.Item label={t('Lastname')} name="lastName" rules={[{ required: true }]}>
          <Input style={{ width: 280, textAlign: "center" }} />
        </Form.Item>
        <div style={{ width: "100%", display: 'flex', marginTop: '20px' }}>
          <Form.Item label={t('Birthday')} name="birthday" rules={[{ required: true }]} >
            <DatePicker />
          </Form.Item>

          <Form.Item label={t('Nationality')} name="nationality" rules={[{ required: true }]}>
            <Select style={{ width: 250 }} placeholder={t("- - Please Select - -")}>
              <Option value="Thai">{t("Thai")}</Option>
              <Option value="Chinese">{t("Chinese")}</Option>
              <Option value="Japanese">{t("Japanese")}</Option>
            </Select>
          </Form.Item>
        </div>

        <div style={{ width: "100%", display: 'flex', marginTop: '20px' }}>
          <Form.Item

          >
            <Input.Group compact>
              <div style={{ display: "flex", gap: "8px" }}>
                <Form.Item label={t("CitizenID")} required>
                  <Input.Group compact>
                    <div style={{ display: "flex", gap: "8px" }}>
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
            </Input.Group>
          </Form.Item>

        </div>

        <div style={{ width: "100%", display: 'flex', marginTop: '20px' }} >
          <Form.Item label={t('Gender')} name="gender" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="Male"> {t('Male')} </Radio>
              <Radio value="Female"> {t('Female')} </Radio>
              <Radio value="Unsex"> {t('Unsex')} </Radio>
            </Radio.Group>
          </Form.Item>

        </div>

        <div style={{ width: "100%", display: "flex", marginTop: "20px" }}>
          <Form.Item label={t('Mobile Phone')} required>

            <Input.Group compact>
              <div style={{ display: "flex", gap: "8px" }}>
                <Form.Item name="mobilePrefix" noStyle>
                  <Select style={{ width: 80 }}>
                    <Select.Option value="+66">+66</Select.Option>
                    <Select.Option value="+93">+93</Select.Option>
                  </Select>
                </Form.Item>
                <span>-</span>
                <Form.Item name="mobileNumber" noStyle>
                  <Input style={{ width: 150 }} maxLength={9} name="mobileNumber" />
                </Form.Item>
              </div>
            </Input.Group>

          </Form.Item>
        </div>

        <div style={{ width: "100%", display: "flex", marginTop: "20px" }} >
          <Form.Item label={t('Passport No')} name="passport">
            <Input style={{ width: '200px' }} name="passport" />
          </Form.Item>
        </div>


        <div style={{ width: "100%", display: "flex", marginTop: "20px", marginBottom: '20px' }} >
          <Form.Item label={t('Expected Salary')} name="salary" rules={[{ required: true }]}>
            <Input style={{ width: 320, marginRight: 200 }} name="salary" />
          </Form.Item>

          <Form.Item>
            <Button type="default" onClick={handleReset} style={{ marginRight: 100 }}>
              {t('RESET')}
            </Button>
            <Button type="default" htmlType="submit">
              {editData ? t("UPDATE") : t("SUBMIT")}
            </Button>
          </Form.Item>
        </div>

      </Form>
    </div>
  );
};

export default FormComponent;