import { Aperture, Bell, Home, Monitor } from "lucide-react";

export const routes = [
  {
    href: "/dashboard",
    label: "Home",
    icon: () => <Home />,
  },
  {
    href: "/dashboard",
    label: "Monitor",
    icon: () => <Monitor />,
  },
  //   {
  //     href: "/dashboard",
  //     label: "Others",
  //     icon: () => <Aperture />,
  //   },
  {
    href: "/dashboard",
    label: "Notification",
    icon: () => <Bell />,
  },
];
