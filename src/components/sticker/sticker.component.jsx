import { Image, View } from "react-native";

import { styles } from "./sticker.styles";

const defaultImageSize = 200;

const Sticker = ({ image, style, imageSize }) => (
  <View style={[styles.stickerContainer, style]}>
    <Image
      source={{ uri: image }}
      style={[
        styles.image,
        { height: imageSize || defaultImageSize, width: imageSize || defaultImageSize },
      ]}
    />
  </View>
);

export default Sticker;
