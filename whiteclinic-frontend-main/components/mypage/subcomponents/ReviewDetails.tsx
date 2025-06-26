import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Review {
  review_id: number;
  title: string;
  content: string;
  created_at: string;
  views: number;
  likes: number;
}

const ReviewDetails = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortType, setSortType] = useState<"latest" | "views" | "likes">("latest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pageSize = 5;

  const fetchReviews = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      console.log("리뷰 내역 조회 토큰:", token);

      const response = await fetch("/api/reviews/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("리뷰 내역 응답 상태:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("리뷰 내역 전체 응답:", data);
        console.log("리뷰 내역 data 필드:", data.data);
        
        // TransformInterceptor 응답 형식에 맞게 처리
        if (data && data.success && data.data) {
          if (Array.isArray(data.data)) {
            console.log("배열로 설정:", data.data);
            setReviews(data.data);
          } else if (typeof data.data === 'object' && !Array.isArray(data.data)) {
            // 객체로 변환된 배열을 다시 배열로 변환
            const reviewArray = Object.values(data.data) as Review[];
            console.log("객체를 배열로 변환:", reviewArray);
            setReviews(reviewArray);
          } else {
            console.warn("예상하지 못한 응답 형식:", data);
            setReviews([]);
          }
        } else {
          console.warn("응답에 data 필드가 없습니다:", data);
          setReviews([]);
        }
      } else {
        const errorData = await response.json();
        console.error("리뷰 내역 에러:", errorData);
        setError("리뷰 내역을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("리뷰 내역 조회 오류:", error);
      setError("리뷰 내역을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // 정렬된 리스트 만들기
  const sortedReviews = (reviews || [])
    .sort((a, b) => {
      if (sortType === "latest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortType === "views") {
        return b.views - a.views;
      } else {
        return b.likes - a.likes;
      }
    });

  const totalPages = Math.ceil(sortedReviews.length / pageSize);
  const pagedReviews = sortedReviews.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading) {
    return (
      <div className="pt-20 pb-10">
        <h2 className="mb-2 text-2xl font-bold text-center">리뷰 내역</h2>
        <div className="flex justify-center items-center h-40">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 pb-10">
        <h2 className="mb-2 text-2xl font-bold text-center">리뷰 내역</h2>
        <div className="flex justify-center items-center h-40">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10">
      <h2 className="mb-2 text-2xl font-bold text-center">리뷰 내역</h2>
      <div className="w-full mx-auto max-w-7xl ">
        <div className="flex justify-between">
          <div className="flex font-bold">
            <div className="mr-1">전체</div>
            <div className="text-red-500">{sortedReviews.length}</div>
            <div>건</div>
          </div>

          <select
            className="px-2 py-1"
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value as "latest" | "views" | "likes")
            }
          >
            <option value="latest">최신순</option>
            <option value="views">조회순</option>
            <option value="likes">좋아요순</option>
          </select>
        </div>
        <table className="w-full mt-2">
          <thead>
            <tr className="font-bold text-gray-500 bg-gray-100 border-gray-400 border-t-1">
              <th className="px-4 py-4 w-1/2 min-w-[240px]">제목</th>
              <th className="w-1/6 px-4 py-4">등록일</th>
              <th className="w-1/6 px-4 py-4">좋아요수</th>
              <th className="w-1/6 px-4 py-4">조회수</th>
            </tr>
          </thead>
          <tbody>
            {pagedReviews.length > 0 ? (
              pagedReviews.map((review) => (
                <tr key={review.review_id} className="border-gray-200 border-b-1">
                  <td className="px-5 py-4 pl-6 font-bold w-1/2 min-w-[240px]">
                    {review.title}
                  </td>
                  <td className="w-1/6 px-5 py-4 text-center">
                    {new Date(review.created_at).toLocaleDateString()}
                  </td>
                  <td className="w-1/6 px-5 py-4 text-center">{review.likes}</td>
                  <td className="w-1/6 px-5 py-4 text-center">{review.views}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-gray-500">
                  리뷰 내역이 없습니다.
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

export default ReviewDetails;
