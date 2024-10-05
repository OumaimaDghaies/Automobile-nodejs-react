const router = require("express").Router();
const Rdv_Admin = require("../../models/Rdv_Admin");
const mongoose = require('mongoose');
const Rdv_Client = require("../../models/Rdv_Client");



// @route POST api/personnels
// @desc add new personnel
// @access Public
router.post("/add_Rdv_Client", (req, res) => {
    let { phone_number, appointmentDate, panneType, description = "rdv_client" } = req.body;

    if (!phone_number || !appointmentDate || !panneType || !description) {
        return res.status(400).send({ msg: "Please enter all data" });
    }

    Rdv_Client.findOne({ appointmentDate: appointmentDate }).then((rdv_client) => {
        if (rdv_client) {
            return res.status(400).send({ msg: "appointment Date already exists" });
        } else {



            let newRdv_Client = new Rdv_Client({

                phone_number,  
                appointmentDate,
                panneType,
                description,

            });

            newRdv_Client.save().then(() => {
                res.status(201).send({ msg: "Appointment added successfully" });
            })
        }
    });
});
router.get("/", (req, res) => {
    Rdv_Client.find().then((rdv_clients) => res.json(rdv_clients));
  });


  
  // @route   POST api/rdv
// @desc    Delete rdv
// @access  Private && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
    console.log(req.params.id);
    try {
      await Rdv_Client.findOneAndDelete({ _id: req.params.id })
      res.send("supprimé avec succès")
  
    }
    catch (err) {
      console.log(err);
    }
  
  });
module.exports = router;