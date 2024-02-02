import css from './contactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from '../../redux/contacts/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  const handleDelete = (contactId) => {
    dispatch(removeContact(contactId));
  };

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={css.contactListItem}>
          <p className={css.contactListText}>
            {contact.name}: {contact.number}
          </p>
          <button
            type="button"
            onClick={() => handleDelete(contact.id)}
            className={css.contactListBtnDelete}
          >
            Delete contact
          </button>
        </li>
      ))}
    </ul>
  );
};

export { ContactList };