"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Reservation {
  reservation_id: number;
  service_type: string;
  content: string;
  status: string;
  created_at: string | Date;
}

const ReservationDetails = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sortType, setSortType] = useState<"latest" | "aircon" | "washingMachine">("latest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pageSize = 5;

  const fetchReservations = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("토큰이 없습니다. 로그인 페이지로 이동합니다.");
        router.push("/login");
        return;
      }

      console.log("예약 내역 조회 시작 - 토큰:", token.substring(0, 20) + "...");

      const response = await fetch("/api/reservations/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("예약 내역 응답 상태:", response.status);
      console.log("예약 내역 응답 헤더:", response.headers);

      if (response.ok) {
        const data = await response.json();
        console.log("예약 내역 전체 응답:", data);
        console.log("예약 내역 data 필드 타입:", typeof data.data);
        console.log("예약 내역 data 필드:", data.data);

        let reservationArray: Reservation[] = [];
        
        if (data && data.data) {
          if (Array.isArray(data.data)) {
            console.log("배열로 설정:", data.data);
            reservationArray = data.data;
          } else if (typeof data.data === 'object' && !Array.isArray(data.data)) {
            // 객체로 변환된 배열을 다시 배열로 변환
            console.log("객체를 배열로 변환:", data.data);
            
            // data.data가 또 다시 {success: true, data: Array} 형태인지 확인
            if (data.data.success && data.data.data && Array.isArray(data.data.data)) {
              console.log("이중 data 구조 감지:", data.data.data);
              reservationArray = data.data.data as Reservation[];
            } else {
              reservationArray = Object.values(data.data) as Reservation[];
            }
          } else {
            console.warn("예상하지 못한 응답 형식:", data);
            reservationArray = [];
          }
        } else if (Array.isArray(data)) {
          // 백엔드에서 직접 배열을 반환하는 경우
          console.log("직접 배열 응답:", data);
          console.log("배열 길이:", data.length);
          console.log("첫 번째 요소:", data[0]);
          console.log("두 번째 요소:", data[1]);
          console.log("두 번째 요소 타입:", typeof data[1]);
          console.log("두 번째 요소가 배열인가:", Array.isArray(data[1]));
          
          if (data.length === 2 && data[0] === true && Array.isArray(data[1])) {
            // [true, [예약데이터]] 형태
            console.log("이중 배열 구조 감지:", data[1]);
            reservationArray = data[1] as Reservation[];
            console.log("추출된 예약 배열:", reservationArray);
            console.log("추출된 배열 길이:", reservationArray.length);
          } else if (data.length > 0 && typeof data[0] === 'object') {
            // 직접 예약 객체 배열
            reservationArray = data as Reservation[];
          } else {
            console.warn("예상하지 못한 배열 구조:", data);
            reservationArray = [];
          }
        } else {
          console.warn("응답에 data 필드가 없습니다:", data);
          reservationArray = [];
        }

        console.log("최종 예약 배열:", reservationArray);
        console.log("예약 배열 길이:", reservationArray.length);
        
        if (reservationArray.length > 0) {
          console.log("첫 번째 예약 데이터:", reservationArray[0]);
        }
        
        setReservations(reservationArray);
      } else {
        const errorText = await response.text();
        console.error("예약 내역 조회 실패:", response.status, errorText);
        setError("예약 내역을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("예약 내역 조회 오류:", error);
      setError("예약 내역을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // 날짜 포맷팅 함수
  const formatDate = (dateValue: string | Date): string => {
    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        return "날짜 없음";
      }
      return date.toLocaleDateString('ko-KR');
    } catch (error) {
      console.error("날짜 파싱 오류:", error, dateValue);
      return "날짜 오류";
    }
  };

  // 정렬된 예약 목록
  const sortedReservations = reservations
    .filter((reservation) => {
      if (sortType === "aircon") return reservation.service_type === "에어컨";
      if (sortType === "washingMachine") return reservation.service_type === "세탁기";
      return true;
    })
    .sort((a, b) => {
      if (sortType === "latest") {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

  const totalPages = Math.ceil(sortedReservations.length / pageSize);
  const pagedReservations = sortedReservations.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading) {
    return (
      <div className="pt-20 pb-10">
        <h2 className="mb-2 text-2xl font-bold text-center">예약 내역</h2>
        <div className="flex justify-center items-center h-40">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 pb-10">
        <h2 className="mb-2 text-2xl font-bold text-center">예약 내역</h2>
        <div className="flex justify-center items-center h-40">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10">
      <h2 className="mb-2 text-2xl font-bold text-center">예약 내역</h2>
      <div className="w-full mx-auto max-w-7xl ">
        <div className="flex justify-between">
          <div className="flex font-bold">
            <div className="mr-1">전체</div>
            <div className="text-red-500">{sortedReservations.length}</div>
            <div>건</div>
          </div>

          <select
            className="px-2 py-1"
            value={sortType}
            onChange={(e) => {
              setSortType(e.target.value as "latest" | "aircon" | "washingMachine");
              setPage(1);
            }}
          >
            <option value="latest">최신순</option>
            <option value="aircon">에어컨</option>
            <option value="washingMachine">세탁기</option>
          </select>
        </div>
        <table className="w-full mt-2">
          <thead>
            <tr className="font-bold text-gray-500 bg-gray-100 border-gray-400 border-t-1">
              <th className="w-1/6 px-4 py-4">예약 종류</th>
              <th className="w-2/6 px-4 py-4">예약 일시</th>
              <th className="w-2/6 px-4 py-4">내용</th>
              <th className="w-1/6 px-4 py-4">진행 상황</th>
            </tr>
          </thead>
          <tbody>
            {pagedReservations.length > 0 ? (
              pagedReservations.map((reservation) => (
                <tr key={reservation.reservation_id} className="border-gray-200 border-b-1">
                  <td className="w-1/6 px-5 py-4 font-bold text-center">
                    {reservation.service_type}
                  </td>
                  <td className="w-2/6 px-5 py-4 text-center">
                    {formatDate(reservation.created_at)}
                  </td>
                  <td className="w-2/6 px-5 py-4 text-center">
                    {reservation.content || "내용 없음"}
                  </td>
                  <td className="w-1/6 px-5 py-4 text-center">
                    {reservation.status === 'pending' ? '대기중' :
                     reservation.status === 'confirmed' ? '확정' :
                     reservation.status === 'completed' ? '완료' :
                     reservation.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-gray-500">
                  예약 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {/* 맨 앞으로 */}
            <button
              key="first"
              className="w-8 h-8 text-gray-700 bg-gray-200 rounded"
              disabled={page === 1}
              onClick={() => setPage(1)}
            >
              {"<<"}
            </button>

            {/* 페이지 버튼 그룹 */}
            {(() => {
              const pageButtons = [];
              const groupSize = 10;
              const currentGroup = Math.floor((page - 1) / groupSize);
              const startPage = currentGroup * groupSize + 1;
              const endPage = Math.min(startPage + groupSize - 1, totalPages);

              // ... 앞 그룹 더보기
              if (startPage > 1) {
                pageButtons.push(
                  <button
                    key="prev-ellipsis"
                    className="w-8 h-8 text-gray-700 bg-gray-200 rounded"
                    onClick={() => setPage(startPage - 1)}
                  >
                    ...
                  </button>
                );
              }

              // 실제 페이지 버튼
              for (let i = startPage; i <= endPage; i++) {
                pageButtons.push(
                  <button
                    key={`page-${i}`}
                    className={`w-8 h-8 rounded ${
                      page === i
                        ? "bg-[#7D8A99] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setPage(i)}
                  >
                    {i}
                  </button>
                );
              }

              // ... 다음 그룹 더보기
              if (endPage < totalPages) {
                pageButtons.push(
                  <button
                    key="next-ellipsis"
                    className="w-8 h-8 text-gray-700 bg-gray-200 rounded"
                    onClick={() => setPage(endPage + 1)}
                  >
                    ...
                  </button>
                );
              }

              return pageButtons;
            })()}

            {/* 맨 뒤로 */}
            <button
              key="last"
              className="w-8 h-8 text-gray-700 bg-gray-200 rounded"
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              {">>"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationDetails;
