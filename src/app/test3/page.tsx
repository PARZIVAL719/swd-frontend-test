"use client";
import React from "react";
import FormComponent from "@/components/form";
import CustomTable from "@/components/table";
import { Layout } from "antd";
import LangSwitcher from "@/components/LangSwitcher";
import { useTranslation } from "react-i18next";
import '../i18n'
import { useRouter } from "next/navigation"; 
import HomeButton from "@/components/homeButton";


const { Header, Content } = Layout;



const Page: React.FC = () => {
    
    const { t } = useTranslation();
    const router = useRouter();

  return (
    <div>
      
     <Header style={{ background: "transparent", boxShadow: "none", padding: "10px 20px", display: "flex", justifyContent: "flex-end" }}>
     
     <LangSwitcher />
     <HomeButton />
     </Header>
     <h1>{t('form')}</h1>
     
     
      <FormComponent />
      <CustomTable />
    </div>
  );
};

export default Page;