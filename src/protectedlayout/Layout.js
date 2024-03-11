import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <>
            <div className="dash-container">
                <Outlet />
            </div>
        </>
    )
}
export default Layout