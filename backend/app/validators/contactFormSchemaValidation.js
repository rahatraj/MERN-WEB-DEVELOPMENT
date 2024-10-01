import ContactForm from "../models/contact-form-schema.js";

export const contactFormRegistration = {
    name : {
        exists : {
            errorMessage : 'name is required'
        },
        notEmpty : {
            errorMessage : 'name can not be empty'
        },
        isLength : {
            options : {min : 3},
            errorMessage : 'Name should be minumum 3 characters long'
        },
        trim : true
    },
    email : {
        exists : {
            errorMessage : 'email is required'
        },
        notEmpty : {
            errorMessage : 'email can not be empty'
        },
        isEmail : {
            errorMessage : 'email should be valid format'
        },
        trim : true,
        normalizeEmail : true
    },
    mobile : {
        exists : {
            errorMessage : 'mobile no is required'
        },
        notEmpty : {
            errorMessage : 'mobile no can not be empty'
        },
        isFloat : {
            options : {min : 10},
            errorMessage : 'mobile no should be minimum 10 and maximum 12'
        },
        trim : true
    },
    message : {
        exists : {
            errorMessage : 'message is required'
        },
        notEmpty : {
            errorMessage : 'message can not be empty'
        },
        isLength : {
            options : {min : 10},
            errorMessage : 'length should be atleast 10 characters long'
        },
        trim : true
    }
}