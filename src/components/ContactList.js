import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Contact from "./Contact";

function ContactList({ contact, getContactId, term, searchKeyword }) {
  const inputEl = useRef();
  const getSearchItem = () => {
    searchKeyword(inputEl.current.value);
  };
  return (
    <div className="ui celled list">
      <div
        className="list"
        style={{
          paddingTop: "25px",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "35px",
        }}
      >
        <h3>Contact List</h3>
        <div className="ui search">
          <div className="ui">
            <input
              type="text"
              placeholder="search"
              className="prompt"
              value={term}
              onChange={getSearchItem}
              ref={inputEl}
            />
          </div>
        </div>
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </div>

      {contact && (
        <div>
          {contact.map((c) => {
            return (
              <>
                <Contact contact={c} key={c.id} getContactId={getContactId} />
                <hr />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ContactList;
