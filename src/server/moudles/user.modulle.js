/* user.module.js */
import mysql from 'mysql';
import config from '../../config/config';
import bcrypt from 'bcrypt';
import AppError from '../helper/AppError';
const jwt = require('jsonwebtoken');

const connectionPool = mysql.createPool({
  connectionLimit:10,
  host:config.mysql_host,
  user:config.mysql_user,
  password:config.mysql_pass,
  database:config.mysql_database
});

/* User POST */
const createUser = (insertValues)=>{
  return new Promise((reslove,reject)=>{
    connectionPool.getConnection((connectionError,connection)=>{
      if(connectionError){
        reject(connectionError);
      }else{
        connection.query('INSERT INTO User SET ?',
        insertValues,(err,results)=>{
          if(err){
            console.error(err);
            reject('sql error :',err);
          }else if(results.affectedRows===1){
            reslove('sucess !');
          }else{
            reslove('no change');
          }
          connection.release();
        });
      }
    });
  });
};

/* User GET */
const selectUser = ()=>{
  return new Promise((resolve,reject)=>{
    connectionPool.getConnection((connectionError,connection)=>{
      if(connectionError){
        reject(connectionError);
      }else{
        connection.query('select * from user',(err,results)=>{
          if(err){
            console.error('sql err :',err);
            reject('sql err :',err);

          }else{
            resolve(results);
          }
          connection.release();
        });
      }
    });
  });


};

/* User PUT */
const modifyUser = (insertValues,userId) => {
  return new Promise((resolve,reject)=>{
    connectionPool.getConnection((connectionError,connection)=>{
      if(connectionError){
        reject(connectionError);
      }else{
        connection.query('update user set ? where user_id = ?',
        [insertValues,userId],(err,results)=>{
          if(err){
            console.error('sql error :',err);
            reject('sql error :',err);
          }else if(results.affectedRows===0){
            resolve('check your userId');
          }else{
            resolve('success !');
          }
          connection.release();
        });
      }
    });
  });
};

/* User DELETE */
const deleteUser = (userId) => {
  return new Promise((resolve,reject)=>{
    connectionPool.getConnection((connectionError,connection)=>{
      if(connectionError){
        reject(connectionError);
      }else{
        connection.query('delete from user where user_id = ?',
        userId,(err,results)=>{
          if(err){
            console.error('sql error :',err);
            reject(err);
          }else if(results.affectedRows===1){
            resolve('sucess !');
          }else{
            resolve('no change');
          }
          connection.release();
        });
      }
    });
  });
};

/* User GET(Login)登入取得資訊 */
const selectUserLogin = (insertValues)=>{
  return new Promise((resolve,reject)=>{
    connectionPool.getConnection((connectionError,connection)=>{
      if(connectionError){
        reject(connectionError);
      }else{
        connection.query("select * from user where user_mail=?",
        insertValues.user_mail,(err,results)=>{
          if(err){
            console.error('sql error:',err);
            reject('sql err',err);
          }else if(Object.keys(results).length === 0){  // length is arrtribute not a function
            reject(new AppError.LoginError1());
          }else{
            const dbHashPassword = results[0].user_password;
            const userPassword = insertValues.user_password;
            bcrypt.compare(userPassword,dbHashPassword).then((res)=>{
              if(res){
                // use JWT
                const payload = {
                  user_id:results[0].user_id,
                  user_name:results[0].user_name,
                  user_mail:results[0].user_mail
                };
                const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, 'my_secret_key'); // docu
                resolve(Object.assign({code:200} , {message:'登入成功',token})); // google
              }else{
                reject(new AppError.LoginError2());
              }
            }); // then
          } // else
          connection.release();
        }); //query
      } // else
    }); //getconnection
  });  //Promise
};



export default {createUser,selectUser,modifyUser,deleteUser,selectUserLogin};
