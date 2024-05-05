import {useLocation, Link} from 'react-router-dom'
import useAuth from './useAuth'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// ref: https://dev.to/stephengade/build-custom-middleware-for-a-reactnextjs-app-with-context-api-2ed3
const ProtectedRoutes = ({ children }) => {
    const storeError = useSelector(store => store.error)
    const location = useLocation();
    const { isAuthenticated, logoutUser } = useAuth();

    useEffect(()=>{
        //NOTE: Logout the user if the token is invalid - can be expired or revoked on the server side
        if(storeError?.name == 'RESTRICTED_PAGE_ACCESS_INVALID_TOKEN'){
            logoutUser()
        }
    },[storeError])

    if (
        !isAuthenticated &&
        location.pathname.toLowerCase().startsWith("/main")
    ) {
        return (
            <p className="">
                You are not allowed here <br />
                <Link to="/">Login</Link>
            </p>
        )
    }

    return children;
};

export default ProtectedRoutes