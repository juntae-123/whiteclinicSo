import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Write = () => {
  const [serviceType, setServiceType] = useState("예약관련");
  const [detail, setDetail] = useState("");
  const [privacyAgreement, setPrivacyAgreement] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isFormValid = serviceType && detail.trim().length > 10 && privacyAgreement;

  const handleCancel = () => {
    router.push("/inquiry");
  };

  const handleComplete = async () => {
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
        privacy_agreement: privacyAgreement,
      };

      console.log("문의 작성 요청 데이터:", requestData);
      console.log("토큰:", token);

      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log("응답 상태:", response.status);
      console.log("응답 헤더:", response.headers);

      if (response.ok) {
        const result = await response.json();
        console.log("성공 응답:", result);
        
        // TransformInterceptor 응답 형식에 맞게 처리
        if (result && result.success) {
          alert("문의가 성공적으로 등록되었습니다.");
          router.push("/inquiry");
        } else {
          alert("문의 등록에 실패했습니다.");
        }
      } else {
        const error = await response.json();
        console.error("에러 응답:", error);
        alert(error.message || "문의 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("문의 등록 오류:", error);
      alert("문의 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 mx-[20px] ">
        <h3 className="text-xl font-extrabold">문의 서비스 선택</h3>

        <div className="flex gap-8 ml-2">
          <label className="flex gap-2">
            <input
              type="radio"
              name="type"
              value="예약관련"
              onChange={(e) => setServiceType(e.target.value)}
              checked={serviceType === "예약관련"}
            />
            <span className="text-base font-bold">예약관련</span>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="type"
              value="세탁기청소"
              onChange={(e) => setServiceType(e.target.value)}
              checked={serviceType === "세탁기청소"}
            />
            <span className="text-base font-bold">세탁기청소</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3 mx-[20px] ">
        <h3 className="text-xl font-extrabold">문의 내용</h3>
        <TextField
          id="outlined-basic"
          label="서비스매니저에게 전달할 내용을 입력해 주세요.(최소 10자 이상)"
          variant="outlined"
          multiline
          minRows={5}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          sx={{ fontSize: 20 }}
          inputProps={{ style: { fontSize: 20 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ fontSize: 14, color: "#aaa" }}
              >
                {detail.length} / 1000
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="flex flex-col gap-3 mx-[20px] mt-5">
        <h3 className="text-xl font-extrabold">개인정보 수집 및 이용 동의</h3>
        <label className="flex gap-2 items-start">
          <input
            type="checkbox"
            checked={privacyAgreement}
            onChange={(e) => setPrivacyAgreement(e.target.checked)}
            className="mt-1"
          />
          <span className="text-base">
            개인정보 수집 및 이용에 동의합니다. (필수)
          </span>
        </label>
      </div>
      <div className="flex justify-center gap-2 pt-20 py-60">
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
          disabled={isSubmitting}
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
            backgroundColor: isFormValid ? "#A3B1C6" : "#e5e7eb",
            color: isFormValid ? "#fff" : "#a3a3a3",
            cursor: isFormValid ? "pointer" : "not-allowed",
            "&:hover": {
              backgroundColor: isFormValid ? "#7F8B9B" : "#e5e7eb",
            },
            marginTop: "80px",
          }}
          className="self-center"
          onClick={handleComplete}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "처리 중..." : "작성 완료하기"}
        </Button>
      </div>
    </>
  );
};

export default Write;
