// npm install uuid
import { v4 as uuidv4 } from "uuid";

class Tyre {
    constructor(brand, size) {
        this.brand = brand;
        this.size = size;
    }
}

class Car {
    constructor(model, year, seats, doors, warranty) {
        this.model = model;
        this.year = year;
        this.sn = uuidv4();
        this.tyres = [];
        this.seats = seats;
        this.doors = doors;
        this.warranty = warranty;
    }

    addTyre(tyre) {
        this.tyres.push(tyre);
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
        };
    }

    isWarrantyActive(checkYear) {
        return this.year + this.warranty >= checkYear;
    }
}

class CarFactory {
    constructor() {
        this.cars = [];
    }

    produce(year) {
        let agyaCount, rushCount;
        if (year === 2020) {
            agyaCount = 4;
            rushCount = 1;
        } else if (year === 2022) {
            agyaCount = 3;
            rushCount = 4;
        } else {
            console.log("Masukan tahun yang sesuai");
            process.exit();
        }

        const models = [
            { name: "Agya", doors: 5, seats: 5, tyreBrand: "dunlop", tyreSize: "15 inch", warranty: 1 },
            {
                name: "Rush",
                doors: 5,
                seats: 5,
                tyreBrand: "Bridgestone",
                tyreSize: "17 inch",
                warranty: 3,
            },
        ];

        // Produksi Agya
        for (let i = 0; i < agyaCount; i++) {
            const car = new Car(
                models[0].name,
                year,
                models[0].seats,
                models[0].doors,
                models[0].warranty
            );
            car.addTyre(new Tyre(models[0].tyreBrand, models[0].tyreSize));
            this.cars.push(car);
        }

        // Produksi Rush
        for (let i = 0; i < rushCount; i++) {
            const car = new Car(
                models[1].name,
                year,
                models[1].seats,
                models[1].doors,
                models[1].warranty
            );
            car.addTyre(new Tyre(models[1].tyreBrand, models[1].tyreSize));
            this.cars.push(car);
        }
    }

    result() {
        console.log(`Hasil Produksi: \n`);
        this.cars.forEach((car, index) => {
            const details = car.getDetails();
            console.log(`no. ${index + 1}`);
            console.log(`varian     : ${details.model}`);
            console.log(`sn         : ${details.sn}`);
            console.log(`door       : ${details.doors}`);
            console.log(`seat       : ${details.seats} seater`);
            console.log(`tyre       : ${details.tyres}`);
            console.log(`year       : ${details.year}`);
            console.log(`warranty   : ${details.warranty}`);
            console.log("\n");
        });
    }

    guaranteeSimulation(simulationYear) {
        console.log(`Hasil Simulasi Garansi Semua Mobil Pada Tahun ${simulationYear}: \n`);
        this.cars.forEach((car, index) => {
            const details = car.getDetails();
            console.log(`no. ${index + 1}`);
            console.log(`varian     : ${details.model}`);
            console.log(`sn         : ${details.sn}`);
            console.log(`door       : ${details.doors}`);
            console.log(`seat       : ${details.seats} seater`);
            console.log(`tyre       : ${details.tyres}`);
            console.log(`year       : ${details.year}`);
            console.log(`warranty   : ${details.warranty}`);

            if (car.isWarrantyActive(simulationYear)) {
                console.log(`\nstatus on ${simulationYear} this guarantee status active`);
            } else {
                console.log(`\nstatus on ${simulationYear} this guarantee status expired`);
            }
            console.log("");
        });
    }
}

const toyota = new CarFactory();
toyota.produce(2020);
toyota.produce(2022);
toyota.result();
toyota.guaranteeSimulation(2025);
