"use client";

import { Dropdown, Menu, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const LangSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const LangSelector = (
    <Menu
      items={[
        {
          key: "en",
          label: "EN | English",
          onClick: () => changeLanguage("en"),
        },
        {
          key: "th",
          label: "TH | ภาษาไทย",
          onClick: () => changeLanguage("th"),
        },
      ]}
    />
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Dropdown overlay={LangSelector} trigger={["click"]}>
        <Button type="primary">
          <Space>
            {t("Language")} <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default LangSwitcher;