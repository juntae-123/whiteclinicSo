"use client";

import { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from "next/image";
import { signup } from "@/api/auth/authAPI";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [id, setId] = useState("");
  const [user_password, setPassword] = useState("");
  const [user_passwordCheck, setPasswordCheck] = useState("");
  const [user_name, setName] = useState("");
  const [phone_no, setPhone] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (user_password !== user_passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await signup({
        user_email: id,
        user_password,
        user_name,
        phone_no,
      });
      alert("회원가입이 완료되었습니다.");
      router.push("/login"); // 회원가입 성공 후 로그인 페이지로 이동
      console.log("응답:", res);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("회원가입 실패:", err.response?.data);
        const message = err.response?.data?.message || "회원가입 중 오류 발생";
        alert("회원가입 실패: " + message);
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F2F3F7] pt-16 pb-50">
      <section className="flex flex-col gap-5 w-[645px] h-[840px] p-[50px] bg-white ">
        <Image
          width={220}
          height={31}
          className="mt-3"
          src="/images/logo.png"
          alt="로고"
        />
        <span>회원가입</span>
        <div className="flex flex-col gap-10 mt-8 ">
          <TextField
            label="이메일 아이디"
            variant="standard"
            value={id}
            onChange={(e) => setId(e.target.value)}
            inputProps={{ style: { fontSize: 20 } }}
          />
          <TextField
            label="비밀번호"
            variant="standard"
            type={showPassword ? "text" : "password"}
            value={user_password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { fontSize: 20 },
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  sx={{ paddingRight: "20px" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="비밀번호 확인"
            variant="standard"
            type={showPasswordCheck ? "text" : "password"}
            value={user_passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            InputProps={{
              style: { fontSize: 20 },
              endAdornment: (
                <IconButton
                  onClick={() => setShowPasswordCheck((prev) => !prev)}
                  edge="end"
                  sx={{ paddingRight: "20px" }}
                >
                  {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="이름"
            variant="standard"
            value={user_name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ style: { fontSize: 20 } }}
          />
          <TextField
            label="핸드폰번호"
            variant="standard"
            value={phone_no}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            inputProps={{ style: { fontSize: 20 }, maxLength: 11 }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: "403px",
              height: "63px",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "#A3B1C6",
              color: "#fff",
              "&:hover": { backgroundColor: "#7F8B9B" },
              marginTop: "55px",
            }}
            className="self-center"
          >
            회원가입
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Signup;
