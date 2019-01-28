/**
 * Immutably copies an object with all of the original properties with the
 * exception of the property identified by `propName`.
 *
 * Note that this function only works on an object nested one level deep.
 *
 * @param {Object} obj
 * @param {string} propName Cercing to string since object properties names
 * can only be strings. Note coercion is performed only once in the default
 * arguement list.
 * @return {Object} Object with all of the original properties with the
 * exception of the property denoted by `propName`
 */
const immutablyRemoveProp = (obj, propName = String(this.propName)) =>
  Object.keys(obj) // array of object's own enumerable properties (excluding those in the prototype chain)
    .filter(k => k !== propName) // array of property names to keep
    .reduce((acc, k) => ({ ...acc, [k]: obj[k] }), {}); // copies data into new object using filtered property names as keys

/**
 * Takes an array of objects and converts them to a hashmap by id.
 *
 * @param {array} items
 * @return {Object} Hashmap
 */
const toHashmap = (items = []) =>
  items.reduce((acc, el) => ({ ...acc, [el.id]: el }), {});

export { immutablyRemoveProp, toHashmap };
