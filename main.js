//Get user input
const prompt = require('prompt-sync')({sigint: true});


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
            } elseif (this.isHole()) {
                console.log('Sorry, you fell down a hole!');
                playing = false;
                break;
            } elseif (this.isHat()) {
                console.log('Congrats, you found your lost hat!');
            }
        }
    }
}