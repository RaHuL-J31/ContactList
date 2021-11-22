import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router";

function EditContact({ contact, updateContactHandler }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  const param = useParams();
  const [con, setCon] = useState([]);
  useEffect(() => {
    const contactDetailbyId = contact.find((c) => {
      return c.id == param.id;
    });
    if (contactDetailbyId) setCon(contactDetailbyId);
    setName(contactDetailbyId.name);
    setEmail(contactDetailbyId.email);
  }, []);

  const edit = (e) => {
    e.preventDefault();
    // if (name === "" || email === "") {
    //   alert("All fields mandatory");
    //   return;
    // }

    updateContactHandler({ id: con.id, name: name, email: email });
    // setName("");
    // setEmail("");
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
        <button className="ui button blue" onClick={edit}>
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditContact;
