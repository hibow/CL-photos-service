// const server = require('../server/server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
var should = require('chai').should()
chai.use(chaiHttp);
const { expect} = chai;
const env = require('../config.js');
const db = env.db_name === 'neo4j'? 'neo4j':'postgres';


/////////test variable////////////////////
const url = `${env.sr_host}:${env.sr_port}`;
const id = 1000000;
const path = '/product'
const user = 'hibow';
const pTag = 'soda';
const pid = 533;
const delID = 900001;
//CRUD
// beforeEach(async function() {

// });
describe('CURD Test', () => {
  it('should create 1 photo with new pid and pTag', (done) => {
    chai.request(url)
    .post(`${path}/${pid}/${pTag}`)
    .end((err, res)=> {
      expect(err).to.be.null;
      console.log('result: ',res.body);
      if (db === 'postgres') {
        expect(res.body).to.equal(1);
      }else {
        (res.body).should.be.an('object');
        expect(res.body.tagID).to.equal(pid);
      }
      expect(res).to.have.status(201);
      done();
    })
  }).timeout(10000);


  it('should get 5 photos with same tagID as requested photo id', (done) => {
    chai.request(url)
    .get(path+'/'+id)
    .end((err, res)=> {
      expect(err).to.be.null;
      // console.log('result: ',res.body);
      (res.body).should.be.an('array');
      expect(res).to.have.status(200);
      expect(res.body).to.have.lengthOf(5);
      done();
    })
  });
  it('should update 5 photos with same tagID as requested photo id for new username', (done) => {
    chai.request(url)
    .put(`${path}/${id}/${user}`)
    .end((err, res)=> {
      expect(err).to.be.null;
      console.log('result: ',res.body);
      if (db === 'postgres') {
        expect(res.body).to.equal(5);
      }else {
        (res.body).should.be.an('array');
        expect(res.body).to.have.lengthOf(5);
      }
      expect(res).to.have.status(200);
      done();
    })
  });
  it('should delete 1 photos with given photo id', (done) => {
    chai.request(url)
    .delete(`${path}/${delID}`)
    .end((err, res)=> {
      expect(err).to.be.null;
      // console.log('result: ',res.body);
      if (db === 'postgres' && typeof res.body !== 'object') {
        expect(res.body).to.equal(1);
        expect(res).to.have.status(200);
      }else if (db === 'neo4j' && typeof res.body !== 'object') {
        expect(res).to.have.status(200);
      } else if (typeof res.body === 'object') {
        expect(res).to.have.status(204);
      }

      done();
    })
  });
});