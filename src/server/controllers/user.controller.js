/*  user.controller.js */
import userModulle from "../moudles/user.modulle";
import bcrypt from "bcrypt";

/* User Post */
const userPost = (req , res)=>{
  const saultround = bcrypt.genSaltSync(10);
  const insertValues = {
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password,saultround)
    /*
    hashSync -> 同步加密，return hash
    hash -> 非同步加密，return Promise物件
    */
  };

  userModulle.createUser(insertValues).then((results)=>{
    res.send(results);
  }).catch((error)=>{return res.send(error);});
};


/* User GET */
const userGet = (req,res)=>{
  userModulle.selectUser().then((results)=>{
    res.send(results);
  }).catch((err)=>{
    res.send(err);
  });
};


/* User PUT */
const userPut = (req,res)=>{
  const userId = req.params.user_id;
  const insertValues = req.body;
  userModulle.modifyUser(insertValues,userId).then((results)=>{
    res.send(results);
  }).catch((err)=>{
    res.send(err);
  })
};


/* User DELETE */
const userDelete = (req,res)=>{
  const userId = req.params.user_id;
  userModulle.deleteUser(userId).then((results)=>{
    res.send(results);
  }).catch((err)=>{
    res.send(err);
  });
};


/* User POST LOGIN */
const userLogin = (req,res,next)=>{
  const insertValues = req.body;
  userModulle.selectUserLogin(insertValues).then((results)=>{
    res.send(results);
  }).catch((err)=>{next(err);});
};

export default { userPost , userGet , userPut , userDelete, userLogin};
