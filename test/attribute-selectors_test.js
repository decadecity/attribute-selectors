(function() {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  var attributes = prefixedDataAttributes();

  test('Interface', function() {
    strictEqual(typeof attributes, 'object', 'is an object');
    strictEqual(typeof attributes.set, 'function', 'set is a function');
    strictEqual(typeof attributes.get, 'function', 'get is a function');
    strictEqual(typeof attributes.select, 'function', 'select is a function');
  });

  test('Select (default prefix)', function () {
    strictEqual(attributes.select('test')[0].id, 'test-default-prefix0', 'selects correct item - no attribute, no parent.');
    strictEqual(attributes.select('test', 'test')[0].id, 'test-default-prefix1', 'selects correct item - attribute, no parent.');
    strictEqual(attributes.select('test', 'test', document.querySelector('#default-prefix'))[0].id, 'test-default-prefix1', 'selects correct item - attribute, parent.');
  });

  test('Get (default prefix)', function () {
    var element = document.querySelector('#test-default-key');
    strictEqual(attributes.get(element, 'key'), 'value', 'retrieved data set in markup');
  });

  test('Set (default prefix)', function () {
    var element = document.querySelector('#test-default-key');
    strictEqual(attributes.get(element, 'setter'), undefined, 'data initially unset');
    attributes.set(element, 'setter', 'this is a test');
    strictEqual(attributes.get(element, 'setter'), 'this is a test', 'data correctly retrieved');
  });


  var attributes1 = prefixedDataAttributes('');

  test('Select (no prefix)', function () {
    strictEqual(attributes1.select('test')[0].id, 'test-no-prefix0', 'selects correct item - no attribute, no parent.');
    strictEqual(attributes1.select('test', 'test')[0].id, 'test-no-prefix1', 'selects correct item - attribute, no parent.');
    strictEqual(attributes1.select('test', 'test', document.querySelector('#no-prefix'))[0].id, 'test-no-prefix1', 'selects correct item - attribute, parent.');
  });

  test('Get (no prefix)', function () {
    var element = document.querySelector('#test-no-key');
    strictEqual(attributes1.get(element, 'key'), 'value', 'retrieved data set in markup');
  });

  test('Set (no prefix)', function () {
    var element = document.querySelector('#test-no-key');
    strictEqual(attributes1.get(element, 'setter'), undefined, 'data initially unset');
    attributes1.set(element, 'setter', 'this is a test');
    strictEqual(attributes1.get(element, 'setter'), 'this is a test', 'data correctly retrieved');
  });

  var attributes2 = prefixedDataAttributes('other');

  test('Select (custom prefix)', function () {
    strictEqual(attributes2.select('test')[0].id, 'test-custom-prefix0', 'selects correct item - custom attribute, custom parent.');
    strictEqual(attributes2.select('test', 'test')[0].id, 'test-custom-prefix1', 'selects correct item - attribute, custom parent.');
    strictEqual(attributes2.select('test', 'test', document.querySelector('#custom-prefix'))[0].id, 'test-custom-prefix1', 'selects correct item - attribute, parent.');
  });

  test('Get (custom prefix)', function () {
    var element = document.querySelector('#test-custom-key');
    strictEqual(attributes2.get(element, 'key'), 'value', 'retrieved data set in markup');
  });

  test('Set (custom prefix)', function () {
    var element = document.querySelector('#test-custom-key');
    strictEqual(attributes2.get(element, 'setter'), undefined, 'data initially unset');
    attributes2.set(element, 'setter', 'this is a test');
    strictEqual(attributes2.get(element, 'setter'), 'this is a test', 'data correctly retrieved');
  });

}());
