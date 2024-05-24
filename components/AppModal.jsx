import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default AppModal = ({ visible, closeHandler, children }) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { closeHandler });
        })}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
