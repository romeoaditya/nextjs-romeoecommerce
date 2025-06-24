import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const session: any = useSession();
  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!session.data?.accessToken) return;
        const {data} = await userServices.getProfile(session.data.accessToken);
        setProfile(data.data);
      } catch (err) {
        console.error("getProfile error:", err);
      }
    };
    getProfile();
  }, [session]);

  return (
    <>
      <ProfileMemberView profile={profile} />
    </>
  );
};
export default ProfilePage;
