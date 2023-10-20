import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  ListItem,
} from "@/components/ui/navigation-menu";
import { routes } from "@/constants/menuHeader";
import { MenuSquare } from "lucide-react";

function NavbarMenu() {
  return (
    <NavigationMenu className="lg:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="flex items-center justify-center space-x-2">
              <MenuSquare className="h-4 w-4" />
              <h1> Menu</h1>
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="">
              {routes.map((route, i) => (
                <ListItem href={route.href} className="flex " key={i}>
                  <div className="flex items-center justify-center space-x-2 w-full py-2">
                    <span>{route.icon()}</span>
                    <h1>{route.label}</h1>
                  </div>
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavbarMenu;
