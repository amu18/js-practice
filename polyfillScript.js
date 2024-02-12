// map Array function

const arr = [1, 2, 3, 4];
let newArr = arr.map((a, i, arr) => {
    return a * 2;
})
document.write("Array Map function Output: ", newArr)

// map Polifill

Array.prototype.myMap = function (cb) {
    let tempArr = [];
    console.log(this)
    for (let i = 0; i < this.length; i++) {
        tempArr.push(cb(this[i], i, this));
    }
    return tempArr;
};

let newArr1 = arr.myMap((a, i, arr) => {
    return a * 2;
})
document.write("<br> Map polyfill Output: ", newArr1)

// Array Filter function
// Find all number value greater than 2 

const filterdArr = arr.filter((a, i, arr) => {
    return a > 2;
})
document.write("<br> Array Filter function output: ", filterdArr)

// Filter Polyfill

Array.prototype.myFilter = function (cb) {
    let tempArr = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            tempArr.push(this[i])
        }
    }
    return tempArr
}
const filterdArr1 = arr.filter((a, i, arr) => {
    return a > 2;
})
document.write("<br> Filter Polyfill output: ", filterdArr1)


// Array Reduce function
const reduceArr = arr.reduce((acc, curr, i, arr) => {
    return acc + curr
}, 0)
document.write("<br> Array Reduce function output: ", reduceArr)

// Reduce Polyfill

Array.prototype.myReduce = function (cb, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < this.length; i++) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i]
    }
    return accumulator
}
const reduceArr1 = arr.myReduce((acc, curr, i, arr) => {
    return acc + curr
}, 0)

document.write("<br> Reduce Polyfill output: ", reduceArr1)


// call(), apply() and bind() methods and their polyfill

let car1 = {
    color: 'red',
    company: 'BMW'
}

function purchaseCar(currency, price, callFrom) {
    document.write(`<br> I have purchased ${this.color} - ${this.company} car for ${currency}${price}`, `----called from - ${callFrom}`)
}

purchaseCar.call(car1, "$", 5000, 'call')
purchaseCar.apply(car1, ["$", 10000, 'apply'])
purchaseCar.bind(car1, "$", 10000, 'bind')()
purchaseCar.bind(car1)("$", 10000, 'bind')

Function.prototype.myCall = function (context = {}, ...arg) {
    if (typeof this !== "function") {
        throw new Error(this + "It is not callable")
    }

    context.fn = this
    context.fn(...arg)
}

Function.prototype.myApply = function (context = {}, args = []) {

    if (typeof this !== "function") {
        throw new Error(this + "It is not callable")
    }

    if (!Array.isArray(args)) {
        throw new Error('Error')
    }
    context.fn = this;
    context.fn(...args)
}

Function.prototype.myBind = function (context = {}, ...args) {

    if (typeof this !== "function") {
        throw new Error(this + "Can not be bound as it is not callable")
    }

    context.fn = this;
    return function (...newArgs) {
        return context.fn(...args, ...newArgs)
    }
}

purchaseCar.myCall(car1, "$", 8000, 'myCall')
purchaseCar.myApply(car1, ["$", 20000, 'myApply'])
purchaseCar.myBind(car1, "$", 10000, 'myBind')()
purchaseCar.myBind(car1)("$", 10000, 'myBind')


// Debounce and throttle

const btn = document.querySelector('btn-class')

const myDebounce = (cb, delay) => {
    let timer = 0;

    return function (...arg) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            cb(...arg)
        }, delay)
    }
}

function saveInput() {
    console.log('Saving data');
}
const processChange = myDebounce(() => saveInput(), 1000);

const myTrottle = (cb, delay) => {
    let last = 0
    return (...arg) => {
        let now = new Date().getTime()
        if (now - last < delay) return;
        last = now
        return cb(...arg)
    }
}

const clickMe = myTrottle(() => saveInput(), 2000);