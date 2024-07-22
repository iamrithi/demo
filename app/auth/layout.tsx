import type { Metadata } from "next";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to access your account. Enter your credentials to proceed.",
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="w-full h-full flex flex-row justify-center items-center">
      <div className="relative flex flex-col md:w-full h-full bg-[url('/img2.png')] bg-cover justify-center items-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
