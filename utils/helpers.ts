import {
  FunctionNodeAttributes,
  isFunctionNode,
  isSpecialNode,
  NodeProperties,
  SpecialNodeAttributes,
} from "@/types";

const VALID_CHAR_REGEX = /[0-9a-zA-Z\+\-\*\/\^\(\)\.]/;
const OPERATOR_REGEX = /[\+\-\*\/\^]/;

/**
 * Validates if a string is a valid algebraic expression using basic arithmetic operators
 * Allowed operators: +, -, *, /, ^
 * @param expression - The string to validate
 * @returns boolean indicating if expression is valid
 */
export const isValidAlgebraicExpression = (expression: string): boolean => {
  if (expression === "") return true;

  let prevChar: string | null = null;
  let parenCount = 0;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === " ") continue;

    if (!VALID_CHAR_REGEX.test(char)) {
      return false;
    }

    if (char === "(") {
      parenCount++;
      continue;
    } else if (char === ")") {
      parenCount--;
      if (parenCount < 0) return false;
    }

    if (OPERATOR_REGEX.test(char)) {
      if (char === "-" && (prevChar === null || prevChar === "(")) {
        prevChar = char;
        continue;
      }

      if (prevChar === null || OPERATOR_REGEX.test(prevChar)) {
        return false;
      }
    }

    prevChar = char;
  }

  return true;
};

/**
 * Calculates the output of a graph by evaluating the expression at each node
 * @param valueX - The value of x to evaluate the expression at
 * @param nodes - The nodes of the graph
 * @returns The output of the graph or null if the output is not a number
 */
export const calculateOutput = (
  valueX: number,
  nodes: NodeProperties[]
): number | null => {
  const inputNode = nodes.find(
    (node) => isSpecialNode(node) && node.data.variant === "input"
  ) as SpecialNodeAttributes | undefined;

  if (!inputNode) return 0;

  let currentNodeId = inputNode.data.connectedNodeId;
  let currentValue = valueX;

  while (currentNodeId) {
    const currentNode = nodes.find((node) => node.id === currentNodeId) as
      | FunctionNodeAttributes
      | undefined;

    if (!currentNode || !isFunctionNode(currentNode)) break;

    const result = evaluateExpression(
      currentNode.data.expression,
      currentValue
    );
    if (result === null) return null;

    currentValue = result;
    currentNodeId = currentNode.data.nextNodeId;

    // If we've reached the output node, return the final value
    if (currentNodeId === "output") {
      return currentValue;
    }
  }

  return currentValue;
};

/**
 * Evaluates an algebraic expression at a given value of x
 * @param expression - The algebraic expression to evaluate
 * @param valueX - The value of x to evaluate the expression at
 * @returns The result of the expression or null if the result is not a number
 */
export const evaluateExpression = (
  expression: string,
  valueX: number
): number | null => {
  try {
    // First check if the expression ends with an operator
    if (/[\+\-\*\/\^]$/.test(expression)) {
      return null;
    }

    // Replace `^` with `**` for JavaScript exponentiation
    expression = expression.replace(/\^/g, "**");

    // Insert explicit multiplication where a number is directly followed by `x`
    expression = expression.replace(/(\d)(x)/g, "$1*$2");
    const evaluatedExpression = expression.replace(/x/g, valueX.toString());
    const result = new Function(`return ${evaluatedExpression}`)();

    // Validate the result is a reasonable number
    if (typeof result !== "number" || !isFinite(result)) {
      return null;
    }

    // Max safe number in JavaScript
    if (Math.abs(result) > 1e308) {
      return null;
    }

    return result;
  } catch {
    return null;
  }
};
