import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import css from './Contact.module.css';

import { deleteContact } from '../../redux/contacts/operations';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

function Contact({ id, name, number }) {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(deleteContact(id));
        toast.success('Your contact has been deleted🗑️');
    };

    return (
        <li className={css.contactList}>
            <div className={css.contactContainer}>
                <FaUser />
                <p className={css.contactName}>{name}</p>
            </div>
            <div className={css.contactContainer}>
                <FaPhoneAlt />
                <p className={css.contactName}>{number}</p>
            </div>
            <button
            className={css.deleteBtn}
            type="button"
            onClick={() => handleDelete(id)}
            >
Delete
            </button>
        </li>
    );
}

export default Contact;