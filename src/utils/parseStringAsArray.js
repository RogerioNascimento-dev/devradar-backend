module.exports = function parseStringAsArray(arrayAsStryng) {
  return arrayAsStryng.split(",").map(tech => tech.trim().toLowerCase());
};
