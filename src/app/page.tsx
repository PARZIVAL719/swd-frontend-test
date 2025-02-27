"use client";

import { useRouter } from "next/navigation"; 
import { Card, Row, Col} from "antd";
import "./i18n";
import { useTranslation } from "react-i18next";
import LangSwitcher from "@/components/LangSwitcher";

export default function Home() {

  const { t } = useTranslation();
  const router = useRouter(); 
  return (

    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
   >
        <h1 style={{ color: "#fff", marginBottom: "40px" }}>SWD-FrontEnd-Test</h1>
        <Row gutter={16}>
          <Col span={8}>
              <Card onClick={() => router.push('/test1')}
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
          </Col>
      
        <Col span={8}>
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
        </Col>

        <Col span={8}>
          <Card onClick={() => router.push('/test3')}
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
        </Col>
      </Row>

        <LangSwitcher/>

    </div>
  );
}
