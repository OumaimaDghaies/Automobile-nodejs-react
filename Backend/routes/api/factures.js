const router = require("express").Router();
const Facture = require("../../models/Facture");
const mongoose = require('mongoose');



// @route POST api/facture
// @desc add new facture
// @access Public
router.post("/add_Facture", (req, res) => {
    let { users, Date, price, description = "factures" } = req.body;

    if (!users || !Date || !price || !description) {
        return res.status(400).send({ msg: "Please enter all data" });
    }

    Facture.findOne({ _id: _id }).then((facture) => {
        if (facture) {
            return res.status(400).send({ msg: "appointmen tDate already exists" });
        } else {



            let newFacture = new Facture({

                users,  // Replace with an actual user ObjectId
                
                Date,
                price,
                description,

            });

            newFacture.save().then(() => {
                res.status(201).send({ msg: "Facture added successfully" });
            })
        }
    });
});
// @route   GET api/facture
// @desc    Get all facture
// @access  Private
router.get("/", (req, res) => {
    Facture.find().then((factures) => res.json(factures));
});


// @route   PUT api/rdv
// @desc    Update rdv
// @access  Private
router.put("/maj/:id", async (req, res) => {
    try {
        await Facture.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    Date: req.body.Date,
                    price: req.body.price,
                    description: req.body.description
                }
            }
        );
        res.send("Mise à jour avec succès")


    }
    catch (err) {
        console.log(err);
    }

});


// @route   POST api/facture
// @desc    Delete facture
// @access  Private && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        await Facture.findOneAndDelete({ _id: req.params.id })
        res.send("supprimé avec succès")

    }
    catch (err) {
        console.log(err);
    }

});
module.exports = router;