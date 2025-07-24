
const CONFIGS_AVAILABLE = {
  displayHiddenFiles: 'displayHiddenFiles',
}

export const config = {
  setHiddenFiles: (value) => {
    persistConfig(CONFIGS_AVAILABLE.displayHiddenFiles, value);
  },
  getStoredConfigs: () => {
    const displayHiddenFiles = localStorage.getItem(CONFIGS_AVAILABLE.displayHiddenFiles);
    // More features will be returned here
    return {displayHiddenFiles: JSON.parse(displayHiddenFiles) };
  }
}

const persistConfig = (configName, value) => {
  localStorage.setItem(configName, value);
}
