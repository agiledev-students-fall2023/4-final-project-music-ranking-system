const { useEffect } = require("react")
const { Navigate } = require("react-router-dom");

const Logout = props => {
    useEffect(() => {
        localStorage.removeItem("token")
    }, [])

    return (
        <>
        <Navigate to='/landing-feed' />
        </>
    )
}

export default Logout