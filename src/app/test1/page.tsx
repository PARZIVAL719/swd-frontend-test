"use client";

import React, { useState } from "react";
import "../../styles/Shape.scss";
import "../i18n";
import { useTranslation } from "react-i18next";
import { Layout, Card } from "antd";
import LangSwitcher from "@/components/LangSwitcher";
import HomeButton from "@/components/homeButton";

const { Header, Content } = Layout;

const initialShapes = ["square", "circle", "oval", "trapezoid", "rectangle", "parallelogram"];

export default function ShapesPage() {
  const [shapes, setShapes] = useState(initialShapes);
  const [isSwapped, setIsSwapped] = useState(false);
  const { t } = useTranslation();

  const randomShape = () => {
    setShapes((prevShapes) => {
      const shuffledShapes = [...prevShapes];
      for (let i = shuffledShapes.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledShapes[i], shuffledShapes[randomIndex]] = [shuffledShapes[randomIndex], shuffledShapes[i]];
      }
      return shuffledShapes;
    });
  };

  const prevShape = () => {
    setShapes((prevShapes) => {
      const lastItem = prevShapes[prevShapes.length - 1];
      return [lastItem, ...prevShapes.slice(0, -1)];
    });
  };

  const nextShape = () => {
    setShapes((prevShapes) => {
      const firstItem = prevShapes[0];
      return [...prevShapes.slice(1), firstItem];
    });
  };

  const swapGrid = () => {
    setIsSwapped(!isSwapped);
  };

  return (
    <div style={{ width: "100vh" }}>
      <Header
        style={{
          background: "transparent",
          boxShadow: "none",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <LangSwitcher />
        <HomeButton />
      </Header>

      <h2>{t("Layout & Style")}</h2>

      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="navigation">
        <Card className="shape-card" onClick={prevShape}>
            <div className="arrow left"></div>
            <div className="btn-text">{t("Move Shape")}</div>
          </Card>

          <Card className="shape-card" onClick={swapGrid}>
            <div style={{ display: "flex" }}>
              <div
                className="arrow up"
                style={{ cursor: "pointer" }}
              ></div>
              <div
                className="arrow down"
                style={{ cursor: "pointer" }}
              ></div>
            </div>
            <div className="btn-text">{t("Move Position")}</div>
          </Card>

          <Card className="shape-card" onClick={prevShape}>
            <div className="arrow right"></div>
            <div className="btn-text">{t("Move Shape")}</div>
          </Card>
        </div>

        <div className="shape-grid">
          <div className={`row-1 ${isSwapped ? "shift-left" : "shift-right"}`}>
            {shapes.slice(0, 3).map((shape, index) => (
              <Card style={{cursor: "pointer"}} key={index} className="shape-card" onClick={randomShape}>
                <div className={`shape ${shape}`} />
              </Card>
            ))}
          </div>

          <div className={`row-2 ${isSwapped ? "shift-right" : "shift-left"}`}>
            {shapes.slice(3, 6).map((shape, index) => (
              <Card style={{cursor: "pointer"}} key={index + 3} className="shape-card" onClick={randomShape}>
                <div className={`shape ${shape}`} />
              </Card>
            ))}
          </div>
        </div>
      </Content>
    </div>
  );
}
