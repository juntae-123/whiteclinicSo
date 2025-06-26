"use client";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Agreement = () => {
  const [agree, setAgree] = useState(false);
  const [serviceType, setServiceType] = useState("에어컨");
  const [detail, setDetail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isFormValid = agree && serviceType && detail.trim().length >= 10;

  const handleReservation = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      const requestData = {
        service_type: serviceType,
        content: detail,
      };

      console.log("예약 작성 요청 데이터:", requestData);

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log("예약 작성 응답 상태:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("예약 작성 성공 응답:", result);
        
        if (result && result.success) {
          alert("예약이 성공적으로 등록되었습니다.");
          router.push("/mypage");
        } else {
          alert("예약 등록에 실패했습니다.");
        }
      } else {
        const error = await response.json();
        console.error("예약 작성 에러:", error);
        alert(error.message || "예약 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("예약 작성 오류:", error);
      alert("예약 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-15 mx-[20px] ">
      <div className="flex flex-col gap-2">
        <h2 className="mb-2 text-2xl font-bold">이용할 서비스 선택</h2>
        <div className="flex gap-8 ml-2">
          <label className="flex gap-2">
            <input
              type="radio"
              name="type"
              value="에어컨"
              onChange={(e) => setServiceType(e.target.value)}
              checked={serviceType === "에어컨"}
            />
            <span className="text-base font-bold">에어컨</span>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="type"
              value="세탁기"
              onChange={(e) => setServiceType(e.target.value)}
              checked={serviceType === "세탁기"}
            />
            <span className="text-base font-bold">세탁기</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="mb-2 text-2xl font-bold">서비스매니저 전달사항</h2>
        <div className="flex flex-col gap-3 ml-2">
          <TextField
            id="outlined-basic"
            label="서비스매니저에게 전달할 내용을 입력해 주세요.(최대 100자)"
            variant="outlined"
            multiline
            minRows={2}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            inputProps={{ style: { fontSize: 20 }, maxLength: 100 }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ fontSize: 14, color: "#aaa" }}
                >
                  {detail.length} / 100
                </InputAdornment>
              ),
            }}
          />
          {/* <label>
            <input
              className="w-full h-10 text-sm border rounded-lg"
              type="text"
              placeholder="서비스매니저에게 전달할 내용을 입력해 주세요.(최대 100자)"
              maxLength={100}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label> */}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="mb-2 text-2xl font-bold">
          서비스 개인정보 수집 이용 동의
        </h2>
        <div className="flex flex-col gap-1 mb-5 ml-2">
          <div className="flex flex-col gap-1 p-5 text-base border rounded-lg">
            화이트클리닉은 고객님의 개인정보를 중요시하며, &ldquo;정보통신망 이용촉진
            및 정보보호&rdquo;에 관한 법률을 준수하고 있습니다. 화이트클리닉은
            고객님에게 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적,
            개인정보의 보유 및 이용 기간을 안내해 드리며 동의 여부를 체크해
            주시기 바랍니다. 수집에 동의하지 않는다면 문의가 제한됩니다.
            <br />
            <br />
            1. 수집하는 개인정보 항목
            <br />
            고객명, 우편번호, 상세주소, 연락처(휴대전화번호), 이메일, 내용
            <br />
            <br />
            2. 개인정보의 수집 및 이용 목적
            <br />
            회사명, 우편번호, 상세주소, 연락처(휴대전화번호), 이메일, 내용 :
            문의 사항에 대한 답변을 전달하기 위한 의사소통 경로의 확보
            <br />
            <br />
            3. 개인정보의 보유 및 이용 기간
            <br />
            원칙적으로 개인정보의 수집∙이용 목적 달성 시 바로 파기합니다.
            <br />
            <br />
            4. 수집∙이용 목적을 달성한 경우에도 법률의 규정에 따라 보존할 필요가
            있다면 고객의 개인정보를 보유할 수 있습니다.
            <br />
            - 계약 또는 청약 철회 등에 관한 기록 : 5년
            <br />
            - 대금결제 및 재화 등의 공급에 관한 기록 : 5년
            <br />
            - 소비자의 불만 또는 분쟁 처리에 관한 기록 : 3년 등
            <br />
            <br />
            위의 개인정보수집, 이용 및 제공에 관한 사항에 모두 동의합니다.
          </div>
          <label className="flex items-center gap-2 mt-2 ml-2">
            <input
              name="agree1"
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <span className="text-lg font-bold ">동의합니다</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {/* <Button
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
          // onClick={handleCancel}
        >
          취소
        </Button> */}
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
          onClick={handleReservation}
          disabled={!isFormValid || isSubmitting} // 10글자 미만이면 비활성화
        >
          {isSubmitting ? "예약 중..." : "예약하기"}
        </Button>
      </div>
    </div>
  );
};

export default Agreement;
