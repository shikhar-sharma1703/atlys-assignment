"use client";

import Card from "@/components/card";
import Connector from "@/components/connector";
import Input from "@/components/input";
import Select from "@/components/select";
import { useCanvasContext } from "@/context/useCanvasContext";
import { FunctionNodeAttributes } from "@/types";
import { isValidAlgebraicExpression } from "@/utils/helpers";
import Image from "next/image";

import { useState } from "react";

type Props = {
  node: FunctionNodeAttributes;
};

const FunctionNode = ({ node }: Props) => {
  const [error, setError] = useState<string>("");

  const { title, options, expression } = node.data;
  const { position } = node;

  const { handleUpdateNode } = useCanvasContext();

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!isValidAlgebraicExpression(newValue)) {
      setError("Invalid expression");
    } else {
      setError("");

      handleUpdateNode({
        ...node,
        data: { ...node.data, expression: newValue },
      });
    }
  };

  return (
    <div
      style={{
        top: position.y,
        left: position.x,
      }}
      className="absolute"
    >
      <Card className="h-[251px] w-[235px] relative">
        <Card.Header className="font-semibold text-sm leading-4 text-gray-30 flex items-center gap-2 mb-5">
          <Image src="/drag.svg" alt="drag-logo" width={12} height={7} />
          <p>{title}</p>
        </Card.Header>

        <Card.Content className="flex flex-col gap-5 justify-center mb-11">
          <Input
            error={error}
            label="Equation"
            value={expression}
            onChange={handleUpdate}
          />
          <Select
            disabled
            options={options}
            value="function-2"
            label="Next Function"
          />
        </Card.Content>

        <Card.Footer className="flex justify-between items-center font-medium text-xs leading-3 text-gray-40 mb-px">
          <div className="flex items-center gap-1 absolute bottom-4 left-5">
            <Connector />
            <p>input</p>
          </div>
          <div className="flex items-center gap-1 absolute bottom-4 right-5">
            <p>output</p>
            <Connector />
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default FunctionNode;
