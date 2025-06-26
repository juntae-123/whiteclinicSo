"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserInfo {
  user_id: number;
  user_email: string;
  user_name: string;
  phone_no: string;
}

const Information = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const router = useRouter();

  const inputStyle =
    "w-[210px] h-[40px] bg-white border border-gray-200 rounded-sm p-2";
  const divStyle = "w-[300px] flex items-center";
  const buttonStyle = "w-[100px] h-[40px] bg-[#7D8A99] text-white rounded-sm";

  const fetchUserInfo = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("토큰이 없습니다. 로그인 페이지로 이동합니다.");
        router.push("/login");
        return;
      }

      console.log("회원정보 조회 시작 - 토큰:", token.substring(0, 20) + "...");

      const response = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("회원정보 응답 상태:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("회원정보 전체 응답:", data);

        let userData: UserInfo | null = null;
        
        if (data && data.data) {
          if (typeof data.data === 'object' && !Array.isArray(data.data)) {
            // data.data가 객체인 경우
            if (data.data.data && typeof data.data.data === 'object') {
              // data.data.data 구조
              console.log("data.data.data 구조 감지:", data.data.data);
              userData = data.data.data as UserInfo;
            } else if (data.data.success && data.data.data) {
              // 이중 data 구조
              console.log("이중 data 구조 감지:", data.data.data);
              userData = data.data.data as UserInfo;
            } else {
              // 직접 user 객체
              userData = data.data as UserInfo;
            }
          } else if (Array.isArray(data.data) && data.data.length > 0) {
            // 배열인 경우 첫 번째 요소
            userData = data.data[0] as UserInfo;
          }
        } else if (Array.isArray(data) && data.length > 0) {
          // 직접 배열 응답
          if (data.length === 2 && data[0] === true && Array.isArray(data[1])) {
            // [true, [userData]] 형태
            userData = data[1][0] as UserInfo;
          } else {
            userData = data[0] as UserInfo;
          }
        }

        console.log("최종 회원정보:", userData);
        setUserInfo(userData);
      } else {
        const errorText = await response.text();
        console.error("회원정보 조회 실패:", response.status, errorText);
        setError("회원정보를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("회원정보 조회 오류:", error);
      setError("회원정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handlePasswordChange = async () => {
    if (!currentPassword.trim() || !newPassword.trim()) {
      alert("현재 비밀번호와 새 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (newPassword.length < 6) {
      alert("새 비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      const requestData = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      console.log("비밀번호 변경 요청:", requestData);

      const response = await fetch("/api/users/me/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log("비밀번호 변경 응답 상태:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("비밀번호 변경 성공:", result);
        alert("비밀번호가 성공적으로 변경되었습니다.");
        
        // 입력 필드 초기화
        setCurrentPassword("");
        setNewPassword("");
      } else {
        const errorData = await response.json();
        console.error("비밀번호 변경 실패:", errorData);
        alert(errorData.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleEditInfo = () => {
    if (isEditing) {
      // 편집 모드 종료
      setIsEditing(false);
      setEditName(userInfo?.user_name || "");
      setEditEmail(userInfo?.user_email || "");
      setEditPhone(userInfo?.phone_no || "");
    } else {
      // 편집 모드 시작
      setIsEditing(true);
      setEditName(userInfo?.user_name || "");
      setEditEmail(userInfo?.user_email || "");
      setEditPhone(userInfo?.phone_no || "");
    }
  };

  const handleUpdateInfo = async () => {
    if (!editName.trim() || !editEmail.trim() || !editPhone.trim()) {
      alert("이름, 이메일, 전화번호를 모두 입력해주세요.");
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmail)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    // 전화번호 형식 검증 (하이픈 없이 11자리)
    const phoneRegex = /^01[016789]\d{7,8}$/;
    if (!phoneRegex.test(editPhone)) {
      alert("올바른 전화번호 형식을 입력해주세요. (하이픈 없이 11자리)");
      return;
    }

    setIsUpdatingInfo(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      const requestData = {
        user_name: editName,
        user_email: editEmail,
        phone_no: editPhone,
      };

      console.log("정보수정 요청:", requestData);

      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log("정보수정 응답 상태:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("정보수정 성공:", result);
        alert("회원정보가 성공적으로 수정되었습니다.");
        
        // 회원정보 다시 조회
        await fetchUserInfo();
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        console.error("정보수정 실패:", errorData);
        alert(errorData.message || "정보수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("정보수정 오류:", error);
      alert("정보수정 중 오류가 발생했습니다.");
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  if (loading) {
    return (
      <div className="pb-10 ">
        <h2 className="mb-2 text-2xl font-bold">회원 정보</h2>
        <div className="flex justify-center bg-gray-100 rounded-lg py-15">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pb-10 ">
        <h2 className="mb-2 text-2xl font-bold">회원 정보</h2>
        <div className="flex justify-center bg-gray-100 rounded-lg py-15">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10 ">
      <h2 className="mb-2 text-2xl font-bold">회원 정보</h2>
      <div className="flex justify-center bg-gray-100 rounded-lg py-15">
        <div className="w-[900px] flex flex-col text-lg gap-5">
          <div className="flex items-start justify-between">
            <div className="w-[350px] flex items-center gap-5 bg-white border border-gray-200 rounded-sm p-4">
              <Image
                width={30}
                height={30}
                src="/images/icon.png"
                alt="아이콘"
              />
              <span className="font-bold">
                {userInfo?.phone_no ? userInfo.phone_no.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : '010****1234'}
              </span>
              <span className="text-gray-400">white clinic 회원</span>
            </div>
            <button className="text-red-500">회원 탈퇴</button>
          </div>

          <div className={divStyle}>
            <label className="w-[90px]" htmlFor="email">
              이메일
            </label>
            <input 
              className={inputStyle} 
              type="email" 
              value={isEditing ? editEmail : (userInfo?.user_email || '')} 
              onChange={isEditing ? (e) => setEditEmail(e.target.value) : undefined}
              readOnly={!isEditing}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-10">
              <div className={divStyle}>
                <label className="w-[90px]" htmlFor="name">
                  이름
                </label>
                <input 
                  className={inputStyle} 
                  type="text" 
                  value={isEditing ? editName : (userInfo?.user_name || '')} 
                  onChange={isEditing ? (e) => setEditName(e.target.value) : undefined}
                  readOnly={!isEditing}
                />
              </div>
              <div className={divStyle}>
                <label className="w-[90px]" htmlFor="phone">
                  전화번호
                </label>
                <input 
                  className={inputStyle} 
                  type="text" 
                  value={isEditing ? editPhone : (userInfo?.phone_no || '')} 
                  onChange={isEditing ? (e) => setEditPhone(e.target.value) : undefined}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <button className={buttonStyle} onClick={handleEditInfo}>
              {isEditing ? "취소" : "정보수정"}
            </button>
          </div>
          {isEditing && (
            <div className="flex justify-end">
              <button 
                className={buttonStyle}
                onClick={handleUpdateInfo}
                disabled={isUpdatingInfo}
              >
                {isUpdatingInfo ? "수정 중..." : "저장하기"}
              </button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex gap-10">
              <div className={divStyle}>
                <label className="w-[90px]" htmlFor="password">
                  비밀번호
                </label>
                <input 
                  className={inputStyle} 
                  type="password" 
                  placeholder="현재 비밀번호"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className={divStyle}>
                <label className="w-[90px]" htmlFor="newPassword">
                  새 비밀번호
                </label>
                <input 
                  className={inputStyle} 
                  type="password" 
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <button 
              className={buttonStyle}
              onClick={handlePasswordChange}
              disabled={isChangingPassword}
            >
              {isChangingPassword ? "변경 중..." : "변경하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
