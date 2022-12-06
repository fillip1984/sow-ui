import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { signIn } from "../../services/UserAccountService";
import { SignInRequest, SignInResponse } from "../../Types";

const Login = () => {
  const navigate = useNavigate();
  const [signInResponse, setSignInResponse] = useState<
    SignInResponse | undefined
  >();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>();
  const { setUserAccount } = useContext(AuthContext);
  useEffect(() => {
    if (signInResponse?.isSuccess) {
      setUserAccount(signInResponse.userAccount);
      navigate("/posts");
    }
  }, [signInResponse]);

  const onSubmit: SubmitHandler<SignInRequest> = async (formData) => {
    setSignInResponse(await signIn(formData));
  };

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <div className="w-1/2 rounded-lg border-2 border-white bg-dark p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="text-2xl">
              Username
            </label>
            <input
              className="mt-1 w-full rounded"
              id="username"
              type="text"
              {...register("username", {
                required: "Username is required",
              })}
              autoFocus
            />
            {errors.username && (
              <span className="font-bold text-primary">
                {errors.username.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="text-2xl">
              Password
            </label>
            <input
              className="mt-1 w-full rounded"
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="font-bold text-primary">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="rounded bg-primary px-4 py-2">
              Log in
            </button>
            <Link to="/register" className="text-lg text-secondary">
              Register new account
            </Link>
          </div>
        </form>
      </div>
      {signInResponse && signInResponse.status === 401 && (
        <div className="my-2 rounded bg-secondary p-2 text-center text-2xl">
          {signInResponse.message}
        </div>
      )}
    </div>
  );
};

export default Login;
