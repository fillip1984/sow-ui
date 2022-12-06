import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { signUp } from "../../services/UserAccountService";
import { SignUpRequest, SignUpResponse } from "../../Types";

const Register = () => {
  const navigate = useNavigate();
  const [signUpResponse, setSignUpResponse] = useState<
    SignUpResponse | undefined
  >();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpRequest>();
  const { setUserAccount } = useContext(AuthContext);
  useEffect(() => {
    if (signUpResponse?.isSuccess) {
      setUserAccount(signUpResponse.userAccount);
      navigate("/posts");
    }
  }, [signUpResponse]);

  const onSubmit: SubmitHandler<SignUpRequest> = async (formData) => {
    setSignUpResponse(await signUp(formData));
  };

  return (
    <div className="flex h-[100vh] items-center justify-center">
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

          <div>
            <label htmlFor="passwordConfirmation" className="text-2xl">
              Confirm Password
            </label>
            <input
              className="mt-1 w-full rounded"
              id="passwordConfirmation"
              type="password"
              {...register("passwordConfirmation", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
            {errors.passwordConfirmation && (
              <span className="font-bold text-primary">
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="rounded bg-primary px-4 py-2">
              Register
            </button>
            <Link
              to="/"
              className="rounded border-2 border-secondary px-4 py-2 text-lg text-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
