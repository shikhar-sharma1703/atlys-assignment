type Props = {
  label: string;
  className?: string;
};

const Badge = ({ label, className }: Props) => {
  return (
    <div
      className={`rounded-2xl px-2 py-1 text-xs font-semibold leading-3 w-full flex justify-center items-center min-h-[22px] ${className}`}
    >
      {label}
    </div>
  );
};

export default Badge;
