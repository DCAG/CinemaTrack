import {useLocation, Link} from 'react-router-dom'
import useAuth from './useAuth'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { resetDataError } from '../redux/reducer';

// ref: https://dev.to/stephengade/build-custom-middleware-for-a-reactnextjs-app-with-context-api-2ed3
const ProtectedRoutes = ({ children }) => {
    const storeError = useSelector(store => store.error)
    const dispatch = useDispatch()
    const location = useLocation();
    const { isAuthenticated, logoutUser } = useAuth();
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(()=>{
        //NOTE: Logout the user if the token is invalid - can be expired or revoked on the server side
        if(storeError?.name == 'RESTRICTED_PAGE_ACCESS_INVALID_TOKEN'){
            setErrorMessage(storeError?.error?.name=="TokenExpiredError"?'Session Timed Out':storeError.message)
            logoutUser()
            dispatch(resetDataError())
        }
    },[storeError])

    if (
        !isAuthenticated &&
        location.pathname.toLowerCase().startsWith("/main")
    ) {
        return (
          <div>
            <div className='form-error' style={!errorMessage?{display:'none'}:{}}>
                {errorMessage}
            </div>
            <p className="">
                You are not allowed here <br />
                <Link to="/">Login</Link>
            </p>
          </div>
        )
    }

    return children;
};

export default ProtectedRoutes