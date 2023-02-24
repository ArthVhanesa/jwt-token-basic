// check username, password in post(login) request
// if exists create new JWT
// send back to front-end

//set-up authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors/index')

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please enter username and password')
    }

    // ID is for demo. Actual value will be provided from db
    const id = Date.now()

    // try to keep payload small, for better user experience
    // make JWT_TOKEN var in .env file, and make it long and unguessable in production environment  
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {

    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })

}

module.exports = { login, dashboard }