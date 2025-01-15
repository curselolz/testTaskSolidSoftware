import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const HomeScreen = () => {
  const color = useSharedValue('rgba(0,0,0)');
  const RGB_MAX = 256;
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      const r = Math.floor(Math.random() * RGB_MAX);
      const g = Math.floor(Math.random() * RGB_MAX);
      const b = Math.floor(Math.random() * RGB_MAX);
      const a = Math.random().toFixed(2);
      const newColor = `rgba(${r},${g},${b},${a})`;
      color.value = newColor;
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      color.value = 'rgba(255,255,255,0.5)';
    });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: color.value,
  }));

  return (
    <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.titleContainer}>Hello there</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },
});

export default HomeScreen;
