import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center px-5">
      <h1 className="md:text-5xl sm:text-4xl text-3xl font-bold text-center">
        Welcome to <span className="text-chart-4">MI` Music</span> platform.
      </h1>
      <LoginForm />
    </div>
  );
}
