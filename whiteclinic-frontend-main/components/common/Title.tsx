interface TitleProps {
  text: string;
  subtitle?: string; // 선택적 props
}

const Title = ({ text, subtitle }: TitleProps) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-extrabold text-3xl mb-3">{text}</h1>
      {subtitle && <span className="font- text-lg">{subtitle}</span>}
    </div>
  );
};

export default Title;
