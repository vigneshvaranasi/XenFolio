// import { UserType } from "../store/UserStore/UserContext";
// import { useState } from "react";
// import Button from "./ui/Button";

// const ProfileButton = ({ username, avatar_url }: UserType) => {
//     const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

//     return (
//         <>
//             <div className={
//                 `
//             flex items-center justify-around text-center rounded-full 
//             hover:bg-[#68686811]  hover:text-neutral-300 hover:shadow-[0_0_10px_#535353] 
//             `
//             }
//                 onClick={() => { setIsMenuOpen(!isMenuOpen) }}
//             >
//                 {/* <p className="">{username}</p> */}
//                 <img loading={"eager"} src={avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
//             </div>

//             {
//                 isMenuOpen && (
//                     <div className="absolute top-12 right-0 mt-2 shadow-lg rounded-lg pr-3">
//                         <Button text="Logout" variant="danger"></Button>
//                     </div>
                    
//                 )
//             }
//         </>
//     )
// }
// export default ProfileButton;

import { UserType } from "../store/UserStore/UserContext";
import { useState, useEffect, useRef } from "react";
import Button from "./ui/Button";
import { useUserContext } from '../hooks/useUserContext';

const ProfileButton = ({ username, avatar_url }: UserType) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const {handleLogout} = useUserContext();
    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <div
                className={`
                    flex items-center justify-around text-center rounded-full 
                    hover:bg-[#68686811] hover:text-neutral-300 hover:shadow-[0_0_10px_#535353]
                    hover:cursor-pointer
                `}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <img 
                    loading={"eager"}
                    src={avatar_url}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                        e.currentTarget.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                    }}
                />
            </div>

            {isMenuOpen && (
                <div className="absolute top-10 right-0 mt-2 shadow-lg rounded-lg">
                    <Button text="Logout" variant="danger" onClick={handleLogout}/>
                </div>
            )}
        </div>
    );
};

export default ProfileButton;
