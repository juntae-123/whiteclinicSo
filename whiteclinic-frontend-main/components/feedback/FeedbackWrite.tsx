"use client";

import {
  Button,
  TextField,
  InputAdornment,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Title from "../common/Title";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  bgcolor: "background.paper",
  border: "2px solid #A3B1C6",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  textAlign: "center" as const,
};

const FeedbackWrite = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const alertedRef = useRef(false);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const isFormValid = title.trim().length >= 10 && detail.trim().length >= 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<
    "cancel" | "complete" | "alert" | null
  >(null);

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    // 기존 이미지에 새로 선택한 이미지를 추가
    const newImages = [...images, ...files];

    // 중복 제거 (파일명+사이즈 기준)
    const uniqueImages = Array.from(
      new Map(newImages.map((file) => [file.name + file.size, file])).values()
    );

    setImages(uniqueImages);

    // 미리보기도 누적
    const newPreviews = uniqueImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
  };

  const handleRemoveImage = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages);
    setImagePreviews(newImages.map((file) => URL.createObjectURL(file)));
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && !alertedRef.current) {
      alertedRef.current = true;
      alert("로그인이 필요합니다.");
      router.replace("/login");
    }
  }, [router]);

  // 버튼 클릭 핸들러
  const handleCancel = () => {
    if (title.length > 0 || detail.length > 0) {
      setModalMsg("작성을 취소하겠습니까?");
      setModalType("cancel");
      setModalOpen(true);
    } else {
      router.push("/feedback");
    }
  };

  const handleComplete = async () => {
    if (!title && !detail) {
      setModalMsg("제목과 내용을 입력해주세요");
      setModalType("alert");
      setModalOpen(true);
    } else if (title && !detail) {
      setModalMsg("내용을 입력해주세요");
      setModalType("alert");
      setModalOpen(true);
    } else if (!title && detail) {
      setModalMsg("제목을 입력해주세요");
      setModalType("alert");
      setModalOpen(true);
    } else {
      // API 호출하여 리뷰 저장
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("로그인이 필요합니다.");
          router.push("/login");
          return;
        }

        const requestData = {
          title: title,
          content: detail,
        };

        console.log("리뷰 작성 요청 데이터:", requestData);

        const response = await fetch("/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        });

        console.log("리뷰 작성 응답 상태:", response.status);

        if (response.ok) {
          const result = await response.json();
          console.log("리뷰 작성 성공 응답:", result);
          
          if (result && result.success) {
            setModalMsg("리뷰가 성공적으로 등록되었습니다.");
            setModalType("complete");
            setModalOpen(true);
          } else {
            setModalMsg("리뷰 등록에 실패했습니다.");
            setModalType("alert");
            setModalOpen(true);
          }
        } else {
          const error = await response.json();
          console.error("리뷰 작성 에러:", error);
          setModalMsg(error.message || "리뷰 등록에 실패했습니다.");
          setModalType("alert");
          setModalOpen(true);
        }
      } catch (error) {
        console.error("리뷰 작성 오류:", error);
        setModalMsg("리뷰 등록 중 오류가 발생했습니다.");
        setModalType("alert");
        setModalOpen(true);
      }
    }
  };

  // 모달 "확인" 버튼
  const handleModalConfirm = () => {
    setModalOpen(false);
    if (modalType === "cancel" || modalType === "complete") {
      router.push("/feedback");
    }
  };

  // 모달 "취소" 버튼
  const handleModalCancel = () => {
    setModalOpen(false);
    // 아무 동작 없음(작성화면 유지)
  };

  return (
    <div className="flex items-center justify-center pt-14 pb-50">
      <section ref={sectionRef} className="flex flex-col items-center gap-10">
        <Title text="리뷰" />

        <div className="w-full mx-[390px] flex flex-col gap-8">
          <h1 className="pb-3 text-3xl font-bold border-b-2 border-gray-500">
            리뷰를 작성해주세요
          </h1>
          <div className="flex flex-col gap-3 mx-[20px] ">
            <h3 className="text-xl font-extrabold">리뷰 제목</h3>
            <TextField
              id="outlined-basic"
              label="20자 이내로 작성해주세요"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              inputProps={{
                style: { fontSize: 20 },
                maxLength: 20,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ fontSize: 14, color: "#aaa" }}
                  >
                    {title.length} / 20
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex flex-col gap-3 mx-[20px]">
            <h3 className="text-xl font-extrabold">리뷰 내용</h3>
            <TextField
              id="outlined-basic"
              label="500자 이내로 작성해주세요"
              variant="outlined"
              multiline
              minRows={8}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              inputProps={{ style: { fontSize: 20 }, maxLength: 500 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ fontSize: 14, color: "#aaa" }}
                  >
                    {detail.length} / 500
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex flex-col gap-3 mx-[20px] ">
            <h3 className="text-xl font-extrabold">리뷰 사진</h3>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="px-3 py-2 border rounded"
            />
            {/* 미리보기 */}
            {/* <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="object-cover w-24 h-24 border rounded"
                />
              ))}
            </div> */}
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((src, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  style={{ width: "96px", height: "96px" }}
                >
                  <Image
                    src={src}
                    alt={`preview-${idx}`}
                    width={96}
                    height={96}
                    className="object-cover border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white transition-opacity bg-black rounded opacity-0 bg-opacity-60 group-hover:opacity-100"
                  >
                    삭제하기
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outlined"
              sx={{
                width: "200px",
                height: "50px",
                fontSize: "17px",
                fontWeight: "bold",
                borderColor: "#A3B1C6",
                borderRadius: "8px",
                borderWidth: "2px",
                background: "#fff",
                color: "#A3B1C6",
                "&:hover": {
                  backgroundColor: "#f7f7f7",
                },
                marginTop: "80px",
              }}
              className="self-center"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "200px",
                height: "50px",
                fontSize: "17px",
                fontWeight: "bold",
                borderColor: "#fff",
                borderRadius: "8px",
                backgroundColor: isFormValid ? "#A3B1C6" : "#e5e7eb", // Tailwind bg-gray-200
                color: isFormValid ? "#fff" : "#a3a3a3", // 비활성화시 글자색도 흐리게
                cursor: isFormValid ? "pointer" : "not-allowed",
                "&:hover": {
                  backgroundColor: isFormValid ? "#7F8B9B" : "#e5e7eb",
                },
                marginTop: "80px",
              }}
              className="self-center"
              onClick={handleComplete}
              disabled={!isFormValid} // 10글자 미만이면 비활성화
            >
              작성 완료하기
            </Button>
          </div>
        </div>
      </section>
      {/* MUI Basic Modal */}
      <Modal open={modalOpen} onClose={handleModalCancel}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {modalMsg}
          </Typography>
          <div className="flex justify-center gap-4">
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "100px",
                backgroundColor: "#A3B1C6",
                color: "#fff",
                borderColor: "#A3B1C6",
                "&:hover": {
                  backgroundColor: "#7F8B9B",
                },
                boxShadow: "none",
              }}
              onClick={handleModalConfirm}
            >
              확인
            </Button>
            {(modalType === "cancel" || modalType === "complete") && (
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  width: "100px",
                  backgroundColor: "#fff",
                  color: "#A3B1C6",
                  borderColor: "#A3B1C6",
                  "&:hover": {
                    backgroundColor: "#f1f6ff",
                  },
                  boxShadow: "none",
                }}
                onClick={handleModalCancel}
              >
                취소
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FeedbackWrite;
