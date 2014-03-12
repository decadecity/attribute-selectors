/*
 * attribute-selectors
 * https://github.com/decadecity/attribute-selectors
 *
 * Copyright (c) 2014 Orde Saunders
 * Licensed under the MIT license.
 */

/**
 * Provides a basic set of helpers to handle prefixed data attributes.
 *
 * Usage:
 *   Set up a handler using the prefix 'foo':
 *     var attributes = prefixedDataAttributes('foo');
 *   Select an element with the attribute 'bar':
 *     var element = attributes.slect('bar')[0];
 *   Set some test data with the key 'baz' on the element:
 *     attributes.set(element, 'baz', JSON.stringify({ 'test_data': true }));
 *   Retrieve the data from the element:
 *     var data = JSON.parse(attributes.get(element, 'baz'));
 *
 * @param prefix {string} Prefix to use. (Optional, defaults to 'dc'.)
 */
function prefixedDataAttributes (data_prefix) {

  if (typeof data_prefix !== 'string') {
    data_prefix = 'dc';
  }
  data_prefix = data_prefix.toLowerCase();

  /**
   * Builds a data attribute name using the configured prefix.
   *
   * @param attribute {string} Attribute name you wish to use.
   *
   * @returns {string} Attribute name with configured prefix.
   */
  function getDataAttributeName(attribute) {
    if (data_prefix.length) {
      attribute = data_prefix + attribute.slice(0, 1).toUpperCase() + attribute.slice(1);
    }
    return attribute;
  }

  /**
   * Gets a data attribute value.
   *
   * @param element {element} DOM element from which to get the data.
   * @param attribute {element} Name of attribute to get.
   *
   * @returns {mixed} Value of data attribute.
   */
  function getDataAttribute(element, attribute) {
    return element.dataset[getDataAttributeName(attribute)];
  }

  /**
   * Sets a data attribute value.
   *
   * @param element {element} DOM element on which to set the data.
   * @param attribute {element} Name of attribute to set.
   * @param value {mixed} Data to set on attribute.
   */
  function setDataAttribute(element, attribute, value) {
    element.dataset[getDataAttributeName(attribute)] = value;
  }

  /**
   * Selects elements based on a data attribute with an optional value.
   *
   * @param attribute {string} Attribute name to select.
   * @param value {string} Value of attribute to use in selector. (Optional)
   * @param parent {element} DOM element on which to base selection. (Optional, defaults to `document`.)
   *
   * @returns {NodeList} Elements that match the selector.
   */
  function queryElementByAttributeAll(attribute, value, parent) {
    parent = parent || document;

    var selector = '[data';
    if (data_prefix.length) {
      selector += '-' + data_prefix;
    }
    selector += '-' + attribute;
    if (typeof value !== 'undefined') {
      selector += '="' + value + '"';
    }
    selector += ']';

    return parent.querySelectorAll(selector);
  }

  return {
    'select': queryElementByAttributeAll,
    'set': setDataAttribute,
    'get': getDataAttribute
  };

}
