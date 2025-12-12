import Contacts from "../db/contact.js";

export const getAllContacts = async() =>{
    const getContacts =await Contacts.find();
    return getContacts;
}

export const getContact =  async(id) =>{
    const getContact = await Contacts.findById(id);
    return getContact;
}

export const createContact = async(payload) => {
    const contact = Contacts.create(payload);
    return contact;
}

export const patchContact = async(contactId, payload, options={}) => {
    const patchedContact = Contacts.findByIdAndDelete(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        }
    )

    if(!patchedContact || !patchedContact.value){
        return null;
    }

    return {
        contact: contactResult.value,
        isNew: Boolean(contactResult?.lastErrorObject?.upserted),
    }
}

export const deleteContact = async(contactId) => {
    const contact = await Contacts.findByIdAndDelete({ _id: contactId});
    return contact;
}