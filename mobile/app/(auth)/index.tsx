import { Text, View, Image } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-white">
     <View className="flex-1 px-8 justify-between">
      <View className="flex-1 justify-between">

{/* DEMO IMAGE  */}
<View className="items-center h-3/5">
<Image 
  source={require("../../assets/images/auth2.png")}
/>
</View>
      </View>
     </View>
    </View>
  );
}
