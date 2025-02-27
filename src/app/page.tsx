"use client";

import Link from "next/link";
import { Card, Row, Col, Dropdown, Menu, Button, Space} from "antd";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import "./i18n";
import { useTranslation } from "react-i18next";

export default function Home() {
  const {t, i18n} = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
}

const LangSelector = (
  <Menu
    items={[
      {
        key: "en",
        label: "EN",
        onClick: () => changeLanguage("en"),
      },
      {
        key: "th",
        label: "TH",
        onClick: () => changeLanguage("th"),
      },
    ]}
  />
);

  return (

    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "linear-gradient(to left, #FFA200 , #6EDA78)",
    }}
   >
        <h1 style={{ color: "#fff", marginBottom: "40px" }}>SWD-FrontEnd-Test</h1>
        <Row gutter={16}>
          <Col span={8}>
            <Link href="/test1">
              <Card
              title={t("Test 1")}
              hoverable
              style={{
                width: "250px",
                height: "120px",
                textAlign: "center",
              }}
             >
              <p>{t("Layout & Style")}</p>
              </Card>
            </Link>
          </Col>
        

        <Col span={8}>
            <Link href="/test2">
              <Card 
                title={t("Test 2")}
                hoverable
                style={{
                  width: "250px",
                  height: "120px",
                  textAlign: "center",
                }}
              >
                <p>{t("Connect API")}</p>
              </Card>
            </Link>
        </Col>

        <Col span={8}>
          <Link href="/test3">
            <Card 
              title={t("Test 3")}
              hoverable
              style={{
                width: "250px",
                height: "120px",
                textAlign: "center",
              }}
              >
                <p>{t("Form & Table")}</p>
            </Card>
            </Link>
        </Col>
        </Row>

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
          <Button type="primary" >
            <Space>
              {t("Language")} <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}
