import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import '../App.scss';
import Menu from "./menu/Menu";

const Layout = () => {
    return (
        <>  
            <Header />
            <div className="container">
                <Menu />
                <Outlet />
            </div>
        </>
    );
};

export default Layout;