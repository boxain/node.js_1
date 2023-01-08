import express from 'express';
import config from '../../config/config';
import mysql from 'mysql';
import article from './article.route';
import user from './user.route';


const router = express.Router();


/* GET localhost:[port]/api page. */
router.get('/',(req,res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

/* MySQL connect test */
router.get('/sqlTest',(req,res)=>{
  const connectionPool = mysql.createPool({
    connectionLimit:10 , // limit connection amount
    host:config.mysql_host,
    user:config.mysql_user,
    password:config.mysql_pass,
    database:config.mysql_database
  });

  // return err:error , connection:use query with mysql
  connectionPool.getConnection((err,connection)=>{
    if (err){
      res.send(err);
      console.log('連線失敗 !');
    }else{
      res.send(connection);
      console.log('連線成功 !');
    }
  });
});



router.use('/user',user);
router.use('/article',article);



export default router;
