import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineEmail } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { FiUser } from "react-icons/fi";

import { AppDispatch, RootState } from "src/store/store";
import { AuthFormType, authFormTexts } from "src/constants/constants";
import { setCurrentFormActive } from "src/store/auth/authSlice";
import { createUser, loginUser } from "src/services/apiAuth";
import {
  FormForgotPasswordFields,
  FormLoginFields,
  FormRegisterFields,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from "src/zods/auth";
import Input from "src/ui/Input";
import ButtonSocial from "./ButtonSocial";

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
                <Input
                  name="name"
                  label="Name"
                  icon={<FiUser />}
                  placeholder="Name"
                  type="text"
                  register={register}
                  errors={errors}
                />
              )}
            <Input
              name="email"
              label="Email"
              icon={<MdOutlineEmail />}
              placeholder="Email"
              type="email"
              register={register}
              errors={errors}
            />
            {isNotForgotPasswordForm && (
              <Input
                name="password"
                label="Password"
                icon={<RiLock2Line />}
                placeholder="Password"
                type="password"
                register={register}
                errors={errors}
              />
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
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : authFormTexts[currentFormActive].button}
            </button>
          </div>
        </form>
        <div className="fo10t-sans my-3 text-center font-medium before:bg-gray-100 after:bg-gray-100">
          OR
        </div>
        <div className="flex flex-col justify-between gap-3 lg:flex-row">
          <ButtonSocial
            imageIcon="https://img.icons8.com/?size=100&id=yGcWL8copNNQ&format=png&color=000000"
            imageAlt="Google Icon"
          >
            Login with Google
          </ButtonSocial>
          <ButtonSocial
            imageIcon="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
            imageAlt="Facebook Icon"
          >
            Login with Facebook
          </ButtonSocial>
        </div>
        <div className="mt-4 text-center text-sm text-gray-900">
          <div className="mt-2.5 text-gray-500">
            {authFormTexts[currentFormActive].link}
            <button
              type="submit"
              className="mx-2 font-bold text-gray-800 hover:text-primary-600"
              onClick={() =>
                dispatch(
                  setCurrentFormActive(authFormTexts[currentFormActive].linkTo),
                )
              }
            >
              {authFormTexts[currentFormActive].linkTo}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
