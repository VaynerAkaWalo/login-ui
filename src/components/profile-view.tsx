import {Button, TextField} from "@mui/material";
import {AuthenticationClient, type Identity} from "@shared/clients/BarricadeClient.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

const emptyIdentity: Identity = {
  name: '',
  id: ''
}


export default function ProfileView() {
  const [profile, setProfile] = useState<Identity>(emptyIdentity)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await AuthenticationClient.getIdentity()
      console.log(data)
      setProfile(data)
    }

    loadProfile().catch(_ => {
      navigate('/login')
    }).finally(() =>
      setLoading(false)
    )
  }, []);

  const logout = async () => {
    AuthenticationClient.logout({}).then(_ => navigate("/login"))
  }

  return (
    <div className="w-1/2 h-1/2 flex flex-col justify-evenly items-center border-2 border-zinc-500">
      {!loading && <>
        <TextField className="w-1/2" label="ID" value={profile.id}/>
        <TextField className="w-1/2" label="Name" value={profile.name}/>
        <Button className="w-1/3" variant="contained" onClick={logout}>Logout</Button>
      </>}
    </div>
  )
}
