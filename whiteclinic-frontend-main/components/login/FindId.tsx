"use client";

import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

const FindId = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleFindId = async () => {
    if (!phoneNo || !userName) {
      alert("이름과 휴대전화 번호를 모두 입력해주세요.");
      return;
    }
    try {
      const res = await axios.post(
        "/api/users/find-email",
        {
          user_name: userName,
          phone_no: phoneNo,
        }
      );
      console.log("서버 응답:", res.data);
      const email = res.data?.data?.email; // ← 여기서 email 추출

      if (email) {
        alert(`이메일: ${email}`);
        router.push("/login");
      } else {
        alert(
          "입력한 정보와 일치하는 화이트크리닉 계정이 없습니다.\n아래 회원가입 버튼을 통해 회원가입 후 이용해 주세요."
        );
        router.push("/signup");
      }
    } catch (error: unknown) {
      console.error("아이디 찾기 오류:", error);
      alert(
        "입력한 정보와 일치하는 화이트크리닉 계정이 없습니다.\n아래 회원가입 버튼을 통해 회원가입 후 이용해 주세요."
      );
      router.push("/signup");
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F2F3F7] pt-32 pb-50">
      <section className="flex flex-col gap-6 w-[645px] h-[600px] p-[50px] bg-white  ">
        <span className="my-4 text-3xl font-extrabold">아이디 찾기</span>
        <span className="text-lg ">
          아이디를 찾기 위해 회원님의 회원정보가 필요합니다. <br />
          아래의 정보를 입력해 주세요.
        </span>
        <div className="flex flex-col gap-10 mt-12">
          <TextField
            label="가입한 휴대전화 번호"
            variant="standard"
            inputProps={{ style: { fontSize: 20 } }}
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <TextField
            label="가입한 이름"
            variant="standard"
            inputProps={{ style: { fontSize: 20 } }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
            marginTop: "30px",
          }}
          className="self-center"
          onClick={handleFindId}
        >
          확인
        </Button>
      </section>
    </div>
  );
};

export default FindId;
