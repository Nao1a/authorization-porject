const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactsModel")



const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
})

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    // Ensure phone number is unique
    const existingContact = await Contact.findOne({ phone });
    if (existingContact) {
        res.status(400);
        throw new Error("Phone number already exists");
    }
    console.log(req.user.id);
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Only update provided fields, keep others unchanged
    const allowedUpdates = ['name', 'email', 'phone'];
    allowedUpdates.forEach(field => {
        if (req.body[field] !== undefined) {
            contact[field] = req.body[field];
        }
    });

    const updatedContact = await contact.save();
    res.status(200).json(updatedContact);
});



const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully", contact });
});


module.exports = {getContacts, getContact , createContact ,updateContact , deleteContact }