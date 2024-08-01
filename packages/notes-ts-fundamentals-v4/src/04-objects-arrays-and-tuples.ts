//* Objects

// Object literal
let car2 = {
  make: 'sdf',
  model: 'string',
  year: 123,
}

// Object type
let car: {
  make: string
  model: string
  year: number
} = car2

//? A function that prints info about a car to stdout
function printCar(car: {
  make: string
  model: string
  year: number
  chargeVoltage?: number
}) {
  // if(!car) return

  console.log(`${car.make} ${car.model} (${car.year})`)
  let str = `${car.make} ${car.model} (${car.year})`
  if (car.chargeVoltage) {
    str += `// ${car.chargeVoltage}v`
  } //? if (car.chargeVoltage) is the same as if (typeof car.chargeVoltage !== "undefined"
}

printCar(car)

//* Optional properties
//? Insert into function printCar

printCar({
  //? original fn works
  make: 'Honda',
  model: 'Accord',
  year: 2017,
})

printCar({
  //? optional property works too!
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  chargeVoltage: 220,
})

//* Excess property checking

const myArg = {
  make: 'Tesla',
  model: 'Model 3',
  year: 2020,
  color: 'RED', //? EXTRA PROPERTY
}
// myArg.color = "Blue" //? EXTRA PROPERTY

printCar(myArg)

//* Index signatures

//? Dictionary of phone #s
const phones: {
  mobile: {
    // we always have this key(not dynamic)
    country: string
    area: string
    number: string
  }
  [k: string]: {
    country: string
    area: string
    number: string
  }
} = {
  // 123: { country: "+1", area: "211", number: "652-4515" }, //? Error, key is a string
  home: { country: '+1', area: '211', number: '652-4515' },
  work: { country: '+1', area: '670', number: '752-5856' },
  fax: { country: '+1', area: '322', number: '525-4357' },
  mobile: { country: '+1', area: '211', number: '652-4515' },
}

const x: { [key: string]: string } = {}
x['foo'] = 'bar'

//? Model as an index signature
phones['home'] // When i am reaching for a Dectionary property
phones['work']
phones.fax // When i am reaching for a known property
phones[12] //? Error
phones.mobile

//*  Array Types

const fileExtensions = ['js', 'ts']
//        ^? string[]

const cars = [
  //? Let's look at an array of objects
  {
    make: 'Toyota',
    model: 'Corolla',
    year: 2002,
  },
]

//* Tuples

let myCar = [
  2002, // Year
  'Toyota', // Make
  'Corolla', // Model
]
const [year, make, model] = myCar //✔️ Destructuring

//? Inference doesn't work very well for tuples

myCar = ['Honda', 2017, 'Accord', 'Sedan', 1, 1, 1, 1] //! Wrong convention

let myCar2: [number, string, string] = [2002, 'Toyota', 'Corolla']

myCar2 = [12, 'Toyota', 'Corolla'] //✔️ Valid
myCar2 = ['Honda', 2017, 'Accord'] //! Wrong convention
myCar2 = [2017, 'Honda', 'Accord', 'Sedan'] //! Too many elements

//*  `readonly` tuples

const numPair: [number, number] = [4, 5] //✔️ Valid
const numTriplet: [number, number, number] = [7] //! Invalid

;[101, 102, 103].length //? number[].length
numPair.length //? [number, number] length

numPair.push(6) // [4, 5, 6]
numPair.pop() // [4, 5]
numPair.pop() // [4]
numPair.pop() // []

numPair.length //! ❌ DANGER ❌

const roNumPair: readonly [number, number] = [4, 5]
roNumPair.length
roNumPair.push(6) // [4, 5, 6] //! Not allowed
roNumPair.pop() // [4, 5] //! Not allowed

/**/

export default {}
