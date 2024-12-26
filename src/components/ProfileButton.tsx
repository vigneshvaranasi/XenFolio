import { UserType } from "../store/UserStore/UserContext";

const ProfileButton = ({username,avatar_url}:UserType) => {
    return (
        <div className="flex items-center justify-around gap-2 text-center hover:bg-[#68686811] hover:shadow-inner hover:shadow-[#0d1117a9] hover:text-neutral-300 rounded-md px-2">
            <p className="">{username}</p>
            <img loading={"eager"} src={avatar_url} alt="avatar" className="w-5 h-5 rounded-full"/>
        </div>
    )
}
export default ProfileButton;