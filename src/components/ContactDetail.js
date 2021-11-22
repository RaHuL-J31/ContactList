import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

function ContactDetail({ contact }) {
  const param = useParams();
  const [con, setCon] = useState([]);

  useEffect(() => {
    const contactDetailbyId = contact.find((c) => {
      return c.id == param.id;
    });
    if (contactDetailbyId) setCon(contactDetailbyId);
  }, []);

  return (
    <div className="main">
      <div>
        <div
          className="content"
          style={{
            display: "flex",
            marginTop: "15vh",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="image">
            <img src="https://img.icons8.com/stickers/100/000000/gender-neutral-user.png" />
          </div>
          <div className="header">
            <h4>{con.name}</h4>
          </div>
          <div className="description">{con.email}</div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetail;
