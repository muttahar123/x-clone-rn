import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Twitter X clone in react native</Text>
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        Welcome to the Twitter X clone app!
      </Text>
    </View>
  );
}
