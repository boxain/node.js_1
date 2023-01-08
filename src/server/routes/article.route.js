/* article.route.js */
import articleCtrl from '../controllers/article.controller';
import paramValidation from '../../config/param-validation';
import express from 'express';
const {validate} = require('express-validation');

const router = express.Router();
router.route('/').get(articleCtrl.articleGet);
router.post('/',validate(paramValidation.createArticle,{},{}),articleCtrl.articlePost); // use validate
router.route('/:article_id').put(articleCtrl.articlePut);
router.route('/:article_id').delete(articleCtrl.articleDelete);

/* use MiddLeware get Header's Rearer Token */
const ensureToken = (req,res,next) =>{
  const bearerHeader = req.headers.authorization;
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]; // get JWT
    req.token = bearerToken;
    next();
  }else{
    res.status(403).send(Object.assign({code:403},{message:"您尚未登入"}));
  }
};

router.get('/personal' , ensureToken , articleCtrl.articlePersonalGet);


export default router;
