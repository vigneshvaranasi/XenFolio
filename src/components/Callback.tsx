import { useEffect } from "react"
import { useUserContext } from '../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
import { AuroraBackground } from "./ui/aurora-background";
import { TypewriterEffect } from "./ui/typewriter-effect";
const Callback = () => {
    const navigate = useNavigate();

    const { setIsLoggedIn, isLoggedIn, code, setCode, setUser, setAccessToken } = useUserContext();

    const words = [
        {
            text: "Authenticating",
        },
        {
            text: "....",
            className: "text-blue-500 text-neutral-400",
        },
    ];

    useEffect(() => {
        // Set Color whole color to black
        document.body.style.backgroundColor = "black";
        return () => {
            document.body.style.backgroundColor = "#0D1117";
        }
    }, [])


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codeParams = urlParams.get('code');
        if (codeParams) {
            console.log("code:\n" + codeParams);
            setCode(codeParams);
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Origin', 'https://4cfw3zvk-8888.inc1.devtunnels.ms');


            fetch('https://4cfw3zvk-5000.inc1.devtunnels.ms/auth/github', {
                method: 'POST',
                body: JSON.stringify({ codeParams }),
                headers: headers
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log('Access Token: ', data.message.access_token);
                        setAccessToken(data.message.access_token);
                        localStorage.setItem('accessToken', data.message.access_token);
                        setUser({ username: data.userData.login, avatar_url: data.userData.avatar_url });
                        setIsLoggedIn(true);
                        navigate('/myspace');
                    } else {
                        console.error('Error: ', data);
                        setIsLoggedIn(false);
                    }
                })
                .catch((error) => console.error('Error fetching access token:', error));
        }
    }, [])
    return (
        // <AuroraBackground>
        <div className="h-full flex justify-center items-center overflow-hidden bg-black">
            {/* <AuroraBackground> */}
            {/* <p className="text-xl md:text-4xl animate-pulse font-bold font-mono mb-40 md:mb-24 ">
                Authenticating....
            </p> */}
            <TypewriterEffect className="font-bold font-mono mb-40 md:mb-24" cursorClassName="bg-yellow-300 w-4 animate-pulse" words={words} />
            {/* </AuroraBackground> */}
        </div>
        /* </AuroraBackground> */
    )
}
export default Callback;

// if (code) {
//   console.log('GitHub OAuth Code: ', code);
//   // Fetch access token from backend using the OAuth code
//   fetch('https://4cfw3zvk-5000.inc1.devtunnels.ms/auth/github/callback', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ code }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         console.log('Access Token: ', data.message.access_token);
//         setAccessToken(data.message.access_token);
//         setUsername(data.userData.login);
//       } else {
//         console.error('Error: ', data.message);
//       }
//     })
//     .catch((error) => console.error('Error fetching access token:', error));
// }