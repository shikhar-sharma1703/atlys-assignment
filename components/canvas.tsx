"use client";

import { CanvasContext } from "@/context/useCanvasContext";
import allEdges from "@/data/edges.json";
import allNodes from "@/data/nodes.json";
import { NodeProperties } from "@/types/node";
import { calculateOutput } from "@/utils/helpers";
import { useCallback, useEffect, useState } from "react";
import Edge from "./edge";
import NodeComponent from "./nodes";

const Canvas = () => {
  const [valueX, setValueX] = useState<number | null>(2);
  const [valueY, setValueY] = useState<number | null>(null);
  const [nodes, setNodes] = useState<NodeProperties[]>(
    allNodes as NodeProperties[]
  );

  const handleUpdateNode = useCallback((updatedNode: NodeProperties) => {
    setNodes((prevNodes) =>
      prevNodes.map((prevNode) =>
        prevNode.id === updatedNode.id ? updatedNode : prevNode
      )
    );
  }, []);

  useEffect(() => {
    if (valueX) {
      const output = calculateOutput(valueX, nodes);
      setValueY(output);
    } else {
      setValueY(null);
    }
  }, [nodes, valueX]);

  return (
    <CanvasContext.Provider
      value={{ nodes, valueX, valueY, handleUpdateNode, setValueX, setValueY }}
    >
      <div className="fixed w-screen h-screen top-0 left-0 overflow-hidden">
        <div className="relative w-screen h-screen bg-[#F8F8F8] bg-[radial-gradient(#CFCFCF_1.25px,transparent_1px)] [background-size:18px_18px] overflow-auto">
          {nodes.map((node, index) => (
            <NodeComponent key={index} node={node} />
          ))}
          {allEdges.map((edge, index) => (
            <Edge key={index} edge={edge} />
          ))}
        </div>
      </div>
    </CanvasContext.Provider>
  );
};

export default Canvas;
