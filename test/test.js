
describe('path-lookup', function(){

  var lookup = require('path-lookup');
  var assert = require('assert');
  var cases = require('case');

  describe('#keys', function(){
    it('should return an array of keys', function(){
      var keys = lookup.keys({ a: { B: 0 } }, 'a.b', [cases.upper]);
      assert('a' == keys.shift());
      assert('B' == keys.shift());
    })

    it('should return null if path wasnt found', function(){
      assert(null == lookup.keys({}, 'a.b.c'));
    })
  })

  describe('on success', function(){
    it('should return the complete path', function(){
      assert("['a']['b']" == lookup({ a: { b: 0 } }, 'a.b'));
    })

    it('should find first_name', function(){
      var obj = { user: { first_name: 'amir' } };
      assert("['user']['first_name']" == lookup(obj, 'User.firstName', [
        cases.lower,
        cases.snake
      ]));
    })

    it('should respect given functions', function(){
      assert("['a']['B']" == lookup({ a: { B: 0 } }, 'a.b', [cases.upper]));
    })

    it('should check all given functions', function(){
      var obj = { a: { company: { created_at: 2013 } } };
      assert("['a']['company']['created_at']" == lookup(obj, 'a.Company.createdAt', [
        cases.camel,
        cases.capital,
        cases.constant,
        cases.dot,
        cases.inverse,
        cases.lower,
        cases.none,
        cases.pascal,
        cases.sentence,
        cases.slug,
        cases.space,
        cases.title,
        cases.upper,
        cases.snake,
      ]));
    })

    it('should not break when dumb keys are given', function(){
      var obj = { '\'a': { created_at: 2013 } };
      var path = lookup(obj, '\'a.created_at');
    })
  })

  describe('on failure', function(){
    it('should return undefined', function(){
      assert(null == lookup({}, 'a.b.c.d.created_at', [cases.camel]));
    })
  })

})
