import React, { Component } from "react";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    contacts: [],
  };

  // gets called after the component is "mounted" to the DOM (which means after it is rendered).
  // Ajax requests should only be made in the componentDidMount lifecycle method.
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({
        contacts,
      }));
    });
  }
  removeContact = (contact) => {
    // updtae the state of the component.
    // every key in the returned objetc will be merged or 'completely replaces a new value of a key ' with the current state.
    // Each time state is changed, React knows and will call render() to re-render the component.
    this.setState((cuurentState) => ({
      contacts: cuurentState.contacts.filter((c) => c.id !== contact.id),
    }));
    // remove the contacts comming from the server
    ContactsAPI.remove(contact);
  };

  createContact = (contact) => {
    ContactsAPI.create(contact).then((contact) => {
      console.log("new created Contact", contact);
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contact]),
      }));
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        />

        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
