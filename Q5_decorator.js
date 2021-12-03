/**
 * Q5) Write a decorator function/class in Django or KoaJS which when applied to a (Django View) or (KoaJS Controller), returns 405 HTTP error on a GET request but behaves normally on POST.
 */

 require('@babel/register');
 const Koa = require('koa');
 const { route , router } = require('koa-decorators')
 const app = new Koa();
 
 class UserController {
     @router({method: 'POST', path: '/sample'})
     async getUserById(ctx) {
       ctx.body = 'saved data'
     }
 
     @router({method: 'all', path: '*'})
     async defaultRes(ctx) {
         ctx.throw(405, 'bad request');
     }
 }
 
 route(app, `UserController`);
 
 app.listen(6956, () => {
     console.log('listening on ', 6956)
 });