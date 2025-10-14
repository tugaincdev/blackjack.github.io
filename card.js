class Card {



    constructor(suit, value) {
        this.suit = suit;
        this.value = value; //not game value; has 11,12,13
    }

    printName() {
        let name = "";
        valueName = "";
        switch (this.value) {
            case 1:
                valueName = "ace";
                break;
            case 2:
                valueName = "two";
                break;
            case 3:
                valueName = "three";
                break;
            case 4:
                valueName = "four";
                break;
            case 5:
                valueName = "five";
                break;
            case 6:
                valueName = "six";
                break;
            case 7:
                valueName = "seven";
                break;
            case 8:
                valueName = "eight";
                break;
            case 9:
                valueName = "nine";
                break;
            case 10:
                valueName = "ten";
                break;
            case 11:
                valueName = "?";
                break;
            case 12:
                valueName = "??";
                break;
            case 13:
                valueName = "???";
                break;
            default:
                valueName = "UNKNOWN_VALUE_NAME";
                break;
        }

        name = valueName + " of " + this.suit;
        return name;
    }
}