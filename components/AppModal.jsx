import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default AppModal = ({ visible, closeHandler, children }) => {
  return (
    <View style={styles.container}>
      <Modal isVisible={visible}>
        <View>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { closeHandler });
          })}
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
});
