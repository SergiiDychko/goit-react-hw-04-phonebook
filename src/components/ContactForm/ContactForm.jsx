import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '../Button';
import { StyledForm } from './Styles';


const ContactForm = ({ addNewContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    addNewContact(name, number);
    setName('');
    setNumber('');
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name': setName(value)
        break;
      case 'number': setNumber(value)
        break;
      default: return console.log('Something went wrong');
    }
  }

    return ( <StyledForm onSubmit={handleSubmit}>
        <label className="formLabel">
          <span className="labelTitle">Name:</span>
          <input
            className="inputTag"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={handleChange}
            value={name}
            required
          />
        </label>
        <label className="formLabel">
          <span className="labelTitle">Number:</span>
          <input
            className="inputTag"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={handleChange}
            value={number}
            required
          />
        </label>

        <Button title="Add contact" type="submit" />
      </StyledForm>
    );
  };

ContactForm.propTypes = {
  addNewContact: PropTypes.func.isRequired,
};

export default ContactForm;
