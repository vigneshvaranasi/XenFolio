import { useEffect } from 'react'
import { useUserContext } from '../hooks/useUserContext';

const MySpacePage = () => {
  let UserContext = useUserContext();
  useEffect(() => {
    console.log('MySpace: UserContext: ', UserContext);
  }, [UserContext])
  return (
    <div>MySpacePage
      {
        UserContext.user? <p>{UserContext.user.username}</p> : <p>Not Logged In</p> 
      }
    </div>
  )
}

export default MySpacePage
