// import { Component } from 'react';
import css from './contactForm.module.css';
import { nanoid } from 'nanoid';

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsSlice';



const ContactForm = () => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);


 const  handleFromSubmit = (event) => {
    event.preventDefault();
    // const form = event.currentTarget;
    // console.log(form.elements);
    // const name = form.elements.name.value;
    // const number = form.elements.number.value;
    const id = nanoid(5);
    const formData = { id, name, number };

    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in your contacts`);
      return;
    }

    dispatch(addContact(formData));
    // Очистка форми
    setName('');
    setNumber('');
  };


  //   const formData = {
  //     id,
  //     name,
  //     number,
  //   };

  //   this.props.handlerAddContact(formData);
  //   form.elements.name.value = '';
  //   form.elements.number.value = '';
  // };


    return (
      <form className={css.contactForm} onSubmit={handleFromSubmit}>
        <h4 className={css.formTitle}>Name</h4>
        <label className={css.formLabel}>
          <input
            className={css.contactFormInput}
            type="text"
            name="name"
            required
            value={name} // прив'язка до стану name
            onChange={(e) => setName(e.target.value)} //  обробник onChange
            placeholder="Write a name"
          />
        </label>

        <h4 className={css.formTitle}>Number</h4>
        <label className={css.formLabel}>
          <input
            className={css.contactFormInput}
            type="tel"
            name="number"
            required
            value={number} //  прив'язка до стану number
            onChange={(e) => setNumber(e.target.value)} // Додано обробник onChange
            placeholder="Write a number"
            pattern="\d{3}-\d{2}-\d{2}"
            title="xxx-xx-xx"
          />
        </label>
        <button type="submit" className={css.formButton}>
          Add to contacts
        </button>
      </form>
    );
  }


export { ContactForm };
