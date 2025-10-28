import { Button } from "@mui/material";
import {
  AuthenticationClient,
  type Identity,
} from "@shared/clients/BarricadeClient.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const emptyIdentity: Identity = {
  name: "",
  id: "",
};

export default function ProfileView() {
  const [profile, setProfile] = useState<Identity>(emptyIdentity);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await AuthenticationClient.getIdentity();
      setProfile(data);
    };

    loadProfile()
      .catch((_) => {
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    AuthenticationClient.logout({}).then((_) => navigate("/login"));
  };

  return (
    <div className="w-1/2 h-1/2 flex flex-col justify-evenly items-center border-2">
      {!loading && (
        <>
          <p className="text-2xl">Logged in as {profile.name}</p>
          <Button className="w-1/3" variant="contained" onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
}
