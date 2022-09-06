const storage = window.localStorage

export const LocalStorageUtil = {
  set(storageItemName: string, value: string | boolean | number) {
    const stringifiedValue = JSON.stringify(value)
    storage.setItem(storageItemName, stringifiedValue)
  },

  get(storageItemName: string) {
    const storageItemValue = storage.getItem(storageItemName)
    try {
      return storageItemValue && JSON.parse(storageItemValue)
    } catch (error) {
      return storageItemValue
    }
  },

  remove(storageItemName: string) {
    storage.removeItem(storageItemName)
  },
}
