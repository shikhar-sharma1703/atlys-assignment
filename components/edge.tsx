"use client";

import { useCanvasContext } from "@/context/useCanvasContext";
import { Edge as EdgeType } from "@/types";

type Props = {
  edge: EdgeType;
};

const Edge = ({ edge: { source, target, position } }: Props) => {
  const { nodes } = useCanvasContext();

  const hasValidConnection = () => {
    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);
    return !!sourceNode && !!targetNode;
  };

  if (!hasValidConnection()) {
    return null;
  }

  const createControlPoint = (isFirst: boolean) => {
    const dx = position.x1 - position.x0;
    const dy = position.y1 - position.y0;

    const horizontalProportion = 0.3;
    let offsetX = dx * horizontalProportion;
    let offsetY;

    if (Math.abs(dy) < 30 && Math.abs(dx) > 100) {
      const curveHeight = 50;
      offsetY = isFirst ? curveHeight : -curveHeight;
    } else if (Math.abs(dx) < 30) {
      const curveWidth = 55;
      offsetX = isFirst ? curveWidth : -curveWidth;
      offsetY = dy * 0.3;
    } else {
      const verticalProportion = 0.75;
      offsetY = dy * verticalProportion;
    }

    return {
      x: isFirst ? position.x0 + offsetX : position.x1 - offsetX,
      y: isFirst ? position.y0 + offsetY : position.y1 - offsetY,
    };
  };

  const cp1 = createControlPoint(true);
  const cp2 = createControlPoint(false);

  const pathDefinition = `
    M ${position.x0} ${position.y0} 
    C ${cp1.x} ${cp1.y}, 
      ${cp2.x} ${cp2.y}, 
      ${position.x1} ${position.y1}
  `;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <path
        fill="none"
        d={pathDefinition}
        strokeLinecap="round"
        className="pointer-events-auto stroke-indigo-10/50 stroke-[6]"
      />
    </svg>
  );
};

export default Edge;
