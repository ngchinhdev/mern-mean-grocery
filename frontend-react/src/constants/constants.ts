// Enums
export enum AuthFormType {
    LOGIN = "Login",
    REGISTER = "Register",
    FORGOT_PASSWORD = "Forgot Password"
}

// Constants
export const authFormTexts: Record<AuthFormType, { title: string; paragraph: string; button: string; link: string; linkTo: AuthFormType; }> = {
    [AuthFormType.LOGIN]: {
        title: "Login",
        paragraph: "Login with your email and password",
        button: "Login",
        link: "Don't have an account?",
        linkTo: AuthFormType.REGISTER
    },
    [AuthFormType.REGISTER]: {
        title: "Register",
        paragraph: "Register with your email and password",
        button: "Register",
        link: "Already have an account?",
        linkTo: AuthFormType.LOGIN
    },
    [AuthFormType.FORGOT_PASSWORD]: {
        title: "Forgot Password",
        paragraph: "Enter your email to recover your password",
        button: "Recover Password",
        link: "Go back to login?",
        linkTo: AuthFormType.LOGIN
    }
};