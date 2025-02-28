"use client";

import React, { useEffect, useState } from "react";
import { Table, Checkbox, Button, Space, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/redux/store";
import { resetForm, addForm } from "../app/redux/formSlice";
import { useTranslation } from "react-i18next";

const LOCAL_STORAGE_KEY = "formData";

interface CustomTableProps {
  setEditData: (data: any) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({ setEditData }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.form);
  const [isClient, setIsClient] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data.map(item => item.key));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one entry to delete.");
      return;
    }

    const isConfirm = window.confirm("Are you sure you want to delete the selected entries?");
    if (isConfirm) {
      const updatedData = data.filter(item => !selectedRowKeys.includes(item.key));
      dispatch(resetForm());
      updatedData.forEach(item => dispatch(addForm(item)));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
      setSelectedRowKeys([]);
      message.success("Selected entries deleted successfully.");
    }
  };

  if (!isClient) return null;

  const columns: ColumnsType<any> = [
    {
      title: t('Name'),
      dataIndex: "name",
    },

    {
      title: t('Gender'),
      dataIndex: "gender",
      render: (text) => {
        return t(text);
      }
    },

    {
      title: t('Mobile Phone'),
      dataIndex: "mobile",
      render: (_, record) => `${record.mobilePrefix || ""} ${record.mobileNumber || ""}`,
    },

    {
      title: t('Nationality'),
      dataIndex: "nationality",
      render: (text) => {
        return t(text);
      }
    },

    {
      title: t('Manage'),
      dataIndex: "manage",
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => setEditData(record)}>
            {t("EDIT")}
          </Button>

          <Button type="link" danger onClick={() => handleDeleteSingle(record.key)}>
            {t("DELETE")}
          </Button>
        </Space>
      ),
    },
  ];

  const handleSelect = (key: string) => {
    setSelectedRowKeys(prev =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    );
  };

  const handleDeleteSingle = (key: string) => {
    const isConfirm = window.confirm("Are you sure you want to delete this entry?");
    if (isConfirm) {
      const updatedData = data.filter(item => item.key !== key);
      dispatch(resetForm());
      updatedData.forEach(item => dispatch(addForm(item)));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
      message.success("Entry deleted successfully.");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div style={{ padding: "20px" }}>
      <Checkbox onClick={handleSelectAll}
        type="default"
        style={{ marginBottom: "10px", marginRight: "10px" }} />
      {selectedRowKeys.length === data.length ? t('Select All') : t('Select All')}

      <Button
        onClick={handleDeleteSelected}
        type="primary"
        danger
        style={{ marginBottom: "10px", marginLeft: "20px" }}
      >
        {t('DELETE')}
      </Button>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default CustomTable;