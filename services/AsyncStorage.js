import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeItem = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const getItem = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export const clearStore = async () => {
  await AsyncStorage.clear();
};
