import { Text, TextInput, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function Index() {
  return (
     <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-red-500">
        X clone rn
      </Text>
      <TextInput placeholder="haha"></TextInput>
    </View>
  );
}

