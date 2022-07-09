import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MyCoupons from "../screens/myCoupons/myCouponsScreen.component";
import ReceivedCoupons from "../screens/receivedCoupons/receivedCoupons.component";
import NavigatorTitle from "../components/navigatorTitle/navigatorBadge.component";
import { colors, fontFamily } from "../utils/designSystem";
const Tab = createMaterialTopTabNavigator();

const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarIndicatorStyle: { height: 4, backgroundColor: "#000" },
      tabBarStyle: { backgroundColor: colors.backgroundColor, elevation: 0, shadowOpacity: 0 },
    }}
  >
    <Tab.Screen
      name='receivedCoupons'
      component={ReceivedCoupons}
      options={{
        tabBarLabel: ({ focused }) => (
          <NavigatorTitle text={"Received coupons"} focused={focused} />
        ),
        title: "Received coupons",
      }}
    />
    <Tab.Screen
      name='myCoupons'
      component={MyCoupons}
      options={{
        tabBarLabel: ({ focused }) => <NavigatorTitle text={"Given coupons"} focused={focused} />,
        title: "Big",
      }}
    />
  </Tab.Navigator>
);

export default HomeTabNavigator;
