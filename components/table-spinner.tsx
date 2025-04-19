import { Spinner } from "@heroui/spinner";
import React from "react";

export const TableSpinner: React.FC = () => {
  return (
    <div className="w-full h-full grid place-items-center backdrop-blur-sm">
      <Spinner label="Loading..." size="lg" variant="simple" />
    </div>
  );
};
