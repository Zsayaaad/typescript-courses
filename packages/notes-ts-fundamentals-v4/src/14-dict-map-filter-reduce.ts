// @ts-nocheck
//* Dictionaries: map, filter, reduce

/////////////////////////////////////////
/////////// TESTING UTILITIES ///////////
//////// no need to modify these ////////
/////////////////////////////////////////
// @errors: 7006 7006 7006 7006 7006
console.clear()

function assertEquals<T>(found: T, expected: T, message: string) {
  if (found !== expected)
    throw new Error(
      `❌ Assertion failed: ${message}\nexpected: ${expected}\nfound: ${found}`,
    )
  console.log(`✅ OK ${message}`)
}

function assertOk(value: any, message: string) {
  if (!value) throw new Error(`❌ Assertion failed: ${message}`)
  console.log(`✅ OK ${message}`)
}
/// ---cut---

///// SAMPLE DATA FOR YOUR EXPERIMENTATION PLEASURE (do not modify)
const fruits = {
  apple: { color: 'red', mass: 100 },
  grape: { color: 'red', mass: 5 },
  banana: { color: 'yellow', mass: 183 },
  lemon: { color: 'yellow', mass: 80 },
  pear: { color: 'green', mass: 178 },
  orange: { color: 'orange', mass: 262 },
  raspberry: { color: 'red', mass: 4 },
  cherry: { color: 'red', mass: 5 },
}

interface Dict<T> {
  [k: string]: T
}

// Array.prototype.map, but for Dict
/**The mapDict function will apply a certain function to each value in the object and return
 * a new object with adjusted values */
function mapDict<T, U>(
  obj: Dict<T>,
  callback: (value: T, key: string) => U,
): Dict<U> {
  const dictResult: Dict<U> = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      dictResult[key] = callback(obj[key], key)
    }
  }
  return dictResult
}
// Array.prototype.filter, but for Dict
/**The filterDict function will filter the values of the object based on a specific function
 * and return a new object containing only the values passing through the filter */
function filterDict<T>(
  obj: Dict<T>,
  callback: (value: T, key: string) => boolean,
): Dict<T> {
  const dictResult: Dict<T> = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && callback(obj[key], key)) {
      dictResult[key] = obj[k]
    }
  }
  return dictResult
}
// Array.prototype.reduce, but for Dict
/**The reduceDict function will aggregate the values of the object based on a particular function
 * and return the result of aggregation */
function reduceDict<T, U>(
  obj: Dict<T>,
  callback: (currentVal: U, value: T, key: string) => U,
  initialValue: U,
) {
  let currentValue = initialValue
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      currentValue = callback(currentValue, obj[key], key)
    }
  }
  return currentValue
}

/////////////////////////////////////////
///////////// TEST SUITE ///////////////
//////// no need to modify these ////////
/////////////////////////////////////////

// MAP
const fruitsWithKgMass = mapDict(fruits, (fruit, name) => ({
  ...fruit,
  kg: 0.001 * fruit.mass,
  name,
}))
const lemonName: string = fruitsWithKgMass.lemon.name
// @ts-ignore-error
const failLemonName: number = fruitsWithKgMass.lemon.name
assertOk(fruitsWithKgMass, '[MAP] mapDict returns something truthy')
assertEquals(
  fruitsWithKgMass.cherry.name,
  'cherry',
  '[MAP] .cherry has a "name" property with value "cherry"',
)
assertEquals(
  fruitsWithKgMass.cherry.kg,
  0.005,
  '[MAP] .cherry has a "kg" property with value 0.005',
)
assertEquals(
  fruitsWithKgMass.cherry.mass,
  5,
  '[MAP] .cherry has a "mass" property with value 5',
)
assertEquals(
  Object.keys(fruitsWithKgMass).length,
  8,
  '[MAP] fruitsWithKgMass should have 8 keys',
)

// FILTER
// only red fruits
const redFruits = filterDict(fruits, (fruit) => fruit.color === 'red')
assertOk(redFruits, '[FILTER] filterDict returns something truthy')
assertEquals(
  Object.keys(redFruits).length,
  4,
  '[FILTER] 4 fruits that satisfy the filter',
)
assertEquals(
  Object.keys(redFruits).sort().join(', '),
  'apple, cherry, grape, raspberry',
  '[FILTER] Keys are "apple, cherry, grape, raspberry"',
)

// REDUCE
// If we had one of each fruit, how much would the total mass be?
const oneOfEachFruitMass = reduceDict(
  fruits,
  (currentMass, fruit) => currentMass + fruit.mass,
  0,
)
assertOk(redFruits, '[REDUCE] reduceDict returns something truthy')
assertEquals(
  typeof oneOfEachFruitMass,
  'number',
  '[REDUCE] reduceDict returns a number',
)
assertEquals(
  oneOfEachFruitMass,
  817,
  '[REDUCE] 817g mass if we had one of each fruit',
)

/**/
export default {}
