import { useEffect } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { IconKey, icons } from "@/assets/icons";

interface TabBarButtonProps {
  isFocused: boolean;
  label: string;
  color: string;
  testID: string | undefined;
  routeName: string;
}

type CombinedProps = TabBarButtonProps & PressableProps;

function isIconKey(key: string): key is IconKey {
  return ["index", "explore", "create", "profile"].includes(key);
}

const TabBarButton = (props: CombinedProps) => {
  const { isFocused, label, routeName, color } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean"
        ? isFocused
          ? 1
          : 0
        : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);
    const top = interpolate(scale.value, [0, 1], [0, 7]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return { opacity };
  });

  return (
    <Pressable {...props} style={styles.container}>
      <Animated.View style={[animatedIconStyle]}>
        {isIconKey(routeName) ? (
          icons[routeName]({ color })
        ) : (
          <Text style={{ color: "red" }}>Icon not found</Text>
        )}
      </Animated.View>
      <Animated.Text
        style={[
          {
            color,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});

export default TabBarButton;
