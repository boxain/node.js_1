/* article.test.js */
/* global describe it before */

import { expect } from 'chai';
import { SuperTest } from 'supertest';
require('../dist/index.bundle');

const api = SuperTest('http://localhost:3000/api'); // define test api route
let APItoken; // 全域變數等待 before() 取得Token

before((done)=>{
  api.post('/user/login') // login test
    .set('Accept' , 'application/json') //?
    .send({
      user_mail:'andy@gmail.com',
      user_password:'password10'
    })
    .expect(200)
    .end((err,res)=>{
      APItoken = res.body.token; // login success and get token
      done();
    });
});

describe('Article',()=>{
  it('Article should be an object with keys and values',(done)=>{
    api.get('/article')
      .expect(200)
      .end((err,res)=>{
        if(err){
          done(err);
        }
        // 斷言做資料驗證
        expect(res.body[0]).to.have.property('article_id');
        expect(res.body[0].article_id).to.be.a('number');
        expect(res.body[0]).to.have.property('user_id');
        expect(res.body[0].article_id).to.be.a('number');
        expect(res.body[0]).to.have.property('article_title');
        expect(res.body[0].article_id).to.be.a('string');
        expect(res.body[0]).to.have.property('article_tag');
        expect(res.body[0].article_id).to.be.a('string');
        expect(res.body[0]).to.have.property('article_content');
        expect(res.body[0].article_id).to.be.a('string');
        done();
      });
  });
  it('should return a 200 response',(done)=>{
    api.get('/article/personal') // test who get all article
      .set('Authorization',`Bearer ${APItoken}`)
      .expect(200,done);
  });
});












