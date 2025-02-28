"use client";

import React, { useState } from "react";
import FormComponent from "@/components/form";
import CustomTable from "@/components/table";
import { Layout } from "antd";
import LangSwitcher from "@/components/LangSwitcher";
import { useTranslation } from "react-i18next";
import "../i18n";
import HomeButton from "@/components/homeButton";

const { Header, Content } = Layout;

const Page: React.FC = () => {
  const { t } = useTranslation();

  const [editData, setEditData] = useState<any>(null);

  return (
    <div>
      <Header style={{ background: "transparent", boxShadow: "none", padding: "10px 20px", display: "flex", justifyContent: "flex-end" }}>
        <LangSwitcher />
        <HomeButton />
      </Header>
      <h1>{t("Form & Table")}</h1>

      <FormComponent editData={editData} setEditData={setEditData} />

      <CustomTable setEditData={setEditData} />
    </div>
  );
};

export default Page;
