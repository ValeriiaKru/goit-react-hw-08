import { useDispatch, useSelector } from "react-redux";
import { apiLogout } from '../../redux/auth/operations';
import { selectAuthUser } from '../../redux/auth/selectors';

function UserMenu () {
    const dispatch = useDispatch();
    const user = useSelector(selectAuthUser);

    return (
        <div>
            <p> Welcome, {user.email}</p>
            <button type="button" onClick={() => dispatch(apiLogout())}>
                Log out
            </button>
        </div>
    );
};

export default UserMenu;
