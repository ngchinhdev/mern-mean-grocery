import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface SelectOptionProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: { opt: string; value: string; isDefault: boolean }[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
}

export default function SelectOption<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  options,
}: SelectOptionProps<T>) {
  const error = errors[name] as FieldError | undefined;

  return (
    <div className="w-full">
      <label
        className="mb-2 block text-sm font-medium leading-none text-gray-500"
        htmlFor={name + "Input"}
      >
        {label}
      </label>
      <div>
        <div className="relative">
          <select
            className="h-12 w-full rounded-lg border border-gray-200 px-5 py-3 text-gray-400 focus:outline-primary-600"
            id={name + "Input"}
            {...register(name)}
          >
            {options.map((opt) => (
              <option value={opt.value} selected={opt.isDefault}>
                {opt.opt}
              </option>
            ))}
          </select>
          {error && (
            <small className="text-sm text-red-500">{error.message}</small>
          )}
        </div>
      </div>
    </div>
  );
}
