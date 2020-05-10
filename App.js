import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const operations = ["c", "+", "-", "*", "/"];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: "",
      calculationText: "",
    };
  }

  calculateResult() {
    this.setState({
      calculationText: eval(this.state.result),
    });
  }

  calculatorPressed(value) {
    if (value == "=") {
      return this.containsOperator() && this.calculateResult();
    }
    this.setState({
      result: this.state.result + value,
    });
  }

  containsOperator() {
    const operator = this.state.result.slice(-1);
    return !operations.includes(operator);
  }

  calculate(operation) {
    let result = "";
    if (operation == "c") {
      this.setState({ calculationText: "" });
    } else if (operations.includes(operation)) {
      const lastChar = this.state.result.split("").pop();

      if (operations.indexOf(lastChar) > 0 || this.state.result == "")
        return;

      result = this.state.result + operation;
    }

    this.setState({
      result
    });
  }

  render() {
    let readyDigits = [];
    let digits = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [".", 0, "="],
    ];

    for (let i = 0; i < 4; i++) {
      let number = [];
      for (let j = 0; j < 3; j++) {
        number.push(
          <TouchableOpacity key={digits[i][j]} style={styles.btn}>
            <Text
              onPress={() => this.calculatorPressed(digits[i][j])}
              style={styles.buttonText}
            >
              {digits[i][j]}
            </Text>
          </TouchableOpacity>
        );
      }
      readyDigits.push(
        <View key={i} style={styles.row}>
          {number}
        </View>
      );
    }

    let operators = [];
    for (let i = 0; i < 5; i++) {
      operators.push(
        <TouchableOpacity
          key={operations[i]}
          style={styles.btn}
          onPress={() => this.calculate(operations[i])}
        >
          <Text style={[styles.buttonText, styles.gray]}>
            {operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.result}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{readyDigits}</View>
          <View style={styles.operations}>{operators}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  resultText: {
    fontSize: 40,
    color: "#82868c",
  },
  result: {
    flex: 2,
    backgroundColor: "#b8babc",
    justifyContent: "center",
    paddingRight: 20,
    alignItems: "flex-end",
  },
  buttonText: {
    fontSize: 30,
  },
  gray: {
    color: "#5f5f5f",
  },
  btn: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  calculationText: {
    fontSize: 34,
    paddingRight: 20,
    color: "#b8babc",
  },
  calculation: {
    flex: 1,
    backgroundColor: "#5f5f5f",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttons: {
    flex: 7,
    flexDirection: "row",
  },
  numbers: {
    flex: 3,
    backgroundColor: "#82868c",
  },
  operations: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "#b8babc",
  },
});
