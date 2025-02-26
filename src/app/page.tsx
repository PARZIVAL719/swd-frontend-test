import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Card, Row, Col } from "antd";

export default function Home() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "linear-gradient(to left, #FFA200 , #6EDA78)", // Gradient background
    }}
   >
        <h1 style={{ color: "#fff", marginBottom: "20px" }}>SWD-FrontEnd-Test</h1>
        <Row gutter={16}>
          <Col span={8}>
            <Link href="/test1">
              <Card
              title="Test 1"
              hoverable
              style={{
                width: "250px",
                height: "120px",
                textAlign: "center",
              }}
             >
              <p>Layout & Style</p>
              </Card>
            </Link>
          </Col>
        

        <Col span={8}>
            <Link href="/test2">
              <Card title="Test 2"
                hoverable
                style={{
                  width: "250px",
                  height: "120px",
                  textAlign: "center",
                }}
              >
                <p>Connect API</p>
              </Card>
            </Link>
        </Col>

        <Col span={8}>
          <Link href="/test3"></Link>
            <Card title="Test 3"
              hoverable
              style={{
                width: "250px",
                height: "120px",
                textAlign: "center",
              }}
              >
                <p>Form & Table</p>
            </Card>
        </Col>
        </Row>
    </div>
  );
}
