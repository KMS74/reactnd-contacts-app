// API URL
const api = process.env.REACT_APP_CONTACTS_API_URL || "http://localhost:5001";

//  unique ID
let token = localStorage.token;

if (!token) {
  // - Math.random should be unique because of its seeding algorithm.
  // - Convert it to base 36 (numbers + letters), and grab the first 10 characters
  // after the decimal.
  // - toString(radix)  radix argument must be between 2 and 36s.
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(2, 10);
}

const headers = {
  Accept: "application/json",
  Authorization: token,
};

// get contacts
export const getAll = () =>
  fetch(`${api}/contacts`, { headers })
    .then((res) => res.json())
    .then((data) => data.contacts);

// delete contacts
export const remove = (contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: "DELETE", headers })
    .then((res) => res.json())
    .then((data) => data.contact);

// post contacts
export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: "POST",
    headers: {
      ...headers, // spread opertator used for header object clonneing
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
