const { checkSchema } = require('express-validator')

const getApplicationsByUserIdValidationSchema = checkSchema({
    id: {
        in: 'params',
        optional: false,
        isNumeric: {
            errorMessage: "Id must be a valid number"
        },
    }
})

module.exports = {
    getApplicationsByUserIdValidationSchema
}