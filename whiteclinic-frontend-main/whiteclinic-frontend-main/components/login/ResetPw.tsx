"use client";

import { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ResetPw = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center bg-[#F2F3F7] pt-32 pb-50">
      <section className="flex flex-col gap-6 w-[645px] h-[600px] p-[50px] bg-white  ">
        <span className="my-5 text-3xl font-extrabold">비밀번호 재설정</span>

        <span className="text-lg ">
          입력한 정보와 일치하는 화이트크리닉 계정이 없습니다. <br />
          아래 회원가입 버튼을 통해 회원가입 후 이용해 주세요.
        </span>

        <div className="flex flex-col gap-6 mt-56">
          <Button
            href="/signup"
            variant="contained"
            sx={{
              width: "403px",
              height: "55px",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "#A3B1C6",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#7F8B9B",
              },
            }}
            className="self-center"
          >
            회원가입 하기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ResetPw;
