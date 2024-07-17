const asyncWrapper = require("../middleware/async");
const User = require("../models/User");

const registerUser = asyncWrapper(async (req, res) => {
    console.log("Request: ", req.body)
    const user = await User.create(req.body);
    res.status(201).json({user});
    res.status(201).json({message: "User registered successfully"});
});

const loginUser = asyncWrapper(async (req, res) => {
    // console.log("Request: ", req)
    const {email, password} = req;
    await User.findOne({email: email})
        .then(
            (user) => {
                if (user.password === password) {
                    res.status(201).json({message: "User logged in successfully"})
                } else {
                    res.status(401).json({message: "User not found"})
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        );
    // res.status(201).json({user});
    // res.status(201).json({message: "User logged in successfully"})
});

module.exports = {
    registerUser,
    loginUser
}

