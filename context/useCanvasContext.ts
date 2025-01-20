import { NodeProperties } from "@/types";
import { createContext, useContext } from "react";

type CanvasContextType = {
  nodes: NodeProperties[];
  valueX: number | null;
  valueY: number | null;
  setValueX: (value: number | null) => void;
  setValueY: (value: number | null) => void;
  handleUpdateNode: (node: NodeProperties) => void;
};

export const CanvasContext = createContext<CanvasContextType>({
  nodes: [],
  valueX: null,
  valueY: null,
  setValueX: () => {},
  setValueY: () => {},
  handleUpdateNode: () => {},
});

export const useCanvasContext = (): CanvasContextType => {
  const context = useContext(CanvasContext);

  if (context === undefined) {
    throw new Error(
      "useCanvasContext must be used within a CanvasContext.Provider"
    );
  }

  return context;
};
