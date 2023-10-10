const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// secret key
const jwtSecret = "theareebkazialearningmernstackno"

// Sign up
router.post('/createuser',
    body('email', 'Invalid Email').isEmail(),
    // password must be at least 6 chars long
    body('password', 'Incorrect password').isLength({ min: 6 }),
    body('name').isLength({ min: 6 }),

    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

// Login
router.post('/loginuser',
    body('email', 'Invalid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Incorrect password').isLength({ min: 6 }),
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email

        try {
            // All credentials of the user
            const userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: 'Wrong Credentials' });
            }

            const passwordCompare = await bcrypt.compare(req.body.password, userData.password)
            // console.log(passwordCompare);
            if (!passwordCompare) {
                return res.status(400).json({ errors: 'Incorrect password' });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)

            return res.json({ success: true , authToken: authToken})
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

module.exports = router;