/* eslint-disable */
const Hapi = require('hapi');
const sinon = require('sinon');
const Promise = require('bluebird');
const chai = require('chai');
const responsePlugin = require('../../../../libs/plugins/response');
require('sinon-as-promised')(Promise);

const expect = chai.expect;

describe('Response', () => {
  let server;

  beforeEach(() => {
    server = new Hapi.Server();
    server.connection();
  })

  afterEach((done) => {
    process.env.NODE_ENV = 'development';

    server.stop(done);
  })

  it('should register response plugin success', (done) => {
    server.register(responsePlugin, (error) => {
      if (error) {
        return done(error);
      }

      server.ext('onRequest', (request, reply) => {
        expect(reply.success).to.be.an.instanceof(Function);
        expect(reply.notFound).to.be.an.instanceof(Function);
        expect(reply.serverError).to.be.an.instanceof(Function);

        done();
      });

      server.inject('/');
    });
  });

  it('reply success should return response and status code 200', (done) => {
    server.register(responsePlugin, (error) => {
      if (error) {
        return done(error);
      }

      const expectedResponse = {
        data: []
      };

      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.success(expectedResponse);
        }
      });

      server.inject('/', (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.result).to.deep.equal(expectedResponse);

        done();
      });
    });
  });

  it('reply notFound should return status code 404', (done) => {
    server.register(responsePlugin, (error) => {
      if (error) {
        return done(error);
      }

      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.notFound();
        }
      });

      server.inject('/', (res) => {
        expect(res.statusCode).to.equal(404);

        done();
      });
    });
  });

  it('in development, reply serverError should return response and status code 500', (done) => {
    server.register(responsePlugin, (error) => {
      if (error) {
        return done(error);
      }

      const expectedResponse = {
        data: []
      };

      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.serverError(expectedResponse);
        }
      });

      server.inject('/', (res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.result).to.deep.equal(expectedResponse);

        done();
      });
    });
  });

  it('in production, reply serverError should return empty response and status code 500', (done) => {
    process.env.NODE_ENV = 'production';

    server.register(responsePlugin, (error) => {
      if (error) {
        return done(error);
      }

      const expectedResponse = {
        data: []
      };

      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.serverError(expectedResponse);
        }
      });

      server.inject('/', (res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.result).to.not.deep.equal(expectedResponse);

        done();
      });
    });
  });
});
