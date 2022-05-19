import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ReceivedCoupons from "../screens/receivedCoupons/receivedCoupons.component";
import MyCoupons from "../screens/myCoupons/myCouponsScreen.component";

const Tab = createMaterialTopTabNavigator();

const HomeTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name='receivedCoupons'
      component={ReceivedCoupons}
      options={{ title: "Received coupons" }}
    />
    <Tab.Screen name='myCoupons' component={MyCoupons} options={{ title: "My coupons" }} />
  </Tab.Navigator>
);

export default HomeTabNavigator;
