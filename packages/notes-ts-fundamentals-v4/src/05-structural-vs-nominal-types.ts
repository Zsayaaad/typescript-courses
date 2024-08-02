//* Nominal vs Structural

class Car {
  make: string
  model: string
  year: number
  isElectric: boolean
}

class Truck {
  make: string
  model: string
  year: number
  towingCapacity: number
}

const vehicle = {
  make: 'Honda',
  model: 'Accord',
  year: 2017,
}

function printCar(car: {
  make: string
  model: string
  year: number
  isElectric?: boolean
  towingCapacity?: number
}): void {
  console.log(
    `${car.make} ${car.model} (${car.year}) ${
      car.isElectric ? 'Electric' : ''
    }`,
  )
}

printCar(new Car()) //✔️ Fine
printCar(new Truck()) //✔️ Fine
printCar(vehicle) //✔️ Fine
/**/

export default {}
