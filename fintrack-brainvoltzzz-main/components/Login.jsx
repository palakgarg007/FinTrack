import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

const Login = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <Button className="m-2 rounded-lg" onClick={signIn}>
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
