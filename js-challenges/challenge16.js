// npm install uuid
import { v4 as uuidv4 } from 'uuid'

class Tyre {
    constructor(brand, size) {
        this.brand = brand
        this.size = size
    }
}

class Car {
    constructor(model, year, seats, doors, warranty) {
        this.model = model
        this.year = year
        this.sn = uuidv4()
        this.tyres = []
        this.seats = seats
        this.doors = doors
        this.warranty = warranty
    }

    addTyre(tyre) {
        this.tyres.push(tyre)
    }

    getDetails() {
        return {
            model: this.model,
            sn: this.sn,
            year: this.year,
            tyres: `${this.tyres[0].brand} ${this.tyres[0].size}`,
            seats: this.seats,
            doors: this.doors,
            warranty: `${this.warranty} year`,
        }
    }

    isWarrantyActive(checkYear) {
        return (this.year + this.warranty) >= checkYear
    }
}

class CarFactory {
    constructor() {
        this.cars = []
    }

    produce(year) {
        const targetCount = year === 2020 ? 5 : 7
        const models = [
            // Tambahkan varian, door, seat, brand ban, size ban, dan warranty
            { name: 'Agya', doors: 5, seats: 5, tyreBrand: 'dunlop', tyreSize: '15 inch', warranty: 1 },
            { name: 'Rush', doors: 5, seats: 5, tyreBrand: 'Bridgestone', tyreSize: '17 inch', warranty: 3 },
        ]

        for (let i = 0; i < targetCount; i++) {
            const randomModel = models[Math.floor(Math.random() * models.length)]
            const car = new Car(randomModel.name, year, randomModel.seats, randomModel.doors, randomModel.warranty)

            car.addTyre(new Tyre(randomModel.tyreBrand, randomModel.tyreSize))
            this.cars.push(car)
        }
    }

    result() {
        console.log(`Hasil Produksi: \n`)
        this.cars.forEach((car, index) => {
            const details = car.getDetails()
            console.log(`no. ${index + 1}`)
            console.log(`varian     : ${details.model}`)
            console.log(`sn         : ${details.sn}`)
            console.log(`door       : ${details.doors}`)
            console.log(`seat       : ${details.seats} seater`)
            console.log(`tyre       : ${details.tyres}`)
            console.log(`year       : ${details.year}`)
            console.log(`warranty   : ${details.warranty}`)
            console.log('-----')
        })
    }

    guaranteeSimulation(simulationYear) {
        console.log(`\nHasil Simulasi Garansi Semua Mobil Pada Tahun ${simulationYear}: \n`)
        this.cars.forEach((car, index) => {
            const details = car.getDetails()
            console.log(`no. ${index + 1}`)
            console.log(`varian     : ${details.model}`)
            console.log(`sn         : ${details.sn}`)
            console.log(`door       : ${details.doors}`)
            console.log(`seat       : ${details.seats} seater`)
            console.log(`tyre       : ${details.tyres}`)
            console.log(`year       : ${details.year}`)
            console.log(`warranty   : ${details.warranty}`)
            
            if (car.isWarrantyActive(simulationYear)) {
                console.log(`status on ${simulationYear} this guarantee status active`)
            } else {
                console.log(`status on ${simulationYear} this guarantee status expired`)
            }
            console.log('-----')
        })
    }
}

// Contoh Penggunaan
const toyota = new CarFactory()
toyota.produce(2020)
toyota.produce(2022)
toyota.result()
toyota.guaranteeSimulation(2025)
