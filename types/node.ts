export type NodeType = "function" | "special";

type Position = {
  x: number;
  y: number;
};

type BaseNode<T extends NodeType, TData> = {
  id: string;
  type: T;
  position: Position;
  data: TData;
};

type FunctionNodeData = {
  title: string;
  expression: string;
  defaultOptionValue: string;
  isSelectDisabled: boolean;
  nextNodeId: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

type SpecialNodeData = {
  title: string;
  connectedNodeId: string;
  variant: "input" | "output";
};

export type FunctionNodeAttributes = BaseNode<"function", FunctionNodeData>;
export type SpecialNodeAttributes = BaseNode<"special", SpecialNodeData>;

export type NodeProperties = FunctionNodeAttributes | SpecialNodeAttributes;

export const isFunctionNode = (
  node: BaseNode<NodeType, unknown>
): node is FunctionNodeAttributes => {
  return node.type === "function";
};

export const isSpecialNode = (
  node: BaseNode<NodeType, unknown>
): node is SpecialNodeAttributes => {
  return node.type === "special";
};
