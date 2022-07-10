import { Modal, Pressable, Text, View } from "react-native";

import { styles } from "./modal.styles";

const ModalComponent = ({ animationType, modalVisible, onRequestClose, children }) => (
  <Modal
    animationType={animationType || "slide"}
    transparent={true}
    style={{ margin: 0, alignItems: undefined, justifyContent: undefined }}
    visible={modalVisible}
    onRequestClose={onRequestClose}
  >
    <View style={styles.modalCenteredView}>
      <View style={styles.modalView}>
        <View style={styles.heading}>
          <Text style={styles.modalTitle}>Choose sticker</Text>
          <Pressable style={styles.button} onPress={onRequestClose}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>

        {children}
      </View>
    </View>
  </Modal>
);

export default ModalComponent;
