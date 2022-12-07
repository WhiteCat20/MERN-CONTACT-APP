import express from "express";
import {
  getContacts,
  getContactById,
  postContact,
  updateContact,
  deleteContact,
} from "../Controllers/ContactController.js";

const router = express.Router();

//http://localhost:5000/api

router.get("/contacts", getContacts);
router.get("/contacts/:id", getContactById);
router.post("/contacts", postContact);
router.patch("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router;
