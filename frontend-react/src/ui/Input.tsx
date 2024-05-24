import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export default function Input<T extends FieldValues>({
  name,
  label,
  icon,
  placeholder,
  type,
  register,
  errors,
}: InputProps<T>) {
  const error = errors[name] as FieldError | undefined;

  return (
    <div>
      <label className="mb-2 block text-sm font-medium leading-none text-gray-500">
        {label}
      </label>
      <div>
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                {icon}
              </span>
            </div>
          )}
          <input
            {...register(name)}
            type={type}
            placeholder={placeholder}
            className="h-11 min-h-12 w-full appearance-none rounded-md border border-gray-200 bg-white py-2 pl-10 text-sm opacity-75 transition duration-200 ease-in-out focus:border-primary-600 focus:outline-none focus:ring-0 md:h-12"
          />
        </div>
        {error && (
          <small className="text-sm text-red-500">{error.message}</small>
        )}
      </div>
    </div>
  );
}
