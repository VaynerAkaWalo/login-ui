import {Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Login, PersonAdd} from '@mui/icons-material'
import {AuthenticationClient, type LoginRequest} from "../shared/clients/BarricadeClient.ts";
import {useNavigate} from "react-router";

export default function RegisterForm() {
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordRepeated, setPasswordRepeated] = useState<string>("")
  const navigate = useNavigate()

  const onLoginChange = (e: any) => {
    setLogin(e.target.value)
  }

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const onRepeatPasswordChange = (e: any) => {
    setPasswordRepeated(e.target.value)
  }

  const attemptRegister = async () => {
    const request: LoginRequest = {
      name: login,
      secret: password
    }

    AuthenticationClient.register(request).then(redirectToLogin)
  }

  const isRegisterAllowed = () => {
    return login.length > 5 && login.length < 20 && password.length > 5 && password.length < 20 && password === passwordRepeated
  }

  const redirectToLogin = () => {
    navigate("/")
  }

  useEffect(() => {
    const ensureNotLoggedIn = async () => {
      AuthenticationClient.getIdentity().then(redirectToLogin)
    }
    ensureNotLoggedIn()
  }, []);

  return (
    <div className="w-1/2 h-1/2 flex flex-col justify-evenly items-center border-2">
      <TextField className="w-1/2" label="Login" value={login} onChange={onLoginChange}/>
      <TextField className="w-1/2" label="Password" type="password" onChange={onPasswordChange} value={password}/>
      <TextField className="w-1/2" label="Repeat Password" type="password" onChange={onRepeatPasswordChange}
                 value={passwordRepeated}/>
      <div className="w-full flex justify-evenly">
        <Button className="w-1/4 gap-3" variant="outlined" onClick={redirectToLogin}>
          <p>Back to login</p>
          <Login/>
        </Button>
        <Button className="w-1/4 gap-3" variant="contained" onClick={attemptRegister} disabled={!isRegisterAllowed()}>
          <p>Register</p>
          <PersonAdd/>
        </Button>
      </div>
    </div>
  )
}
