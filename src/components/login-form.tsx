import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Login, PersonAdd } from "@mui/icons-material";
import {
  AuthenticationClient,
  type LoginRequest,
} from "../shared/clients/BarricadeClient.ts";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onLoginChange = (e: any) => {
    setLogin(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const attemptLogin = async () => {
    const request: LoginRequest = {
      name: login,
      secret: password,
    };

    AuthenticationClient.login(request).then(() => {
      window.location.replace(nextPage());
    });
  };

  const nextPage = () => {
    const params = new URLSearchParams(document.location.search);
    const target = params.get("target");

    return target ? target : "/";
  };

  const isLoginAllowed = () => {
    return login.length > 0 && password.length > 0;
  };

  useEffect(() => {
    const ensureNotLoggedIn = async () => {
      AuthenticationClient.getIdentity().then(() => {
        navigate("/");
      });
    };
    ensureNotLoggedIn();
  }, []);

  return (
    <div className="w-1/2 h-1/2 flex flex-col justify-evenly items-center border-2">
      <p className="text-3xl font-bold">Sign in to your account</p>
      <TextField
        className="w-1/2"
        label="Login"
        value={login}
        onChange={onLoginChange}
      />
      <TextField
        className="w-1/2"
        label="Password"
        type="password"
        onChange={onPasswordChange}
        value={password}
      />
      <div className="w-full flex justify-evenly">
        <Button
          className="w-1/4 gap-3"
          variant="outlined"
          onClick={() => navigate("/register")}
        >
          <p>Register</p>
          <PersonAdd />
        </Button>
        <Button
          className="w-1/4 gap-3"
          variant="contained"
          onClick={attemptLogin}
          disabled={!isLoginAllowed()}
        >
          <p>Login</p>
          <Login />
        </Button>
      </div>
    </div>
  );
}
