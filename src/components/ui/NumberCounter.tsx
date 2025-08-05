import InputBox from "./InputBox";

type NumberCounterProps = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
  variant: "danger" | "warning" | "primary" | "success" | "secondary";
  setCounter?: (value: number) => void;
};
const variantClasses = {
  danger: "text-[#EC5959] bg-[#EC595912] border-[#EC5959] ",
  warning: "text-[#ECB659] bg-[#ECB65912] border-[#ECB659] ",
  primary: "text-[#5976EC] bg-[#5976EC12] border-[#5976EC] ",
  success: "text-[#24930F] bg-[#24930F12] border-[#24930F] ",
  secondary: "text-[#535353] bg-[#53535312] border-[#535353] ",
};

const defaultClasses =
  " text-lg rounded-md px-2.5 border hover:backdrop-brightness-50 hover:drop-shadow-2xl transition duration-300 flex items-center gap-2";

function NumberCounter({
  count,
  onIncrement,
  onDecrement,
  className,
  variant,
  setCounter,
}: NumberCounterProps) {
  return (
    <div
      className={`${className} ${variantClasses[variant]} ${defaultClasses}`}
    >
      <button
        onClick={onDecrement}
        className={`flex items-center justify-center w-4 h-2 border border-transparent rounded-md hover:border-opacity-50`}
      >
        -
      </button>
      <span>{count}</span>
      <button
        onClick={onIncrement}
        className={`flex items-center justify-center w-4 h-2 border border-transparent rounded-md hover:border-opacity-50`}
      >
        +
      </button>
    </div>
  );
}

export default NumberCounter;
