import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddContact({ addContactHandler }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All fields mandatory");
      return;
    }

    addContactHandler({ name: name, email: email });
    setName("");
    setEmail("");
    history("/");
  };
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form">
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <button className="ui button blue" onClick={add}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddContact;
