"use client";

import { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { login } from "@/api/auth/authAPI";

const Login = () => {
  const [id, setId] = useState("");
  const [user_password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await login({
        user_email: id,
        user_password,
      });
      alert("로그인이 완료되었습니다.");
      window.location.href = "/";
      console.log("응답:", res);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("로그인 실패:", error.response?.data);
        const message = error.response?.data?.message || "로그인 중 오류 발생";
        alert("로그인 실패: " + message);
      } else {
        console.error("예상치 못한 오류:", error);
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F2F3F7] pt-32 pb-50">
      <section className="flex flex-col gap-5 w-[645px] h-[680px] p-[50px] bg-white  ">
        <Button
          href="/"
          sx={{
            "&:hover": {
              backgroundColor: "#fff",
            },
            margin: "0px",
          }}
          className="self-start "
        >
          <Image width={220} height={31} src="/images/logo.png" alt="로고" />
        </Button>
        <span>로그인</span>
        <div className="flex flex-col gap-10 mt-10 ">
          <TextField
            id="standard-basic"
            label="이메일 아이디"
            variant="standard"
            value={id}
            onChange={(e) => setId(e.target.value)}
            inputProps={{ style: { fontSize: 20 } }}
          />
          <TextField
            id="standard-basic"
            label="비밀번호"
            variant="standard"
            type={showPassword ? "text" : "password"}
            value={user_password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { fontSize: 20 },
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                  sx={{
                    paddingRight: "20px",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        </div>
        <Button
          variant="contained"
          onClick={handleSubmit}
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
            marginTop: "70px",
          }}
          className="self-center"
        >
          로그인
        </Button>
        <div className="self-center">
          <Button
            href="/login/find_id"
            sx={{
              color: "#767676",
            }}
          >
            아이디 찾기
          </Button>
          <Button
            href="/login/find_pw"
            sx={{
              color: "#767676",
            }}
          >
            비밀번호 재설정
          </Button>
          <Button
            href="/signup"
            sx={{
              color: "#767676",
              fontWeight: "bold",
            }}
          >
            회원가입
          </Button>
        </div>
        <div className="self-center">
          <Button
            onClick={() => {
              window.location.href =
                "http://localhost:3001/api/auths/login/google";
            }}
            sx={{
              color: "#767676",
              fontWeight: "bold",
              width: "40px",
              borderRadius: "100%",
            }}
          >
            <Image src="/images/login_google.png" alt="구글 로그인" width={40} height={40} />
          </Button>

          <Button
            onClick={() => {
              window.location.href =
                "http://localhost:3001/api/auths/login/kakao";
            }}
            sx={{
              color: "#767676",
              fontWeight: "bold",
              width: "40px",
              borderRadius: "100%",
            }}
          >
            <Image src="/images/login_kakao.png" alt="카카오 로그인" width={40} height={40} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Login;
