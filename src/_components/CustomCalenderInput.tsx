import { CalendarDays } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";

const CustomInputCalender = forwardRef(({ value, onClick }: any, ref: any) => (
  <Button
    className="flex items-center hover:text-white justify-center space-x-2 bg-white text-black border-[1px] border-black rounded-lg"
    onClick={onClick}
    ref={ref}
  >
    <CalendarDays className="h-6 w-6" />
    <span>{value}</span>
  </Button>
));

CustomInputCalender.displayName = "CustomInputCalender";

export default CustomInputCalender;
