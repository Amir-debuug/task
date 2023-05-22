import { useContext } from "react"
import { Navigate, Outlet} from "react-router-dom"
import { CreateAuthContext } from "../contextApi/useAuthContext"

const RequireAuth = () => {
    const { isLoggedIn } = useContext(CreateAuthContext)

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

export default RequireAuth;