/* express.js */
import express from 'express';
import config from './config';
import index from '../server/routes/index.route';
import bodyParser from 'body-parser'; // middleware
import cors from 'cors'; // middleware
import morgan from 'morgan'; // middleware
import AppError from '../server/helper/AppError';
import httpStatus from 'http-status';

const app = express();

// set middleware before your route
// parse body params and attache them to req.body
app.use(bodyParser.json()); // 解析json格式的中间件。这个中间件能接受任何body中任何Unicode编码的字符
app.use(bodyParser.urlencoded({extended:true})); // 这个中间件用来解析body中的urlencoded字符
/*
extended: false：表示使用系统模块querystring来处理，也是官方推荐的
extended: true：表示使用第三方模块qs来处理
*/

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
// HTTP request logger middleware for node.js
app.use(morgan('dev'));



/* GET home page. */
app.get('/',(req,res)=>{
  res.send(`server started on port http://127.0.0.1:${config.port} (${config.env})`);
});

app.use('/api',index) // 該路由詳細內容寫在index裡

export default app


