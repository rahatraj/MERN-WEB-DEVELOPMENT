import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import configureDB from './config/db.js'
configureDB()
import cors from 'cors'
import contactFormCltr from './app/controllers/contactFormSchemaCltr.js'
import { checkSchema } from 'express-validator'
import { contactFormRegistration } from './app/validators/contactFormSchemaValidation.js'
import secretKeyAuthencate from './app/middlewares/secretkeyAuthenticate.js'
const app = express()
const port = 3030;
app.use(cors())
app.use(express.json())

app.post('/contacts', checkSchema(contactFormRegistration), contactFormCltr.register)
app.get('/contacts', secretKeyAuthencate, contactFormCltr.list)
app.listen(port, () => {
    console.log(`app is running on the port ${port}`)
})