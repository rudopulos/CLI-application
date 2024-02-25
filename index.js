const yargs = require('yargs');
const { listContacts, getContactById, addContact, removeContact } = require('./db/contacts');

const argv = yargs
  .command('list', 'List all contacts')
  .command('get', 'Get contact by ID', {
    id: {
      describe: 'Contact ID',
      demandOption: true,
      type: 'number',
    },
  })
  .command('add', 'Add a new contact', {
    name: {
      describe: 'Contact name',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Contact email',
      demandOption: true,
      type: 'string',
    },
    phone: {
      describe: 'Contact phone number',
      demandOption: true,
      type: 'string',
    },
  })
  .command('remove', 'Remove contact by ID', {
    id: {
      describe: 'Contact ID',
      demandOption: true,
      type: 'number',
    },
  })
  .help()
  .argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;
    case 'get':
      getContactById(id);
      break;
    case 'add':
      addContact(name, email, phone);
      break;
    case 'remove':
      removeContact(id);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv); 