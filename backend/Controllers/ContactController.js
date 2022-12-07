import Contact from "../Models/ContactModel.js";

//show all the contacts
export const getContacts = async (req, res) => {
  try {
    //tambahkan .sort({_id: -1}) untuk menampilkan latest record
    const users = await Contact.find().sort({ _id: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add new contact
export const postContact = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const postedContact = await contact.save();
    res.status(201).json(postedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//show specified contact with an id
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//edit and update contact
export const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete a contact
export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
