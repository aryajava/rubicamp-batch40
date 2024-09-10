function sum() {
    let val = 0
    for (let i of arguments) {
        val +=i
    }
    return console.log(val)
}

sum(1,2,7) // 10
sum(1,4) // 5
sum(11) // 11
sum(10,3,6,7,9) // 35