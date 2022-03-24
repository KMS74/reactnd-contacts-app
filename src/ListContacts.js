import React, { Component } from "react";
// PropTypes is a package that lets us define the data type we want to our props in components that recives props.
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  clearQuery = () => {
    this.updateQuery("");
  };
  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;
    const showingContacts =
      query === ""
        ? contacts
        : contacts.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
          );
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={(event) => {
              this.updateQuery(event.target.value);
            }}
          />
          <Link to="/create" className="add-contact">
            Add contact
          </Link>
        </div>

        {/* Short-circuit Evaluation Syntax */}
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ul className="contact-list">
          {showingContacts.map((contact) => (
            <li className="contact-list-item" key={contact.id}>
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`,
                  filter: "grayscale(0)",
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                onClick={() => onDeleteContact(contact)}
                className="contact-remove"
              >
                Rmove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListContacts;
