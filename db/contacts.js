const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');



function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return [];
    }

    const contacts = JSON.parse(data);
    console.table(contacts); 
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return null;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact);
    return contact;
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };

    const updatedContacts = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
