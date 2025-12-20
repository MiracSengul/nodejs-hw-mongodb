import createHttpError from "http-errors";
import { getAllContacts, getContact, createContact, patchContact, deleteContact  } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
  
    const { sortOrder, sortBy } = parseSortParams(req.query);
  
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
    });
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
};

export const getContactsByIdController = async (req, res) => {
    const {contactId} = req.params;
    const idContacts = await getContact(contactId);

    if(!idContacts){
        res.status(404).json({
            message: "Contact not found",
        })
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: idContacts,
    })
}

export const createContactsController = async (req, res) => {
    const newContact = await createContact(req.body)

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: newContact,
    })
}

export const patchContactsController = async (req, res) => {
    const { contactId } = req.params;

    const contact = await patchContact(contactId, req.body)

    if(!contact){
        throw createHttpError(404, "Contact not found")
    }

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: contact,
    })
}

export const deleteContactsController = async (req, res) => {
    const {contactId} = req.params;
    const contact = await deleteContact(contactId);

    if(!contact){
        throw createHttpError(404, "Contact not found")
    }

    res.status(204).send();
}