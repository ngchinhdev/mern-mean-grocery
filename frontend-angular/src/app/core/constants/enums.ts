export enum AuthFormType {
    LOGIN = 'Login',
    REGISTER = 'Register',
    FORGOT_PASSWORD = 'Forgot-password'
}

export const authFormTexts: Record<AuthFormType, { title: string; subtitle: string; button: string; link: string; linkTo: AuthFormType; }> = {
    [AuthFormType.LOGIN]: {
        title: "Login",
        subtitle: "Login with your email and password",
        button: "Login",
        link: "Don't have an account?",
        linkTo: AuthFormType.REGISTER
    },
    [AuthFormType.REGISTER]: {
        title: "Register",
        subtitle: "Register with your email and password",
        button: "Register",
        link: "Already have an account?",
        linkTo: AuthFormType.LOGIN
    },
    [AuthFormType.FORGOT_PASSWORD]: {
        title: "Forgot Password",
        subtitle: "Enter your email to recover your password",
        button: "Recover Password",
        link: "Go back to login?",
        linkTo: AuthFormType.LOGIN
    }
};