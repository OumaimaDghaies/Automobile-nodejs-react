const router = require("express").Router();
const Rdv_Admin = require("../../models/Rdv_Admin");
const mongoose = require('mongoose');



// @route POST api/personnels
// @desc add new personnel
// @access Public
router.post("/add_Rdv_Admin", (req, res) => {
    let { users, appointmentDate, panneType, description = "rdv_admin" } = req.body;

    if (!users || !appointmentDate || !panneType || !description) {
        return res.status(400).send({ msg: "Please enter all data" });
    }

    Rdv_Admin.findOne({ appointmentDate: appointmentDate }).then((rdv_admin) => {
        if (rdv_admin) {
            return res.status(400).send({ msg: "appointmen tDate already exists" });
        } else {



            let newRdv_Admin = new Rdv_Admin({

                users,  // Replace with an actual user ObjectId
                
                appointmentDate,
                panneType,
                description,

            });

            newRdv_Admin.save().then(() => {
                res.status(201).send({ msg: "Personnel added successfully" });
            })
        }
    });
});

// @route   GET api/rdv
// @desc    Get all rdv
// @access  Private
router.get("/", (req, res) => {
    Rdv_Admin.find().then((rdv_admins) => res.json(rdv_admins));
  });


  // @route   PUT api/rdv
// @desc    Update rdv
// @access  Private
router.put("/maj/:id", async (req, res) => {
    try {
      await Rdv_Admin.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            appointmentDate: req.body.appointmentDate,
            panneType: req.body.panneType,
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


  // @route   POST api/rdv
// @desc    Delete rdv
// @access  Private && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
    console.log(req.params.id);
    try {
      await Rdv_Admin.findOneAndDelete({ _id: req.params.id })
      res.send("supprimé avec succès")
  
    }
    catch (err) {
      console.log(err);
    }
  
  });
module.exports = router;