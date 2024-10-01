import {Schema,model} from "mongoose";

const contactformSchema = new Schema({
    name : String,
    email : String,
    mobile : String,
    message : String,
}, {timestamps : true})

const ContactForm = model('ContactForm', contactformSchema)

export default ContactForm;