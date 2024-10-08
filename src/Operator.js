export default class Operator {
  static Add = new Operator("add");
  static Subtract = new Operator("sub");
  static Multiply = new Operator("mul");
  static Divide = new Operator("div");
  static Empty = new Operator("");

  constructor(value = "") {
    this.id = value;
  }

  get symbol() {
    switch (this.id) {
      case "add":
        return "+";
      case "sub":
        return "-";
      case "mul":
        return "×";
      case "div":
        return "÷";
      case "":
        return "";
    }
  }

  calculate(a, b) {
    switch (this.id) {
      case "add":
        return a + b;
      case "sub":
        return a - b;
      case "mul":
        return a * b;
      case "div":
        return a / b;
      case "":
        return 0;
    }
  }
}
