import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DataType = { [key: string]: string };

interface CardDetail {
  title: string;
  value: DataType;
  children: React.ReactNode;
}

const CustomCard = ({ title, value, children }: CardDetail) => {
  const unitSelector = (data: string) => {
    if (title === "Energy") {
      if (data === "Active Energy Import" || data === "Active Energy Export") {
        return "kWh";
      } else {
        return "kVARh";
      }
    } else if (title === "Voltage") {
      return "V";
    } else if (title === "Current") {
      return "A";
    }
  };
  return (
    <Card className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <CardHeader className="flex flex-col items-center justify-center">
          {children}
        </CardHeader>
        <CardTitle>{title}</CardTitle>
      </div>

      <CardContent className="flex flex-col items-center justify-center">
        {Object.keys(value).map((data: string) => {
          return (
            <div key={data} className="grid grid-cols-2">
              <span className="flex w-full justify-start">
                <p className="align-center">{data}</p>
              </span>
              <span className="flex">
                <p>
                  : {value[data]} {unitSelector(data)}
                </p>
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
