"use client";
import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const HomeButton: React.FC = () => {
    const router = useRouter();

    const { t } = useTranslation();

    return (
        <Button 
            type="default" 
            onClick={() => router.push('/')}
            style={{ 
                top: "50px",
                right: "-520px",
                width: "80px",
                textAlign: "center",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "5px"
            }}
        >
            {t("Home")}
        </Button>
    );
};

export default HomeButton;
