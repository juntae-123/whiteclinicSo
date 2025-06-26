# whiteclinic-frontend

> 💡 **LG전자 연계 프로젝트** - 화이트 클리닉 백엔드 레포지토리

## 📌 프로젝트 개요

화이트 클리닉은 **LG전자 가전 케어 서비스**를 참고하여 기획된 **프리미엄 청소 업체 웹사이트**입니다.  
본 레포지토리는 **NestJS**와 **MySQL**을 기반으로 개발된 **백엔드 API 서버**로, 예약, 문의, 리뷰 등 핵심 기능을 제공합니다.

---

## 🛠️ 기술 스택

| 분야          | 기술 스택                   |
| ------------- | --------------------------- |
| **Backend**   | NestJS, TypeScript, TypeORM |
| **Database**  | MySQL (DBeaver 사용)        |
| **환경 변수** | `.env` 파일로 관리          |

---

## 📂 프로젝트 구조

```
src/
├── app.module.ts             # 루트 모듈
├── main.ts                   # 애플리케이션 엔트리 포인트
├── config/                   # 환경설정 (ORM 설정 등)
├── transform/                # 인터셉터 및 공통 처리
├── modules/                  # 주요 기능 모듈
│   ├── auths/               # 인증 모듈 (회원가입, 로그인, 소셜 로그인 등)
│   ├── users/               # 사용자 정보 관리
│   ├── reviews/             # 리뷰 및 댓글 기능
│   ├── inquiries/           # 온라인 문의
│   ├── reservations/        # 예약 시스템
│   ├── notices/             # 공지사항
│   └── token-blacklists/    # 토큰 블랙리스트 처리
```

---

## 🔐 인증 및 보안

- JWT 기반 인증 (Access / Refresh Token)
- 소셜 로그인 지원 (Google, Kakao)
- 비밀번호 재설정, 이메일 찾기 기능
- HTTPOnly 쿠키를 통한 Refresh Token 관리
- Refresh Token 재발급 로직 구현
- 로그아웃 시 토큰 무효화 및 블랙리스트 처리

---

## 📡 주요 API 기능

| 기능 구분       | 주요 내용                                                 | 담당자      |
| --------------- | --------------------------------------------------------- | ----------- |
| **회원 인증**   | 회원가입, 로그인, 비밀번호 변경, 이메일 찾기, 소셜 로그인 | 은서        |
| **리뷰**        | CRUD, 좋아요, 조회수, 댓글 기능                           | 은서        |
| **문의**        | 온라인 문의 등록/조회, 우편번호 검색                      | 준태        |
| **공지사항**    | 관리자 전용 공지 등록 및 조회 기능                        | 준태        |
| **예약 시스템** | 예약 등록, 현황 조회, 관리자 페이지를 통한 예약 관리      | 준태        |
| **마이페이지**  | 내 예약/문의 (준태), 내 리뷰/회원 정보 수정 (은서)        | 준태 & 은서 |

---

## 🗃️ ERD / 데이터베이스

- [ERD 설계 바로가기](https://www.erdcloud.com/d/xNJ8moyMwLfthPcGp)
- [초기 SQL 문서 보기](https://www.notion.so/SQL-1f124cb4abc68038b011cea516c90392?pvs=21)

---

## 🔧 `.env` 파일 예시

```
# JWT 설정
JWT_SECRET=your_jwt_secret_key
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth 설정
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auths/login/google/redirect

# Kakao OAuth 설정
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
KAKAO_REDIRECT_URI=http://localhost:3001/api/auths/login/kakao/redirect

# 서버 포트
PORT=3001

# DB 설정
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_db_password
DB_DATABASE=whiteclinic
```
