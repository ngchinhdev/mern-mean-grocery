import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormType, authFormTexts } from "src/constants/constants";
import { setCurrentFormActive } from "src/store/auth/authSlice";
import { MdOutlineEmail } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { createUser, loginUser } from "src/services/apiAuth";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required!").trim(),
  email: z
    .string()
    .min(1, "Email is required!")
    .email("Invalid email address!")
    .trim(),
  password: z.string().min(6, "Password must be at least 6 characters!").trim(),
});
const loginSchema = registerSchema.omit({ name: true });
const forgotPasswordSchema = loginSchema.pick({ email: true });

type FormRegisterFields = z.infer<typeof registerSchema>;
type FormLoginFields = z.infer<typeof loginSchema>;
type FormForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;

interface CurrentFormFields {
  [AuthFormType.LOGIN]: FormLoginFields;
  [AuthFormType.REGISTER]: FormRegisterFields;
  [AuthFormType.FORGOT_PASSWORD]: FormForgotPasswordFields;
}

export default function Form() {
  const { currentFormActive } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const schema =
    currentFormActive === AuthFormType.REGISTER
      ? registerSchema
      : currentFormActive === AuthFormType.LOGIN
        ? loginSchema
        : forgotPasswordSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CurrentFormFields[typeof currentFormActive]>({
    resolver: zodResolver(schema),
  });

  const isNotForgotPasswordForm =
    currentFormActive !== AuthFormType.FORGOT_PASSWORD;

  const onSubmit = async (
    data: CurrentFormFields[typeof currentFormActive],
  ) => {
    if (currentFormActive === AuthFormType.REGISTER) {
      console.log(data, errors);
      await createUser(data as FormRegisterFields);
    }

    if (currentFormActive === AuthFormType.LOGIN) {
      await loginUser(data as FormLoginFields);
    }

    if (currentFormActive === AuthFormType.FORGOT_PASSWORD) {
      console.log(data);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setCurrentFormActive(AuthFormType.LOGIN));
    };
  }, [dispatch]);

  useEffect(() => {
    reset();
  }, [currentFormActive, reset]);

  return (
    <div className="inline-block w-full max-w-lg scale-100 transform overflow-hidden rounded-2xl bg-white text-left align-middle opacity-100 transition-all">
      <div className="mx-auto overflow-hidden bg-white">
        <div className="mb-6 text-center">
          <h2 className=" text-3xl font-bold">
            {authFormTexts[currentFormActive].title}
          </h2>
          <p className="mb-8 mt-2 text-sm text-gray-500 sm:mb-10 md:text-base">
            {authFormTexts[currentFormActive].paragraph}
          </p>
        </div>
        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-5">
            {currentFormActive === AuthFormType.REGISTER &&
              isNotForgotPasswordForm && (
                <div className="form-group">
                  <label className="mb-2 block text-sm font-medium leading-none text-gray-500">
                    Full Name
                  </label>
                  <div>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                          <FiUser className="text-lg" />
                        </span>
                      </div>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Your full name"
                        className="text-input placeholder-body h-11 min-h-12 w-full appearance-none rounded-md border border-gray-200 bg-white py-2 pl-10 text-sm opacity-75 transition duration-200 ease-in-out focus:border-primary-600 focus:outline-none focus:ring-0 md:h-12"
                      />
                    </div>
                    {"name" in errors && errors.name && (
                      <small className="text-sm text-red-500">
                        {errors.name.message}
                      </small>
                    )}
                  </div>
                </div>
              )}
            <div className="form-group">
              <label className="mb-2 block text-sm font-medium leading-none text-gray-500">
                Email
              </label>
              <div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                      <MdOutlineEmail className="text-lg" />
                    </span>
                  </div>
                  <input
                    {...register("email")}
                    placeholder="Email"
                    className="text-input placeholder-body h-11 min-h-12 w-full appearance-none rounded-md border border-gray-200 bg-white py-2 pl-10 text-sm opacity-75 transition duration-200 ease-in-out focus:border-primary-600 focus:outline-none focus:ring-0 md:h-12"
                  />
                </div>
                {errors.email && (
                  <small className="text-sm text-red-500">
                    {errors.email.message}
                  </small>
                )}
              </div>
            </div>
            {isNotForgotPasswordForm && (
              <div className="form-group">
                <label className="mb-2 block text-sm font-medium leading-none text-gray-500">
                  Password
                </label>
                <div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                        <RiLock2Line className="text-lg" />
                      </span>
                    </div>
                    <input
                      {...register("password")}
                      type="password"
                      placeholder="Password"
                      className="text-input placeholder-body h-11 min-h-12 w-full appearance-none rounded-md border border-gray-200 bg-white py-2 pl-10 text-sm opacity-75 transition duration-200 ease-in-out focus:border-primary-600 focus:outline-none focus:ring-0 md:h-12"
                    />
                  </div>
                  {"password" in errors && errors.password && (
                    <small className="text-sm text-red-500">
                      {errors.password.message}
                    </small>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="ms-auto flex">
                <button
                  type="button"
                  className="text-heading ps-3 text-end text-sm underline hover:no-underline focus:outline-none"
                  onClick={() =>
                    dispatch(setCurrentFormActive(AuthFormType.FORGOT_PASSWORD))
                  }
                >
                  Forgot password?
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="my-1 w-full rounded bg-primary-600 py-3 text-center text-white transition-all hover:bg-primary-700 focus:outline-none"
            >
              {authFormTexts[currentFormActive].button}
            </button>
          </div>
        </form>
        <div className="fo10t-sans my-3 text-center font-medium before:bg-gray-100 after:bg-gray-100">
          OR
        </div>
        <div className="flex flex-col justify-between gap-3 lg:flex-row">
          <div
            className="w-full text-nowrap rounded bg-gray-100 px-5 py-3 text-center text-base text-gray-900 transition-all hover:bg-gray-200 focus:outline-none"
            role="button"
          >
            <FaFacebookF className="me-2 inline-block text-sm text-blue-900" />
            Login with Facebook
          </div>
          <div
            className="w-full text-nowrap rounded bg-gray-100 px-5 py-3 text-center text-gray-900 transition-all hover:bg-gray-200 focus:outline-none"
            role="button"
          >
            <FaGoogle className="me-2 inline-block text-sm text-gray-900" />
            Login with Google
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-900">
          <div className="mt-2.5 text-gray-500">
            {authFormTexts[currentFormActive].link}
            <button
              disabled={isSubmitting}
              type="submit"
              className="mx-2 font-bold text-gray-800 hover:text-primary-600"
              onClick={() =>
                dispatch(
                  setCurrentFormActive(authFormTexts[currentFormActive].linkTo),
                )
              }
            >
              {isSubmitting
                ? "Processing..."
                : authFormTexts[currentFormActive].linkTo}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
