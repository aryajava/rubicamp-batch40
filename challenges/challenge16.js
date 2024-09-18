const genUUID = () => {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

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
        this.sn = genUUID();
        this.tyre = null;
        this.seats = seats;
        this.doors = doors;
        this.warranty = warranty;
    }

    addTyre(tyre) {
        this.tyre = tyre;
    }

    getDetails() {
        return {
            model: this.model,
            sn: this.sn,
            year: this.year,
            tyre: `${this.tyre.brand} ${this.tyre.size}`,
            seats: this.seats,
            doors: this.doors,
            warranty: `${this.warranty} year`,
        };
    }

    isWarrantyActive(checkYear) {
        return this.year + this.warranty >= checkYear;
    }
}

class Agya extends Car {
    constructor(year) {
        super('Agya', year, 5, 5, 1);
        this.addTyre(new Tyre('Dunlop', '15 inch'));
    }
}

class Rush extends Car {
    constructor(year) {
        super('Rush', year, 5, 5, 3);
        this.addTyre(new Tyre('Bridgestone', '17 inch'));
    }
}

class CarFactory {
    constructor() {
        this.cars = [];
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    produce(year) {
        const productionCount = CarFactory.getRandomInt(1, 10);
        for (let i = 0; i < productionCount; i++) {
            const agyaOrRush = Math.random() < 0.5 ? new Agya(year) : new Rush(year);
            this.cars.push(agyaOrRush);
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
            console.log(`tyre       : ${details.tyre}`);
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
            console.log(`tyre       : ${details.tyre}`);
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
toyota.produce(2022);
toyota.produce(2024);
toyota.produce(2024);
toyota.result();
toyota.guaranteeSimulation(2025);
