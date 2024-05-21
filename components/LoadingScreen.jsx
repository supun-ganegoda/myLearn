import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const LoadingScreen = () => {
  const lineWidths = ["40%", "60%", "80%", "100%"];

  const animatedValues = useRef(
    [1, 2, 3, 4].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((animatedValue) =>
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    Animated.loop(Animated.stagger(100, animations)).start();
  }, []);

  const renderLines = () => {
    return animatedValues.map((animatedValue, index) => (
      <Animated.View
        key={index}
        style={[
          styles.line,
          { width: lineWidths[index] },
          {
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.2, 1],
            }),
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-1, 0],
                }),
              },
            ],
          },
        ]}
      />
    ));
  };

  return <View style={styles.container}>{renderLines()}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#adadad",
    opacity: 0.2,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  line: {
    backgroundColor: "#adadad",
    height: 24,
    marginVertical: 3,
  },
});

export default LoadingScreen;
