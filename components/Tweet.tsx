import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { MD3DarkTheme } from "react-native-paper";

import { Size } from "@/constants/Sizes";
import { UserContext } from "@/utils/context";

import { ThemedText } from "./ThemedText";

interface TweetProps {
  tweet: string;
  user: any;
}

export const Tweet: React.FC<TweetProps> = ({ tweet, user }) => {
  const context = useContext(UserContext);
  const isMyTweet = context?.userData?.uid === user.uid;

  return (
    <View style={styles(isMyTweet).container}>
      <ThemedText>{tweet}</ThemedText>
    </View>
  );
};

const styles = (props: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: props ? "#00b4d8" : MD3DarkTheme.colors.backdrop,
      alignSelf: props ? "flex-end" : "flex-start",
      maxWidth: Size.tweet,
      borderRadius: 15,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
