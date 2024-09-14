import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { apiLogout } from '../../redux/auth/operations';
import { selectAuthUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

function UserMenu () {
    const dispatch = useDispatch();
    const user = useSelector(selectAuthUser);
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        if (showWelcome) {
            const timer = setTimeout(() => setShowWelcome(false), 5000); 
            return () => clearTimeout(timer); 
        }
    }, [showWelcome]);

    return (
        <div className={css.userMenuContainer}>
            <div className={css.userMenuContent}>
                {showWelcome && <p className={css.welcomeMessage}>Welcome, {user.email} 😃</p>}
            </div>
            
            <button 
                type="button" 
                className={css.logoutButton} 
                onClick={() => dispatch(apiLogout())}
            >
                Log out
            </button>
        </div>
    );
};

export default UserMenu;
