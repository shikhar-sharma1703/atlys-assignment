"use client";

import { NodeProperties } from "@/types";
import FunctionNode from "./function";
import SpecialNode from "./special";

type Props = {
  node: NodeProperties;
};

const NODE_COMPONENTS = {
  function: FunctionNode,
  special: SpecialNode,
};

const NodeComponent = ({ node }: Props) => {
  const NodeTypeComponent = NODE_COMPONENTS[node.type] as React.FC<{
    node: NodeProperties;
  }>;

  if (!NodeTypeComponent) {
    console.warn(`No component found for node type: ${node.type}`);
    return null;
  }

  return <NodeTypeComponent node={node} />;
};

export default NodeComponent;
