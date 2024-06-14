import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from "./BottomTab";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="video" component={BottomTab} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;