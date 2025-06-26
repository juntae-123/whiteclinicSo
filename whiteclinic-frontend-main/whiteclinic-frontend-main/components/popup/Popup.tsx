"use client";

import { useEffect, useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 0,
  border: "none",
  boxShadow: "none",
  background: "none",
  outline: "none",
};

const PopupPage = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1); // 1: popup1, 2: popup2
  const [hideForOneDay1, setHideForOneDay1] = useState(false);
  const [hideForOneDay2, setHideForOneDay2] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const now = new Date().getTime();
      const hideUntil1 = Number(localStorage.getItem("popup1HideUntil") || 0);
      const hideUntil2 = Number(localStorage.getItem("popup2HideUntil") || 0);

      if (now < hideUntil1 && now < hideUntil2) {
        // 둘 다 1일간 안보기면 아무것도 안 띄움
        setOpen(false);
      } else if (now < hideUntil1) {
        // popup1만 1일간 안보기면 popup2만 띄움
        setOpen(true);
        setStep(2);
        setHideForOneDay2(false);
      } else if (now < hideUntil2) {
        // popup2만 1일간 안보기면 popup1만 띄움
        setOpen(true);
        setStep(1);
        setHideForOneDay1(false);
      } else {
        // 둘 다 안 가려져 있으면 popup1부터
        setOpen(true);
        setStep(1);
        setHideForOneDay1(false);
      }
    }
  }, []);

  // popup1 1일동안 안보기 버튼
  const handleAudioClick1 = () => {
    setHideForOneDay1((prev) => !prev);
  };
  // popup2 1일동안 안보기 버튼
  const handleAudioClick2 = () => {
    setHideForOneDay2((prev) => !prev);
  };

  // popup1 닫기 → popup2로 전환 또는 종료
  const handleNext = () => {
    if (hideForOneDay1) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      localStorage.setItem("popup1HideUntil", String(tomorrow.getTime()));
    }
    // popup2가 1일간 안보기면 바로 닫기
    const now = new Date().getTime();
    const hideUntil2 = Number(localStorage.getItem("popup2HideUntil") || 0);
    if (now < hideUntil2) {
      setOpen(false);
    } else {
      setStep(2);
      setHideForOneDay2(false);
    }
  };

  // popup2 닫기
  const handleClose = () => {
    if (hideForOneDay2) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      localStorage.setItem("popup2HideUntil", String(tomorrow.getTime()));
    }
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => {}}>
      <Box sx={style}>
        {step === 1 ? (
          <div className="relative">
            <Image
              src="/popup1.png"
              alt="팝업1"
              width={400}
              height={400}
              style={{ display: "block" }}
              priority
            />
            {/* 1일동안 안보기(동그라미) 버튼 + 문구 */}
            <div
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.7)",
                borderRadius: 20,
                padding: "2px 10px",
              }}
            >
              <IconButton
                onClick={handleAudioClick1}
                sx={{
                  color: hideForOneDay1 ? "#A3B1C6" : "#888",
                  background: "transparent",
                  p: 0,
                  mr: 1,
                }}
              >
                {hideForOneDay1 ? (
                  <CheckCircleIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </IconButton>
              <span style={{ fontSize: 15, color: "#444" }}>
                1일간 보지 않기
              </span>
            </div>
            {/* 닫기 버튼 */}
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "#fff",
                background: "rgba(0,0,0,0.3)",
                "&:hover": { background: "rgba(0,0,0,0.5)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <div className="relative">
            <Image
              src="/popup2.png"
              alt="팝업2"
              width={400}
              height={400}
              style={{ display: "block" }}
              priority
            />
            {/* 1일동안 안보기(동그라미) 버튼 + 문구 */}
            <div
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.7)",
                borderRadius: 20,
                padding: "2px 10px",
              }}
            >
              <IconButton
                onClick={handleAudioClick2}
                sx={{
                  color: hideForOneDay2 ? "#A3B1C6" : "#888",
                  background: "transparent",
                  p: 0,
                  mr: 1,
                }}
              >
                {hideForOneDay2 ? (
                  <CheckCircleIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </IconButton>
              <span style={{ fontSize: 15, color: "#444" }}>
                1일간 보지 않기
              </span>
            </div>
            {/* 닫기 버튼 */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "#fff",
                background: "rgba(0,0,0,0.3)",
                "&:hover": { background: "rgba(0,0,0,0.5)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default PopupPage;
