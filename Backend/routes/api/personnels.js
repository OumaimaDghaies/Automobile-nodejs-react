const router = require("express").Router();
const Personnel = require("../../models/Personnel");



// @route POST api/personnels
// @desc add new personnel
// @access Public
router.post("/add_personnel", (req, res) => {
  let { fname, lname, email, birth_date, phone_number, cin, address, gender, date_emb, salary = "personnel" } = req.body;

  if (!fname || !lname || !email || !birth_date || !phone_number || !cin || !address || !gender || !date_emb || !salary) {
    return res.status(400).send({ msg: "Please enter all data" });
  }

  Personnel.findOne({ cin: cin }).then((personnel) => {
    if (personnel) {
      return res.status(400).send({ msg: "CIN already exists" });
    } else {
      let newPersonnel = new Personnel({
        fname,
        lname,
        email,
        birth_date,
        phone_number,
        cin,
        address,
        gender,
        date_emb,
        salary,
      });

      newPersonnel.save().then(() => {
        res.status(201).send({ msg: "Personnel added successfully" });
      })
    }
  });
});








// @route   GET api/personnels
// @desc    Get all personnels
// @access  Private
router.get("/", (req, res) => {
  Personnel.find().then((personnels) => res.json(personnels));
});


// @route   PUT api/personnels
// @desc    Update personnel
// @access  Private
router.put("/maj/:id", async (req, res) => {
  try {
    await Personnel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          birth_date: req.body.birth_date,
          phone_number: req.body.phone_number,
          cin: req.body.cin,
          address: req.body.address,
          gender: req.body.gender,
          date_emb: req.body.date_emb,
          salary: req.body.salary
        }
      }
    );
    res.send("Mise à jour avec succès")


  }
  catch (err) {
    console.log(err);
  }

});

// @route   POST api/personnels
// @desc    Delete personnel
// @access  Private && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await Personnel.findOneAndDelete({ _id: req.params.id })
    res.send("supprimé avec succès")

  }
  catch (err) {
    console.log(err);
  }

});
module.exports = router;