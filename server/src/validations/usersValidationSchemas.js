const { checkSchema } = require('express-validator')

const loginValidationSchema = checkSchema({
    email: {
        optional: false,
        isEmail: {
            errorMessage: "must be a valid email address"
        },
    },
    password: {
        // in: 'body',
        optional: false,
        isString: {
            errorMessage: "Password is Required",
        }
    }
})

const signupValidationSchema = checkSchema({
    email: {
        optional: false,
        isEmail: {
            errorMessage: "must be a valid email address"
        },
    },
    name: {
        optional: false,
        isString: {
            errorMessage: "name must be a valid string"
        },
        isLength: {
            options: {
                min: 5
            },
            errorMessage: "Password should 5 or more char"
        }
    },
    password: {
        optional: false,
        isString: {
            errorMessage: "Password is Required",
        },
        isLength: {
            options: {
                min: 8
            },
            errorMessage: "Password should 8 or more char"
        },
    }
})

module.exports = {
    loginValidationSchema,
    signupValidationSchema
}