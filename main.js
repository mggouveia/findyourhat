//Get user input
const prompt = require('prompt-sync')({sigint: true});

// This lets us clear the screen after every turn
// need to run `npm install clear-screen` in the
// terminal first
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;

        this.field[0][0] = pathCharacter;
    }

    runGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if(!this.isInBounds()){
                console.log('Out of bounds instruction!');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Sorry, you fell down a hole!');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('Congrats, you found your lost hat!');
                playing = false;
                break;
            }
            //Update current location on map
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    askQuestion(){
        const answer = prompt('Which way? ').toUpperCase();
        switch(answer) {
            case 'W':
                this.locationY -= 1;
                break;
            case 'S':
                this.locationY += 1;
                break;
            case 'A':
                this.locationX -= 1;
                break;
            case 'D':
                this.locationX += 1;
                break;
            default:
                console.log('Enter W, S, A or D.');
                this.askQuestion();
                break;
        }
    }

    isInBounds() {
        return (
            this.locationY >= 0 && 
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }

    isHat(){
        return this.field[this.locationY][this.locationX] === hat;
    }

    isHole(){
        return this.field[this.locationY][this.locationX] === hole;
    }

    print(){
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join ('\n');
        console.log(displayString);
    }

    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++){
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }
        //Set Hat Location
        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
        //Making sure that "hat" is not at starting point
        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random()* width);
            hatLocation.y = Math.floor(Math.random()* heigth);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }
}

const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.runGame();