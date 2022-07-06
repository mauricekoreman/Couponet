import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MyCoupons from "../screens/myCoupons/myCouponsScreen.component";
import ReceivedCoupons from "../screens/receivedCoupons/receivedCoupons.component";
import NavigatorTitle from "../components/navigatorTitle/navigatorBadge.component";
const Tab = createMaterialTopTabNavigator();

const HomeTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name='receivedCoupons'
      component={ReceivedCoupons}
      options={{
        tabBarLabel: () => <NavigatorTitle text={"Received coupons"} />,
        title: "Received coupons",
      }}
    />
    <Tab.Screen
      name='myCoupons'
      component={MyCoupons}
      options={{
        tabBarLabel: () => <NavigatorTitle text={"Given coupons"} />,
        title: "Given coupons",
      }}
    />
  </Tab.Navigator>
);

export default HomeTabNavigator;
