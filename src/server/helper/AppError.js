import httpStatus from "http-status";

/*
  @extends Error
*/

// 繼承改寫建構子
class ExtendableError extends Error{
  // 建構子
  constructor(message,status,isPublic,code){
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this,this.constructor); // 錯誤調用堆棧
  }
}

/**
 *mail no register
  @extends ExtendableError
 */
class LoginError1 extends ExtendableError{
  /**
   *Creates an API error.
   *@param {string} message - Error messaage.
   *@param {number} status - HTTP status code of error.
   *@param {boolean} isPublic - Whether the message should be visible to user or not.
   */

  constructor(message='信箱尚未註冊!',status=httpStatus.NOT_FOUND,isPublic=true,code=401){
    super(message,status,isPublic,code);
    this.name = 'LoginError';
  }
}

/**
 * password error
 * @extends ExtendableError
 */
class LoginError2 extends ExtendableError{
  /**
   * Create an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message='輸入的密碼有誤',status=httpStatus.NOT_FOUND,isPublic=true,code=401){
    super(message,status,isPublic,code);
    this.name='LoginError';
  }
}


export default {LoginError1,LoginError2};






