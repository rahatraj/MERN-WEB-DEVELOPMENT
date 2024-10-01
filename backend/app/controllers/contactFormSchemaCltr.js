import { json } from "express";
import ContactForm from '../models/contact-form-schema.js'
import {validationResult} from 'express-validator'
import nodemailer from 'nodemailer'

const contactFormCltr = {}
let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'rahatalam1099@gmail.com',
        pass : 'bevk qwem gsgl ynlr'
    },

})

contactFormCltr.register = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const {name, email, mobile, message} = req.body
    try {
        const info = await transporter.sendMail({
            from : `Rahat Reza <rahatalam1099@gmail.com>`,
            to : process.env.ADMIN_EMAIL,
            subject : 'New Contact Form Submission',
            html : `<p>Hello Admin,</p>
                    <p>A new contact form has been submitted with the following details : </p><br>
                    <ul>
                        <li>Name : ${name}</li>
                        <li>Email : ${email}</li>
                        <li>Mobile : ${mobile}</li>
                        <li> message : ${message}</li>
                    </ul>`
                    
        })
        const newContactForm =  new ContactForm({name,email,mobile,message}) 
        await newContactForm.save()
        console.log('Email sent : '+ info.messageId)
        return res.status(201).json(
            {  message : 'Contact form submitted and Email sent succesfully',
                contactForm : newContactForm,
                mailInfo : info
            }

        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'something went wrong!'})
    }
}

contactFormCltr.list = async (req,res) => {
    try{
        const user = await ContactForm.find()
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json({error : 'Unable to retrieve contact message'})
    }
}
export default contactFormCltr;