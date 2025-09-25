import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {AuthenticationClient, type LoginRequest} from "../shared/clients/BarricadeClient.ts";
import {useNavigate} from "react-router";

export default function LoginForm() {
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()

  const onLoginChange = (e: any) => {
    setLogin(e.target.value)
  }

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const attemptLogin = async () => {
    const request: LoginRequest = {
      name: login,
      secret: password
    }

    AuthenticationClient.login(request).then(() => navigate("/"))
  }

  return (
    <div className="w-1/2 h-1/2 flex flex-col justify-evenly items-center border-2 border-zinc-500">
      <TextField className="w-1/2" label="Login" value={login} onChange={onLoginChange}/>
      <TextField className="w-1/2" label="Password" type="password" onChange={onPasswordChange} value={password}/>
      <Button className="w-1/3" variant="contained" onClick={attemptLogin}>Sign In</Button>
    </div>
  )
}
