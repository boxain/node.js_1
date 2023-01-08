/* config.js */
import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// 建立每個變數 joi 驗證規則
const envVarSchema = Joi.object().keys({
  NODE_ENV: Joi.string().default('development').valid('development','production'),
  PORT: Joi.number().default(8080),
  VERSION: Joi.string(),
  MYSQL_HOST : Joi.string().default('127.0.0.1'),
  MYSQL_PORT : Joi.number().default(3306),
  MYSQL_USER : Joi.string(),
  MYSQL_PASS : Joi.string(),
  MYSQL_DATABASE : Joi.string()
}).unknown().required(); // unknown key-value not use


// get from process.env
const {error,value} = envVarSchema.validate(process.env); // return object : error,value,warning,atifacts
if(error)throw new Error(`Config validation error: ${error.message}`)



const config = {
  version:value.VERSION,
  env:value.NODE_ENV,
  port:value.PORT,
  mysql_host:value.MYSQL_HOST,
  mysql_port:value.MYSQL_PORT,
  mysql_user:value.MYSQL_USER,
  mysql_pass:value.MYSQL_PASS,
  mysql_database:value.MYSQL_DATABASE
};

export default config;
