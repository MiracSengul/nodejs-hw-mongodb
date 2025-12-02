import Contacts from "../db/contact.js";

export const getAllContacts = async() =>{
    const getContacts =await Contacts.find();
    return getContacts;
}

export const getContact =  async(id) =>{
    const getContact = await Contacts.findById(id);
    return getContact;
}