import { useEffect, useState } from 'react';
import './App.css';
import {Notify} from 'notiflix';
import ContactForm from './ContactForm/';
import ContactList from './ContactsList/';
import Section from './Section';
import { nanoid } from 'nanoid';
import SearchInput from './SearchInput/';

const App = () => {

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('storedContacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const addNewContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts(contacts => [...contacts, newContact]);
  };

  const handleFilter = evt => setFilter(evt.target.value);


  const filteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  
  const deleteContact = contactId =>
    setContacts(contacts.filter(contact => contact.id !== contactId));
  
  useEffect(() => {
    localStorage.setItem('storedContacts', JSON.stringify(contacts));
    }, [contacts])
  
    return (
      <>
        <Section title="Phonebook">
          <ContactForm addNewContact={addNewContact} />
        </Section>
        <Section title="Contacts">
          <SearchInput filter={filter} onChange={handleFilter} />
          <ContactList
            contactsList={filter ? filteredContacts() : contacts}
            filter={filter}
            onDelete={deleteContact}
          />
        </Section>
      </>
    );
  }

export default App;
