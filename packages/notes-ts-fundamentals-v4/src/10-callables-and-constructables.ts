//* Callables

interface TwoNumberCalculation {
  (x: number, y: number): number
}

type TwoNumberCalc = (x: number, y: number) => number // equivalent to the above

const add: TwoNumberCalculation = (x, y) => x + y
const subtract: TwoNumberCalc = (x, y) => x - y

//* `void`

function printFormattedJSON(obj: string[]) {
  console.log(JSON.stringify(obj, null, '  '))
}

const x = printFormattedJSON(['hello', 'world'])

function invokeInFourSeconds(callback: () => undefined) {
  setTimeout(callback, 4000)
}
// void means ignore my return value
function invokeInFiveSeconds(callback: () => void) {
  setTimeout(callback, 5000)
}

const values: number[] = []
invokeInFourSeconds(() => values.push(4)) //! Error: Type 'undefined' is not assignable to type 'number'.
invokeInFiveSeconds(() => values.push(4))

//* Constructables

interface IDateConstructor {
  new (value: number): Date
  name: string
  age?: number
}

let MyDateConstructor: IDateConstructor = Date
const d: Date = new MyDateConstructor(1697923072611)

//* Function overloads

type FormSubmitHandler = (data: FormData) => void
type MessageHandler = (evt: MessageEvent) => void

//? Add above handleMainEvent function declaration
function handleMainEvent(
  elem: HTMLFormElement,
  handler: FormSubmitHandler,
): void
function handleMainEvent(
  elem: HTMLIFrameElement,
  handler: MessageHandler,
): void
function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler,
) {
  console.log('the real function')
}

const myFrame = document.getElementsByTagName('iframe')[0]
handleMainEvent(myFrame, (val) => {})

// //? Form handler has a specific type now!
// const myForm = document.getElementsByTagName("form")[0]
// handleMainEvent(myForm, (val) => {
// })

//* `this` types

// function myClickHandler(event: Event) {
//     // this.disabled = true
// }
// myClickHandler(new Event("click")) // maybe ok?

// const myButton = document.getElementsByTagName("button")[0]
// const boundHandler = myClickHandler.bind(myButton)
// boundHandler(new Event("click")) // bound version: ok
// myClickHandler.call(myButton, new Event("click")) // also ok

//* Function best practices

//? Explicit function return types

export async function getData(
  url: string,
): Promise<{ properties: string[] }> {
  const resp = await fetch(url)
  // if (resp.ok) {
  const data = (await resp.json()) as {
    properties: string[]
  }
  return data
  // }
}

function loadData() {
  getData('https://example.com').then((result) => {
    console.log(result.properties.join(', '))
    //           ^?
  })
}
/**/
export default {}
