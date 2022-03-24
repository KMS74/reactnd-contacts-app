import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import serialize from "form-serialize";

class CreateContact extends Component {
  handelSubmit = (event) => {
    event.preventDefault();
    const values = serialize(event.target, { hash: true });
    console.log(values);
    if (this.props.onCreateContact) {
      this.props.onCreateContact(values);
    }
  };
  render() {
    return (
      <div>
        <Link className="close-create-contact" to="/" />
        <form onSubmit={this.handelSubmit} className="create-contact-form">
          <ImageInput
            className="create-contact-avatar-input"
            name="avatarURL"
            maxHeight={64}
          />
          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="handle" placeholder="Handel" />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateContact;
