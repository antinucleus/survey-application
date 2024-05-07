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

const getStoreValue = async (key: string) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    return JSON.parse(result || '');
  } catch (error) {
    return null;
  }
};

const deleteStoreValue = async (key: string) => {
  let success = true;

  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    success = false;
  }

  return success;
};

export { saveItem, deleteStoreValue, getStoreValue };
