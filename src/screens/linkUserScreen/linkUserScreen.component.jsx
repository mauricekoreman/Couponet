import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { useUser } from "../../contexts/userContext";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

import { styles } from "./linkUserScreen.styles";

const LinkUserScreen = ({ navigation }) => {
  const { userData } = useUser();

  return (
    <View style={styles.linkUserScreenContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Link with a user!</Text>
        <Text style={styles.explanation}>
          Let your partner scan your QR code or the other way around to link!
        </Text>
      </View>
      <View style={styles.qrcodeContainer}>
        <QRCode size={200} value={userData.email} />
      </View>
      <PrimaryButton
        style={styles.button}
        title='Scan QR code'
        onPress={() => navigation.navigate("barcodeScannerScreen")}
      />
    </View>
  );
};

export default LinkUserScreen;
