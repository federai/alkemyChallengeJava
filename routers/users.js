const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPass = "password";
const sequelize = require("../database/server");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = new express.Router();

router.use(express.json());
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/auth/login", (req, res) => {
  let o = {
    email: req.body.email,
    password: req.body.password,
  };

  let values = { email: o.email, password: o.password };

  sequelize
    .query("SELECT * FROM users WHERE email= :email", {
      replacements: values,
      type: sequelize.QueryTypes.SELECT,
    })
    .then((user) => {
      if (user.length >= 1) {
        if (user[0].password == o.password) {
          var j = {
            user_id: user[0].id,
          };
          var token = jwt.sign(j, jwtPass);
          return res.status(200).json({ token: token });
        }
      }

      return res
        .status(400)
        .json({ status_code: 400, message: "Incorrect email or password" });
    });
});

router.post("/auth/register", (req, res) => {
    let o = {
      email: req.body.email,
      password: req.body.password
    };
  
    let values = {
      email: o.email,
      password: o.password
    };
    sequelize
      .query("SELECT * FROM users WHERE email = :email ", {
        replacements: values,
        type: sequelize.QueryTypes.SELECT,
      })
      .then((projects) => {
        if (projects.length >= 1) {
          return res
            .status(400)
            .json({ status_code: 400, message: "User already exists" });
        }
        sequelize
          .query(
            "INSERT INTO users (email,password) values (:email,:password)",
            { replacements: values }
          )
          .then((c) => res.status(201).json({ message: "New user Created" }))
          .catch((err) => console.log(err));
      });
  });

module.exports = router;
