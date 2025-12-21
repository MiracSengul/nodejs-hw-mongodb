import { Router } from "express";
import { getContactsController, getContactsByIdController, createContactsController, patchContactsController, deleteContactsController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getContactsController));

router.get("/:contactId", isValidId, ctrlWrapper(getContactsByIdController));

router.post("/", validateBody(createContactSchema), ctrlWrapper(createContactsController));

router.patch("/:contactId", validateBody(updateContactSchema), ctrlWrapper(patchContactsController));

router.delete("/:contactId", ctrlWrapper(deleteContactsController));

export default router;