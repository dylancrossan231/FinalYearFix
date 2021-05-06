const Joi = require('@hapi/joi')


//Register Validation

const registerValidation = data =>{
    const schema = {
        email: Joi.string()
        .min(6)
        .required()
        .email(),
    
        password: Joi.string()
        .min(6)
        .required(),
    }
        return schema.validate(data.schema)

}