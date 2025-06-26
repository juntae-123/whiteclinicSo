"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Inquiry {
  inquiry_id: number;
  service_type: string;
  content: string;
  created_at: string;
  status: string;
}

const InquiryDetails = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [sortType, setSortType] = useState<"latest" | "wait" | "complete">("latest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pageSize = 5;

  const fetchInquiries = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      console.log("문의 내역 조회 토큰:", token);

      const response = await fetch("/api/inquiries/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("문의 내역 응답 상태:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("문의 내역 전체 응답:", data);
        console.log("문의 내역 data 필드:", data.data);
        console.log("문의 내역 data 타입:", typeof data.data);
        console.log("문의 내역 data가 배열인가:", Array.isArray(data.data));
        
        // TransformInterceptor 응답 형식에 맞게 처리
        if (data && data.success && data.data) {
          if (Array.isArray(data.data)) {
            console.log("배열로 설정:", data.data);
            setInquiries(data.data);
          } else if (Array.isArray(data.data.inquiries)) {
            console.log("inquiries 배열로 설정:", data.data.inquiries);
            setInquiries(data.data.inquiries);
          } else if (typeof data.data === 'object' && !Array.isArray(data.data)) {
            // 객체로 변환된 배열을 다시 배열로 변환
            const inquiryArray = Object.values(data.data) as Inquiry[];
            console.log("객체를 배열로 변환:", inquiryArray);
            setInquiries(inquiryArray);
          } else {
            console.warn("예상하지 못한 응답 형식:", data);
            setInquiries([]);
          }
        } else {
          console.warn("응답에 data 필드가 없습니다:", data);
          setInquiries([]);
        }
      } else {
        const errorData = await response.json();
        console.error("문의 내역 에러:", errorData);
        setError("문의 내역을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("문의 내역 조회 오류:", error);
      setError("문의 내역을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // 정렬된 리스트 만들기
  const sortedInquiries = (inquiries || [])
    .filter((inquiry) => {
      if (sortType === "wait") return inquiry.status === "대기";
      if (sortType === "complete") return inquiry.status === "완료";
      return true;
    })
    .sort((a, b) => {
      if (sortType === "latest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return 0;
    });

  const totalPages = Math.ceil(sortedInquiries.length / pageSize);
  const pagedInquiries = sortedInquiries.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading) {
    return (
      <div className="pt-20 pb-10">
        <h2 className="mb-2 text-2xl font-bold text-center">문의 내역</h2>
        <div className="flex justify-center items-center h-40">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 pb-10">
        <h2 className="mb-2 text-2xl font-bold text-center">문의 내역</h2>
        <div className="flex justify-center items-center h-40">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10">
      <h2 className="mb-2 text-2xl font-bold text-center">문의 내역</h2>
      <div className="w-full mx-auto max-w-7xl ">
        <div className="flex justify-between">
          <div className="flex font-bold">
            <div className="mr-1">전체</div>
            <div className="text-red-500">{sortedInquiries.length}</div>
            <div>건</div>
          </div>

          <select
            className="px-2 py-1"
            value={sortType}
            onChange={(e) => {
              setSortType(e.target.value as "latest" | "wait" | "complete");
              setPage(1);
            }}
          >
            <option value="latest">최신순</option>
            <option value="wait">대기</option>
            <option value="complete">완료</option>
          </select>
        </div>
        <table className="w-full mt-2">
          <thead>
            <tr className="font-bold text-gray-500 bg-gray-100 border-gray-400 border-t-1">
              <th className="w-1/2 px-4 py-4">내용</th>
              <th className="w-1/6 px-4 py-4">등록일</th>
              <th className="w-1/6 px-4 py-4">처리상태</th>
            </tr>
          </thead>
          <tbody>
            {pagedInquiries.length > 0 ? (
              pagedInquiries.map((inquiry) => (
                <tr key={inquiry.inquiry_id} className="border-gray-200 border-b-1">
                  <td className="w-4/6 px-5 py-4 pl-6 font-bold">
                    {inquiry.content.length > 50 
                      ? `${inquiry.content.substring(0, 50)}...` 
                      : inquiry.content}
                  </td>
                  <td className="w-1/6 px-5 py-4 text-center">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="w-1/6 px-5 py-4 text-center">{inquiry.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-gray-500">
                  문의 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {/* 맨 앞으로 */}
            <button
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
                    key={i}
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

export default InquiryDetails;
