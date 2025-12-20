import Contacts from "../db/contact.js";
import { SORT_ORDER } from "../constants/index.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
    page = 1,
    perPage = 4,
    sortOrder = SORT_ORDER.ASC,
    sortBy = "_id",
    }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
  
    const contactsQuery = Contacts.find();
    const contactsCount = await Contacts.find()
      .merge(contactsQuery)
      .countDocuments();
  
    const contacts = await contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();
  
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
  
    return {
      data: contacts,
      ...paginationData,
    };
};

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