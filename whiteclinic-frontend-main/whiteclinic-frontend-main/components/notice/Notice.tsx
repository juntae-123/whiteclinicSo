"use client";

import { useEffect, useState, useRef } from "react";
import Title from "../common/Title";

const Feedback = () => {
  // 예시 데이터
  const notices = [
    {
      id: 1,
      title: "화이트크리닝 오픈 안내",
      date: "2024-05-01",
      views: 120,
    },
    {
      id: 2,
      title: "5월 이벤트 공지",
      date: "2024-05-10",
      views: 98,
    },
    {
      id: 3,
      title: "진료시간 변경 안내",
      date: "2024-05-15",
      views: 75,
    },
    {
      id: 4,
      title: "화이트크리닝 오픈 안내",
      date: "2024-05-02",
      views: 120,
    },
    {
      id: 5,
      title: "5월 이벤트 공지",
      date: "2024-05-12",
      views: 98,
    },
    {
      id: 6,
      title: "진료시간 변경 안내",
      date: "2024-05-16",
      views: 75,
    },
    {
      id: 7,
      title: "화이트크리닝 오픈 안내",
      date: "2024-05-03",
      views: 120,
    },
    {
      id: 8,
      title: "5월 이벤트 공지",
      date: "2024-05-15",
      views: 98,
    },
    {
      id: 9,
      title: "진료시간 변경 안내",
      date: "2024-05-19",
      views: 75,
    },
    {
      id: 10,
      title: "화이트크리닝 오픈 안내",
      date: "2024-05-06",
      views: 120,
    },
    {
      id: 11,
      title: "5월 이벤트 공지",
      date: "2024-05-17",
      views: 98,
    },
    {
      id: 12,
      title: "진료시간 변경 안내",
      date: "2024-05-20",
      views: 75,
    },
    {
      id: 13,
      title: "화이트크리닝 오픈 안내",
      date: "2024-06-01",
      views: 120,
    },
    {
      id: 14,
      title: "5월 이벤트 공지",
      date: "2024-06-10",
      views: 98,
    },
    {
      id: 15,
      title: "진료시간 변경 안내",
      date: "2024-06-15",
      views: 75,
    },
    {
      id: 16,
      title: "화이트크리닝 오픈 안내",
      date: "2024-08-01",
      views: 120,
    },
    {
      id: 17,
      title: "5월 이벤트 공지",
      date: "2024-08-10",
      views: 98,
    },
    {
      id: 18,
      title: "진료시간 변경 안내",
      date: "2024-08-15",
      views: 75,
    },
  ];

  const [sortType, setSortType] = useState<"latest" | "views">("latest");
  const [page, setPage] = useState(1);
  const pageSize = 15;

  // 정렬된 리스트 만들기
  const sortedNotices = [...notices].sort((a, b) => {
    if (sortType === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.views - a.views;
    }
  });

  const totalPages = Math.ceil(sortedNotices.length / pageSize);
  const pagedNotices = sortedNotices.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="flex items-center justify-center pt-10 pb-50">
      <section
        ref={sectionRef}
        className="flex flex-col items-center w-full gap-10"
      >
        <Title text="공지사항" subtitle="화이트크리닝의 새로운 소식" />

        <div className="w-full mx-auto max-w-7xl ">
          <div className="flex justify-between mt-10">
            <div className="flex text-lg font-bold">
              <div className="mr-1">전체</div>
              <div className="text-red-500">{notices.length}</div>
              <div>건</div>
            </div>

            <select
              className="px-2 py-1 text-lg "
              // border-1 border-gray-300 rounded-sm
              value={sortType}
              onChange={(e) =>
                setSortType(e.target.value as "latest" | "views")
              }
            >
              <option value="latest">최신순</option>
              <option value="views">조회순</option>
            </select>
          </div>
          <table className="w-full mt-6">
            <thead>
              <tr className="font-bold text-gray-500 bg-gray-100 border-gray-400 border-t-1">
                <th className="px-4 py-4 w-1/2 min-w-[240px]">제목</th>
                <th className="w-1/6 px-4 py-4">등록일</th>
                <th className="w-1/6 px-4 py-4">조회수</th>
              </tr>
            </thead>
            <tbody>
              {pagedNotices.map((notice) => (
                <tr key={notice.id} className="border-gray-200 border-b-1">
                  <td className="px-5 py-4 pl-6 font-bold w-1/2 min-w-[240px]">
                    {notice.title}
                  </td>
                  <td className="w-1/6 px-5 py-4 text-center">{notice.date}</td>
                  <td className="w-1/6 px-5 py-4 text-center">
                    {notice.views}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-20">
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
                      onClick={() => startPage - 1}
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
                      onClick={() => endPage + 1}
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
      </section>
    </div>
  );
};

export default Feedback;
