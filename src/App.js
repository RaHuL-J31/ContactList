import React, { useState, useEffect, useRef } from "react";

import { uuid } from "uuidv4";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { Route, Routes } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import api from "./api/Contactapi";
import EditContact from "./components/EditContact";

function App() {
  const LOCAL_KEY = "contact";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const retriveContact = async () => {
    const response = await api.get("http://localhost:3006/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("http://localhost:3006/contacts", request);
    setContacts([...contacts, response.data]);
  };
  const updateContactHandler = async (contact) => {
    const response = await api.put(
      `http://localhost:3006/contacts/${contact.id}`,
      contact
    );
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };
  useEffect(() => {
    //using Local Storage
    // const retriveItem = JSON.parse(localStorage.getItem(LOCAL_KEY));
    // if (retriveItem) setContacts(retriveItem);
    const getAllContact = async () => {
      const allContact = await retriveContact();
      if (allContact) setContacts(allContact);
    };
    getAllContact();
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);
  const removeContactHandler = async (id) => {
    await api.delete(`http://localhost:3006/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id != id;
    });
    setContacts(newContactList);
  };
  const searchHandler = (searchterm) => {
    setSearchTerm(searchterm);

    if (searchTerm !== "") {
      const newContactResult = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      console.log(newContactResult);
      setSearchResult(newContactResult);
    } else {
      setSearchResult(contacts);
    }
  };
  return (
    <div className="ui container">
      <Header />
      <Routes>
        <Route
          path="/add"
          element={<AddContact addContactHandler={addContactHandler} />}
        />
        <Route
          path="/"
          exact
          element={
            <ContactList
              contact={searchTerm.length < 1 ? contacts : searchResult}
              getContactId={removeContactHandler}
              key={contacts}
              term={searchTerm}
              searchKeyword={searchHandler}
            />
          }
        />
        <Route
          path="/contactdetail/:id"
          element={<ContactDetail contact={contacts} />}
        />
        <Route
          path="/edit/:id"
          element={
            <EditContact
              contact={contacts}
              updateContactHandler={updateContactHandler}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
