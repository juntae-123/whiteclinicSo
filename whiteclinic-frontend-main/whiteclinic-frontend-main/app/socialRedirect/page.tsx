import { Suspense } from "react";
import SocialRedirect from "@/components/login/social-redirect";

const SignupPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SocialRedirect />
    </Suspense>
  );
};

export default SignupPage;
