import { Image, View } from "react-native";

import { styles } from "./sticker.styles";

const Sticker = ({ image }) => (
  <View style={styles.stickerContainer}>
    <View style={styles.stickerCircle} />
    <Image source={image} style={styles.image} />
  </View>
);

export default Sticker;
