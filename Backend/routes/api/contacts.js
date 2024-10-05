const router = require("express").Router();
const Contact = require("../../models/Contact");
const mongoose = require('mongoose');



// @route POST api/facture
// @desc add new facture
// @access Public
router.post("/add_Contact", (req, res) => {
    let { name, email, message = "contacts" } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send({ msg: "Please enter all data" });
    }

    let newContact = new Contact({
        name,
        email,
        message,
    });

    newContact.save().then(() => {
        res.status(201).send({ msg: "Contact added successfully" });
    })
});

// @route   GET api/facture
// @desc    Get all facture
// @access  Private
router.get("/", (req, res) => {
    Contact.find().then((contacts) => res.json(contacts));
});


// @route   PUT api/rdv
// @desc    Update rdv
// @access  Private

// @route   POST api/facture
// @desc    Delete facture
// @access  Private && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        await Contact.findOneAndDelete({ _id: req.params.id })
        res.send("supprimé avec succès")

    }
    catch (err) {
        console.log(err);
    }

});
module.exports = router;