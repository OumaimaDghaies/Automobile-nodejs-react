const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");

const auth = require("../../middleware/auth");
const Car = require("../../models/Car");



// @route POST api/cars
// @desc add new car
// @access Public
router.post("/add_car", (req, res) => {
    let { matricule, brand, model, year, color, price, transmission, doors, seats, fuelType, description, carImage = "car" } = req.body;

    if (!matricule || !brand || !model || !year || !color || !price || !transmission || !doors || !seats || !fuelType || !description || !carImage) {
        return res.status(400).send({ msg: "Please enter all data" });
    }
    Car.findOne({ matricule: matricule }).then((car) => {
        if (car) {
            return res.status(400).send({ msg: "Matricule already exists" });
        } else {
            let newCar = new Car({
                matricule,
                brand,
                model,
                year,
                color,
                price,
                transmission,
                doors,
                seats,
                fuelType,
                carImage,
                description
            })


            newCar.save().then(() => {
                res.status(201).send({ msg: "Car added successfully" });
            })
        }
    });

}
);











// @route   GET api/cars
// @desc    Get all cars
// @access  Private
router.get("/", (req, res) => {
    Car.find().then((cars) => res.json(cars));
});


// @route   PUT api/cars
// @desc    Update car
// @access  Private
router.put("/maj/:id", async (req, res) => {
    try {
        await Car.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    brand: req.body.brand,
                    model: req.body.model,
                    year: req.body.year,
                    color: req.body.color,
                    price: req.body.price,
                    transmission: req.body.transmission,
                    doors: req.body.doors,
                    seats: req.body.seats,
                    fuelType: req.body.fuelType,
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

// @route   POST api/cars
// @desc    Delete car
// @access  Private && ADMIN
router.delete("/supprimer/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        await Car.findOneAndDelete({ _id: req.params.id })
        res.send("supprimé avec succès")

    }
    catch (err) {
        console.log(err);
    }

});
module.exports = router;