import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UserAccount,
} from "../Types";

const USER_ACCOUNT_API_URL = `${
  import.meta.env.VITE_ROOT_API_URL
}/userAccounts`;

interface JwtPayload {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  scope: string;
}

export const signUp = async (
  signUpRequest: SignUpRequest
): Promise<SignUpResponse> => {
  try {
    // maybe not necessary but I'm trying to only send exactly the fields the back end is expecting
    const signInRequest: SignInRequest = {
      username: signUpRequest.username,
      password: signUpRequest.password,
    };
    const response = await fetch(`${USER_ACCOUNT_API_URL}/signUp`, {
      method: "POST",
      body: JSON.stringify(signInRequest),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      return {
        status: response.status,
        isSuccess: false,
        message: response.statusText,
      };
    } else if (!response.ok) {
      const msg = `An exception occurred while trying to sign up. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const token = await response.text();
    const jwtPayload = decodeJwtPayload(token);

    const userAccount: UserAccount = {
      username: jwtPayload.sub,
      permissions: jwtPayload.scope.split(" "),
      token,
    };
    return {
      status: response.status,
      message: "Success",
      isSuccess: true,
      userAccount: userAccount,
    };
  } catch (e) {
    // TODO: repetitive?
    console.log("Exception occurred while signing up", e);
    throw new Error("Exception occurred while signing up");
  }
};

export const signIn = async (
  signInRequest: SignInRequest
): Promise<SignInResponse> => {
  try {
    const response = await fetch(`${USER_ACCOUNT_API_URL}/signIn`, {
      method: "POST",
      body: JSON.stringify(signInRequest),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      return {
        status: response.status,
        isSuccess: false,
        message: "Username and/or password are incorrect",
      };
    } else if (!response.ok) {
      const msg = `An exception occurred while signing in, username: ${signInRequest.username}. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const token = await response.text();
    const jwtPayload = decodeJwtPayload(token);

    const userAccount: UserAccount = {
      username: jwtPayload.sub,
      permissions: jwtPayload.scope.split(" "),
      token,
    };
    return {
      status: response.status,
      message: "Success",
      isSuccess: true,
      userAccount: userAccount,
    };
  } catch (e) {
    // TODO: repetitive
    console.log(
      "Exception occurred while signing in with user account, username: " +
        signInRequest.username,
      e
    );
    throw new Error(
      "Exception occurred while signing in with user user account, username: " +
        signInRequest.username
    );
  }
};

/* decodes JWT payload... was using this but can't grab out permissions array (looks like it's non-standard how they are stored): https://github.com/auth0/jwt-decode/issues/121 */
const decodeJwtPayload = (token: string): JwtPayload => {
  //Sample of what atob(token.split(".")) should return -> {"iss":"self","sub":"admin@sow.today","exp":1670170563,"iat":1670166963,"scope":"ROLE_ADMIN ROLE_USER"}
  const jwtPayload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
  return jwtPayload;
};
