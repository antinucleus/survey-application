import * as SecureStore from 'expo-secure-store';

const saveItem = async (key: string, value: string) => {
  let success = true;

  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    success = false;
  }

  return success;
};

const getItem = async (key: string) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    return result;
  } catch (error) {
    return null;
  }
};

const deleteItem = async (key: string) => {
  let success = true;

  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    success = false;
  }

  return success;
};

export { saveItem, deleteItem, getItem };
