import { useEffect } from "react"
import { useUserContext } from '../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL, FRONTEND_URL } from "../config";
const Callback = () => {
    const navigate = useNavigate();

    const { setIsLoggedIn, setCode, setUser, setAccessToken } = useUserContext();

    useEffect(() => {
        // Set Color whole color to black
        document.body.style.backgroundColor = "black";
        return()=>{
            document.body.style.backgroundColor = "#0D1117";
        }
    }, [])


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codeParams = urlParams.get('code');
        if (codeParams) {
            // console.log("code:\n" + codeParams);
            setCode(codeParams);
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Origin', FRONTEND_URL);



            fetch(`${BACKEND_URL}/auth/github`, {
                method: 'POST',
                body: JSON.stringify({ codeParams }),
                headers: headers
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        // console.log('Access Token: ', data.message);
                        setAccessToken(data.message);
                        localStorage.setItem('accessToken', data.message);
                        console.log(data.dbData);
                        // console.log('data: ', data);
                        setUser({ username: data.userData.login, avatar_url: data.userData.avatar_url, isRecentConfig: data.dbData.isRecentConfig, craftBenches:data.dbData.craftBenches });
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
        <div className="h-screen flex justify-center items-center bg-black overflow-hidden">
            <p className="text-xl md:text-4xl animate-pulse font-bold font-mono mb-32 md:mb-0 ">
                Authenticating....
            </p>
        </div>
    )
}
export default Callback;