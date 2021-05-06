const Joi = require('@hapi/joi');


//validation register
const registerValidation = data =>{
const schema = {
    email: Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
};

 return schema.validate(data,schema);

}

//login register
const loginValidation = data =>{
    const schema = {
        email: Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    };
    
     return schema.validate(data,schema);
    
    }

    
module.exports.loginValidation = registerValidation;
module.exports.registerValidation = registerValidation;