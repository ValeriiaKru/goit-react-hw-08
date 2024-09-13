import { NavLink } from "react-router-dom";
import css from './AuthNav.module.css';
import { buildLinkClass } from "../Navigation/Navigation";

const AuthNav = () => {
    return (
        <div className={css.wrapperNav}>
            <NavLink to='register' className={buildLinkClass}>
                Register
            </NavLink>
            <NavLink to='/login' className={buildLinkClass}>
                Log In
            </NavLink>
        </div>
    );
};

export default AuthNav;