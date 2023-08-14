import React from 'react'


import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="https://mail.google.com/mail/?view=cm&fs=1&to=debnathsinhababu2017@gmail.com" target='_blank'>
        <Button>Contact me through Mail</Button>
      </a>
    </div>
  );
};

export default Contact;
