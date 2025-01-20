import Image from "next/image";

type Props = {
  value: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
};

const Select = ({ label, disabled, options, value }: Props) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor="select"
          className="block font-medium text-xs leading-3 mb-1"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id="select"
          value={value}
          disabled={disabled}
          className="border block min-h-8 border-gray-20 text-gray-40 rounded-lg px-3 py-2 disabled:bg-neutral-100 w-full font-medium text-xs leading-3 appearance-none"
        >
          {!options.length ? (
            <option>-</option>
          ) : (
            options.map((opt, index) => (
              <option key={index}>{opt.label}</option>
            ))
          )}
        </select>
        <Image
          width={14}
          height={14}
          alt="chevron-down"
          src="/chevron-down.svg"
          className="absolute top-0 h-full right-2 flex items-center pointer-events-none"
        />
      </div>
    </div>
  );
};

export default Select;
