import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface PostButtonProps {
  url: string;
  children?: React.ReactNode;
}

const PostButton = ({ url, children }: PostButtonProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between w-full px-10 py-5 mb-5 bg-gray-100 rounded-xl">
      <span className="text-base font-bold">
        {children ?? (
          <>
            이용하신 서비스는 어떠셨나요? <br /> 감동이 있었다면 마음을 담아
            리뷰로 남겨주세요.
          </>
        )}
      </span>
      <Button
        variant="contained"
        sx={{
          marginTop: "0.3rem", // mt-2
          height: "2.5rem", // h-12
          paddingX: "2.5rem", // px-4 py-2
          fontWeight: "bold",
          fontSize: "15px", // text-lg
          borderRadius: "2rem", // rounded
          backgroundColor: "#101828",
          color: "#fff",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#8A9AB0",
            boxShadow: "none",
          },
          transition: "background-color 0.2s",
        }}
        onClick={() => router.push(url)}
      >
        글쓰기
      </Button>
    </div>
  );
};

export default PostButton;
