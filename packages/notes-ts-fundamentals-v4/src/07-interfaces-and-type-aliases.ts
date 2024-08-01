//* Type Aliases
type Amount = {
  currency: string
  value: number
} | null

function printAmount(amt: Amount) {
  console.log(amt)

  const { currency, value } = amt
  console.log(`${currency} ${value}`)
}

const donation = {
  currency: 'USD',
  value: 30.0,
  description: 'Donation to food bank',
}

printAmount(donation) //✔️ Valid

//? Let's look at a familiar example from the last chapter

function flipCoin() {
  if (Math.random() > 0.5) return 'heads'
  return 'tails'
}
const success = [
  'success',
  { name: 'Mike North', email: 'mike@example.com' },
] as const
const fail = ['error', new Error('Something went wrong!')] as const

export function maybeGetUserInfo():
  | readonly ['error', Error]
  | readonly ['success', { name: string; email: string }] {
  // implementation is the same in both examples
  if (flipCoin() === 'heads') {
    return success
  } else {
    return fail
  }
}

//? Let's model the return type as an interface

type UserInfoOutcomeError = readonly ['error', Error]
type UserInfoOutcomeSuccess = readonly [
  'success',
  { readonly name: string; readonly email: string },
]
type UserInfoOutcome = UserInfoOutcomeError | UserInfoOutcomeSuccess

//* Inheritance in type aliases

type SpecialDate = Date & { getDescription(): string }

const newYearsEve: SpecialDate =
  //                    ^?
  Object.assign(new Date(), {
    getDescription: () => 'Last day of the year',
  })

newYearsEve.getDate //✔️
//             ^?

// * Interfaces

interface Amount2 {
  currency: string
  value: number
}

function printAmount2(amt: Amount2) {
  amt
}

//* Inheritance in interfaces

//? `extends` keyword
function consumeFood(arg: string) {}

class AnimalThatEats {
  eat(food: string) {
    consumeFood(food)
  }
}
class Cat extends AnimalThatEats {
  meow() {
    return 'meow'
  }
}

const c = new Cat()
c.eat
c.meow()

interface Animal {
  isAlive(): boolean
}
interface Mammal extends Animal {
  getFurOrHairColor(): string
}
interface Hamster extends Mammal {
  squeak(): string
}
function careForHamster(h: Hamster) {
  h.getFurOrHairColor()
  h.squeak()
  h.isAlive() //✔️
  //   ^|
}

//? `implements` keyword

interface AnimalLike {
  eat(food: string): void
}

class Dog implements AnimalLike {
  eat(food: string): void {
    consumeFood(food)
  }
  bark() {
    return 'woof'
  }
}

class LivingOrganism {
  //? A base class
  isAlive(): boolean {
    return true
  }
}
interface CanBark {
  //? Another interface
  bark(): string
}

interface DogLike extends Animal, AnimalLike, CanBark {}

class Dog2
  extends LivingOrganism
  implements Animal, CanBark, AnimalLike
{
  bark() {
    return 'woof'
  }
  eat(food: string) {
    consumeFood(food)
  }
  // isAlive(): boolean {
  //   return true

  // }
}

//? Implements sometimes works with type aliases

type CanJump = {
  jumpToHeight(): number | [number, number]
}
type CanBark2 =
  | number
  | {
      bark(): string
    }

class Dog3 implements CanJump, CanBark2 {
  jumpToHeight(): number | [number, number] {
    return 1.7
  }
  eat(food: string) {
    consumeFood(food)
  }
}

//* Open interfaces

function feed(animal: AnimalLike) {
  animal.eat
  animal.isAlive
}

interface AnimalLike {
  //✔️ Additional declaration is OK
  isAlive(): boolean
}

//* Use case: augmenting existing types

// window.document // an existing property
// //      ^? (property) document: Document
window.exampleProperty = 42
// //      ^? (property) exampleProperty: number
window.zexo = 'Elsayyad'
// tells TS that `exampleProperty` exists
declare global {
  interface Window {
    exampleProperty: number
    zexo: string
  }
}

//* Recursive types

type NestedNumbers = number | NestedNumbers[] // number Or number[] Or number[][][] -> infinitly nested

const val = [3, 4, [5, 6, [7], 59], 221]

if (typeof val !== 'number') {
  val.push(41)
  val.push([[33, 21], 66])
  val.push([[]]) // empty array
  val.push('this will not work') //! No strings allowed
}

/**/
export default {}
