"use client";

import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const FindPW = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (!email || !newPassword) {
      alert("이메일과 새 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      const res = await axios.post(
        "/api/users/reset-password",
        {
          user_email: email,
          new_password: newPassword,
        }
      );
      alert(res.data.message || "비밀번호가 성공적으로 재설정되었습니다.");
      // 필요하다면 로그인 페이지로 이동
      // router.push("/login");
    } catch (error: unknown) {
      console.error("비밀번호 재설정 오류:", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "비밀번호 재설정에 실패했습니다.");
      } else {
        alert("비밀번호 재설정에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F2F3F7] pt-32 pb-50">
      <section className="flex flex-col gap-6 w-[645px] h-[600px] p-[50px] bg-white  ">
        <span className="my-5 text-3xl font-extrabold">비밀번호 재설정</span>
        <span className="text-lg ">
          비밀번호 재설정을 위해 회원님의 아이디가 필요합니다. <br />
          아래의 정보를 입력해 주세요.
        </span>
        <div className="flex flex-col gap-10 mt-16">
          <TextField
            label="가입한 이메일"
            variant="standard"
            inputProps={{ style: { fontSize: 20 } }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="새 비밀번호"
            type="password"
            variant="standard"
            inputProps={{ style: { fontSize: 20 } }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <Button
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
            marginTop: "80px",
          }}
          className="self-center"
          onClick={handleResetPassword}
        >
          확인
        </Button>
      </section>
    </div>
  );
};

export default FindPW;
