const express = require('express');
const router = express.Router();
const {getContacts, getContact , createContact ,updateContact , deleteContact } = require("../controllers/contactControllers");
const validateToken = require('../middleware/validateTokenHandelr');

router.use(validateToken)
router.route("/" ).get(getContacts).post(createContact)
router.route("/:id").put(updateContact).delete(deleteContact).get(getContact)

module.exports = router; 