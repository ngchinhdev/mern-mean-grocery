import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineEmail } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "src/store/store";
import { AuthFormType, authFormTexts } from "src/constants/constants";
import { setCurrentFormActive, setIsLogged } from "src/store/auth/authSlice";
import { createUser, forgotPassword, loginUser } from "src/services/apiAuth";
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
import {
  ICreateUser,
  IForgotPassword,
  ILoginUser,
  IResponseLogin,
} from "src/interfaces/auth";
import { type IResponseDataCommon } from "src/interfaces/share";
import { toastUI } from "src/utils/toast";
import { setLocalStorage } from "src/utils/helpers";

interface CurrentFormFields {
  [AuthFormType.LOGIN]: FormLoginFields;
  [AuthFormType.REGISTER]: FormRegisterFields;
  [AuthFormType.FORGOT_PASSWORD]: FormForgotPasswordFields;
}

interface FormProps {
  onCloseForm: () => void;
}

export default function Form({ onCloseForm }: FormProps) {
  const { currentFormActive } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

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

  const registerMutation = useMutation<
    IResponseDataCommon<ICreateUser>,
    Error,
    ICreateUser
  >({
    mutationFn: (data) => createUser(data),
    onSuccess(data, variables, context) {
      console.log(data, variables, context);
    },
    onError(error, variables, context) {
      console.log(error, variables, context);
    },
  });

  const loginMutation = useMutation<
    IResponseDataCommon<IResponseLogin>,
    AxiosError,
    ILoginUser
  >({
    mutationFn: (data) => loginUser(data),
    onSuccess(data) {
      dispatch(setIsLogged());
      setLocalStorage("accessTokenReact", data.data.accessToken);
      toastUI("Login successfully", "success");
      navigate("/user/information");
      onCloseForm();
    },
    onError(error) {
      if (error.response?.status === 400) {
        toastUI("Email or password incorrect!", "error");
      }
    },
  });

  const forgotPasswordMutation = useMutation<
    IResponseDataCommon<unknown>,
    AxiosError,
    IForgotPassword
  >({
    mutationFn: (data) => forgotPassword(data),
    onSuccess() {
      toastUI("Please check your email for new password.", "success");
      onCloseForm();
    },
    onError(error) {
      if (error.response?.status === 404) {
        toastUI("Email not found!", "error");
      } else {
        toastUI(error.message, "error");
      }
    },
  });

  const onSubmit = async (
    data: CurrentFormFields[typeof currentFormActive],
  ) => {
    if (currentFormActive === AuthFormType.REGISTER) {
      registerMutation.mutate(data as FormRegisterFields);
    }

    if (currentFormActive === AuthFormType.LOGIN) {
      loginMutation.mutate(data as FormLoginFields);
    }

    if (currentFormActive === AuthFormType.FORGOT_PASSWORD) {
      forgotPasswordMutation.mutate(data);
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

  const handleGoogleAuth = () => {
    try {
      window.location.href =
        "http://localhost:3500/api/v1/auth/google/callback";
    } catch (err) {
      console.log(err);
    }
  };

  const handleFacebookAuth = () => {
    try {
      window.location.href = "http://localhost:3500/api/v1/auth/facebook";
    } catch (err) {
      console.log(err);
    }
  };

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
                autocomplete="current-password"
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
            imageIcon="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
            imageAlt="Google Icon"
            onClick={handleGoogleAuth}
          >
            Login with Google
          </ButtonSocial>
          <ButtonSocial
            imageIcon="https://img.icons8.com/?size=100&id=yGcWL8copNNQ&format=png&color=000000"
            imageAlt="Facebook Icon"
            onClick={handleFacebookAuth}
          >
            Login with Facebook
          </ButtonSocial>
        </div>
        <div className="mt-4 text-center text-sm text-gray-900">
          <div className="mt-2.5 text-gray-500">
            {authFormTexts[currentFormActive].link}
            <button
              type="button"
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
