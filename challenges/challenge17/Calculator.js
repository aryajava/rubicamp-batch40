const PI = 22 / 7;

class Calculator {
    constructor() {
        // Inisiasi nilai x
        this.x = 1;
    }
    // penambahan
    add(value) {
        this.x += value;
        return this;
    }
    // pengurangan
    substract(value) {
        this.x -= value;
        return this;
    }
    // perkalian
    multiply(value) {
        this.x *= value;
        return this;
    }
    // pembagian
    divide(value) {
        if (value === 0) {
            console.error("Tidak dapat dibagi dengan 0");
            return this;
        }
        this.x /= value;
        return this;
    }
    // luas lingkaran
    square() {
        this.x = Math.pow(this.x, 2);
        return this;
    }
    // akar pangkat 2
    squareRoot() {
        this.x = Math.sqrt(this.x);
        return this;
    }
    // exponent (pangkat)
    exponent(power) {
        this.x = Math.pow(this.x, power);
        return this;
    }
    // result
    result() {
        console.log(`Hasil: ${this.x}`);
        return this.x;
    }
}

export { PI };
export default Calculator;
