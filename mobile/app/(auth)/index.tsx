import { useSocialAuth } from "@/hooks/useSocialAuth";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { handleSocialAuth, isLoading } = useSocialAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View className="flex-1 justify-between px-8 pb-12 pt-8">

        {/* Top Illustration / Image Section */}
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("../../assets/images/auth2.png")}
            style={{ width: "100%", height: 280 }}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Action Section */}
        <View className="w-full">


          <View className="flex-col gap-4">
            {/* GOOGLE SIGNIN BTN */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-center bg-white border border-gray-200 rounded-full h-14"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#4285F4" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={{ width: 24, height: 24, marginRight: 12 }}
                    resizeMode="contain"
                  />
                  <Text className="text-black font-semibold text-[17px]">Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* APPLE SIGNIN BTN */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-center bg-white border border-gray-200 rounded-full h-14"
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/apple.png")}
                    style={{ width: 24, height: 24, marginRight: 12 }}
                    resizeMode="contain"
                  />
                  <Text className="text-black font-semibold text-[17px]">Continue with Apple</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <Text className="text-left text-gray-500 text-xs leading-5 mt-6">
            By signing up, you agree to our <Text className="text-blue-500">Terms</Text>,{" "}
            <Text className="text-blue-500">Privacy Policy</Text>, and{" "}
            <Text className="text-blue-500">Cookie Use</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}