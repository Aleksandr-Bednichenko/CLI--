const fs = require ('fs/promises');
const path = require ('path');
const crypto = require('crypto');
const chalk = require('chalk')
const contactsPath = path.join(__dirname, "/db/contacts.json")


const readContacts = async() => {
    const result = await fs.readFile( contactsPath, 'utf8');
    const contacts = JSON.parse(result);
    return contacts;
}

// TODO: задокументировать каждую функцию
function listContacts() {
    return readContacts()
  }
  
  async function getContactById(contactId) {
    const contacts = await readContacts()
  const [result] = contacts.filter((contact) => contact.id === contactId)
  return result
    
  }
  
  async function removeContact(contactId) {
    const contacts = await readContacts()
try {
  const result = contacts.filter((contact) => contact.id !== contactId)

  if (contacts.length === result.length) {
    return console.error(chalk.red(`Contact with ID ${contactId} not found!`));
  }

    await fs.writeFile(
      contactsPath,
      JSON.stringify(result, null, 2),
    )
    console.log(chalk.green("Contact deleted successfully! New list of contacts:"));
    console.table(result)
    
  
} catch (error) {
  return console.error(error)
}
    
  }
  
  async function addContact(name, email, phone) {
    const contacts = await readContacts()
    const newContact = { id:crypto.randomUUID(), name, email, phone }
    contacts.push(newContact)
    
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
    )
    return newContact
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }