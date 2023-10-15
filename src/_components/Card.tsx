import React from "react";

interface CardDetail {
  placeholder: string;
  value: number;
  children: React.ReactNode;
  unit: string;
}

function Card({ children, value, placeholder, unit }: CardDetail) {
  return (
    <div className="border border-veta rounded-2xl">
      <div className="flex items-center justify-center space-x-2 py-2">
        {children}
        <div className="flex flex-col">
          <p className="text-2xl font-bold">
            {value} {unit}
          </p>
          <a className="text-xs"> {placeholder}</a>
        </div>
      </div>
    </div>
  );
}

export default Card;
