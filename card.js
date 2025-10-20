class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value; //not game value; has 11,12,13
  }

  printName() {
    let name = "";
    let valueName = "";
    switch (this.value) {
      case 1:
        valueName = "ace";
        break;
      case 2:
        valueName = "2";
        break;
      case 3:
        valueName = "3";
        break;
      case 4:
        valueName = "4";
        break;
      case 5:
        valueName = "5";
        break;
      case 6:
        valueName = "6";
        break;
      case 7:
        valueName = "7";
        break;
      case 8:
        valueName = "8";
        break;
      case 9:
        valueName = "9";
        break;
      case 10:
        valueName = "10";
        break;
      case 11:
        valueName = "jack";
        break;
      case 12:
        valueName = "queen";
        break;
      case 13:
        valueName = "king";
        break;
      default:
        valueName = "unknown";
        break;
    }

    name = valueName + "_of_" + this.suit;
    return name;
  }
}
