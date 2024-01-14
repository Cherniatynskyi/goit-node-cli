const short = require('short-uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('db', 'contacts.json');

async function parseData(){
  try {
    const readResult = await fs.readFile(contactsPath)
    return  JSON.parse(readResult)
  } catch (error) {
    console.log(error)
  }
}

async function contactsList(){
    const data = await parseData()
    return data
};

async function getContactById(contactId){
  const data = await parseData()
  const result = data.find(contact => contact.id === contactId)

  if(!result){
    return null
  }
  return result
};

async function removeContact(contactId) {
  const data = await parseData()
  const deletedContact = data.find(contact => contact.id === contactId)

  if(!deletedContact){
    return null
  }
  const result = data.filter(contact => contact.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(result))

  return deletedContact
}

async function addContact({name, email, phone}) {
  const data = await parseData()
  const ID = short.generate()
  const addedContact = {id: ID, name, email, phone}
  data.push(addedContact)
  await fs.writeFile(contactsPath, JSON.stringify(data))

  return addedContact
}


module.exports = {
  contactsList,
  getContactById,
  removeContact,
  addContact
}