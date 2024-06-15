import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { UserContext } from "@/utils/context";

import { ThemedText } from "./ThemedText";

export const Tweet = ({ tweet }) => {
  const context = useContext(UserContext);

  return (
    <View
      style={{
        ...styles.container,
        alignSelf:
          // If userId and tweetId are the same, move text to the end
          context?.userData.uid === tweet.user.uid ? "flex-end" : "flex-start",
      }}
    >
      <ThemedText>{tweet.tweet}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: "80%",
    borderRadius: 5,
    padding: 8,
  },
});
