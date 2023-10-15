import { CalendarDays } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "react-day-picker";

const CustomInputCalender = forwardRef(({ value, onClick }: any, ref: any) => (
  <Button
    className="flex items-center justify-center space-x-2"
    onClick={onClick}
    ref={ref}
  >
    <CalendarDays className="h-6 w-6" />
    <span>{value}</span>
  </Button>
));

CustomInputCalender.displayName = "CustomInputCalender";

export default CustomInputCalender;
