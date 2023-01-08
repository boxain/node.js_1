/* article.controller.js */
import { token } from 'morgan';
import articleModule from '../moudles/article.module';

/* Article POST */
const articlePost = (req,res) => {
  const insertValues = req.body;
  articleModule.createArticle(insertValues).then((result)=>{
    res.send(result);
  }).catch((err)=>{ return res.send(err);});

};


/* Article GET */
const articleGet = (req,res) => {
  articleModule.selectArticle().then((result) => {
    res.send(result);
  }).catch((err)=>{ return res.send(err);});
};


/* Article PUT */
const articlePut = (req,res) => {
  const userId = req.params.article_id;
  const insertValues = req.body;
  articleModule.modifyArticle(insertValues,userId).then((results)=>{
    res.send(results);
  }).catch((error)=>{res.send(error);});
};


/* Article DELETE */
const articleDelete = (req,res) => {
  const userId = req.params.article_id;
  articleModule.deleteArticle(userId).then((results)=>{
    res.send(results);
  }).catch((error)=>{res.send(error);})
};


/* Article GET JWT */
const articlePersonalGet = (req,res) =>{
  articleModule.selectPersonalArticle(req.token).then((result)=>{
    res.send(result);
  }).catch((err)=>{return res.status(401).send(err);})
};


export default {articlePost , articleGet , articlePut , articleDelete , articlePersonalGet};
