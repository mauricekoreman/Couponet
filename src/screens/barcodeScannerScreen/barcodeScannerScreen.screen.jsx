import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

import { useUser } from "../../contexts/userContext";

const BarcodeScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const { linkUser } = useUser();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setScanned(false);
      setHasPermission(null);
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });

    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = async ({ data }) => {
    try {
      setScanned(true);
      setLoading(true);
      await linkUser(data);
    } catch (error) {
      setLoading(false);
      alert(error.message);
      navigation.goBack();
    }
  };

  if (hasPermission === null || hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ratio='16:9'
        type={Camera.Constants.Type.back}
        style={[StyleSheet.absoluteFillObject]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barcodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      >
        <View style={[styles.loading, { backgroundColor: loading ? "#0009" : "transparent" }]}>
          <ActivityIndicator animating={loading} size={40} />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BarcodeScannerScreen;
