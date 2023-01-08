/* article.module.js */
import mysql from 'mysql';
import config from '../../config/config';
const jwt = require('jsonwebtoken');

const connectionPool = mysql.createPool({
  connectionLimit:10 , // limit connection amount
  host:config.mysql_host,
  user:config.mysql_user,
  password:config.mysql_pass,
  database:config.mysql_database
});

/* Article POST */
const createArticle = (insertValues) => {
  return new Promise((resolve,reject) =>{
    connectionPool.getConnection((connectionError,connection)=>{
      if(connectionError){
        reject(connectionError);
      }else{
        connection.query('INSERT INTO article SET ?',insertValues ,
        (error,results)=>{
            if(error){
              console.error('SQL error: ',error); // return insert_MySQL'error
            }else if(results.affectedRows===1){
              resolve(`新增成功 ! article_id: ${results.insertId}`);
            }
            connection.release();
        });
      }
    });

  });
};

/*  Article GET */
const selectArticle = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          'SELECT * FROM Article', (error, results) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error);
            } else {
              resolve(results);
            }
            connection.release();
          }
        );
      }
    });
  });
};


/* Article PUT */
const modifyArticle = (insertValues,userId) => {
  return new Promise((resolve,reject) => {
    connectionPool.getConnection( (connectionError,connection) =>{
      if(connectionError){
        reject(connectionError);
      }else{
        connection.query('UPDATE Article SET ? WHERE article_id = ?',
        [insertValues,userId],(error,results) => {
          if(error){
            console.error('SQL error:' , error);
            reject(error);

          }else if(results.affectedRows===0){
            // Not found
            resolve('check your user_id')

          }else if(results.affectedRows===1){
            resolve("success !")

          }else{
            resolve('No change')
          }
          connection.release();
        });
      }
    });
  });
};



/* Article DELETE */
const deleteArticle = (userId) => {
  return new Promise((resolve,reject) => {
    connectionPool.getConnection((connectionError,connection)=>{
      if(connectionError){
        reject(connectionError);
      }else{
        connection.query('DELETE FROM Article WHERE article_id = ?',
        userId , (error,results)=>{
          if(error){
            console.error('sql error : ',error);
          }else if(results.affectedRows===1){
            resolve('success !');
          }else{
            resolve('no change');
          }
          connection.release();
        });
      }
    });
  });
};



/* Article GET JWT */
const selectPersonalArticle = (token) =>{
  return new Promise((resolve,reject) =>{
    jwt.verify(token,'my_secret_key',(err,decoded)=>{
      if(err){
        reject(err);
      }else{
        // JWT success -> get user_id
        const userId = decoded.payload.user_id;
        connectionPool.getConnection((connectionError,connection)=>{
          if(connectionError){
            reject(connectionError);
          }else{
            connection.query('select * from article where user_id=?',
            [userId],(err,results)=>{
              if(err){
                reject(err);
              }else{
                resolve(results);
              }
              connection.release();
            });
          }
        });
      }

    });
  });
};


export default {createArticle,selectArticle,modifyArticle,deleteArticle,selectPersonalArticle};
