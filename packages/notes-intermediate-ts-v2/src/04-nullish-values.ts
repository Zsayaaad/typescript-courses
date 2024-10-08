//* Null

const userInfo = {
  name: 'Mike',
  email: 'mike@example.com',
  secondaryEmail: null, // user has no secondary email
}

//* Undefined

interface FormInProgress {
  createdAt: Date
  data: FormData
  completedAt?: Date
}
const formInProgress: FormInProgress = {
  createdAt: new Date(),
  data: new FormData(),
}
function submitForm() {
  const myDate: Date | undefined = formInProgress.completedAt
  formInProgress.completedAt = new Date()
}

//* void

console.log(`console.log returns nothing.`)

//* Non-null assertion operator

type GroceryCart = {
  fruits?: { name: string; qty: number }[]
  vegetables?: { name: string; qty: number }[]
}

const cart: GroceryCart = {}

// @ts-ignore
cart.fruits.push({ name: 'kumkuat' })
cart.fruits!.push({ name: 'kumkuat', qty: 1 }) // ! is more specific

// in production code do this 👇
const { fruits } = cart
if (fruits) {
  fruits.push({ name: 'kumkuat', qty: 1 })
} else {
  // what if it's not there?
}

//* Definite assignment assertion

class ThingWithAsyncSetup {
  setupPromise: Promise<any>
  // with `!` we say, isSetup is definitely going to have been assigned by the time the constructor completes.
  isSetup!: boolean

  constructor() {
    this.setupPromise = new Promise((resolve) => {
      this.isSetup = false
      return this.doSetup(resolve)
    }).then(() => {
      this.isSetup = true
    })
  }

  private async doSetup(resolve: (value: unknown) => void) {
    // some async stuff
  }
}

//* Optional Chaining

type Payment = {
  id: string
  amount: number
  createdAt: Date
}
type Invoice = {
  id: string
  due: number
  payments: Payment[]
  lastPayment?: Payment
  createdAt: Date
}
type Customer = {
  id: string
  lastInvoice?: Invoice
  invoices: Invoice[]
}
type ResponseData = {
  customers?: Customer[]
  customer?: Customer
}
function getLastPayment(data: ResponseData): number | undefined {
  const { customer } = data
  if (!customer) return

  const { lastInvoice } = customer
  if (!lastInvoice) return

  const { lastPayment } = lastInvoice
  if (!lastPayment) return

  return lastPayment.amount
}

function getLastPayment2(data: ResponseData): number | undefined {
  return data?.customer?.lastInvoice?.lastPayment?.amount
}

//* Nullish Coalescing

function setVolume(v: number): void {}

type PlayerConfig = {
  volume?: 0 | 25 | 50 | 75 | 100
}

function initializePlayer(config: PlayerConfig): void {
  const vol =
    // typeof config.volume === 'undefined' ? 50 : config.volume
    config.volume ?? 50
  // ?? => this check for null or undefiend
  setVolume(vol)
}

/**/
export default {}
