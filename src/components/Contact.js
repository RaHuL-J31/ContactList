import React from "react";
import { Link } from "react-router-dom";

const Contact = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div
      className="item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Link
          to={{
            pathname: `/contactdetail/${id}`,
            state: { contact: props.contact },
          }}
        >
          <div className="image">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/test-account.png" />
          </div>
          <div className="emailname">
            <div
              className="header"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              {name}
            </div>
            <div>{email}</div>
          </div>
        </Link>
      </div>
      <Link
        to={{
          pathname: `/edit/${id}`,
          state: { contact: props.contact },
        }}
      >
        <i
          className="edit alternate outline icon"
          style={{ color: "green", marginTop: "7px" }}
        ></i>
      </Link>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => props.getContactId(id)}
      ></i>
    </div>
  );
};

export default Contact;
