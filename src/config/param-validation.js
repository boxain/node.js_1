/* param=validation.js */
const {Joi} = require('express-validation');


// route:/api/article , method:POST
const createArticle ={
  body: Joi.object({
    user_id:Joi.number().required(),  // figure+required
    article_title:Joi.string().required(),
    article_tag:Joi.string().required(),
    article_content:Joi.string().min(20).required()
  })
};

// route:/api/user , method:POST
const createUser ={
  body:Joi.object({
    user_name:Joi.string().required(),
    user_mail:Joi.string().email().trim().required(),// restrict emial form
    user_password:Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required()
  })
};



export default {createArticle,createUser};
