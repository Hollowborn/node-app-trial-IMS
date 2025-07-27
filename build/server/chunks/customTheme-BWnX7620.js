import { w as writable } from './exports-DV9d4DRW.js';

const allThemes = [
  { name: "Default", value: "default", primaryColor: "oklch(0.205 0 0)" },
  {
    name: "Tangerine",
    value: "tangerine",
    primaryColor: "oklch(0.6397 0.1720 36.4421)"
  },
  {
    name: "Minimal Blue",
    value: "blue",
    primaryColor: "oklch(0.5461 0.2152 262.8809)"
  },
  {
    name: "Ocean Breeze",
    value: "ocean",
    primaryColor: "oklch(0.7227 0.192 149.5793)"
  },
  {
    name: "Northern Lights",
    value: "northern",
    primaryColor: "oklch(0.6487 0.1538 150.3071)"
  },
  {
    name: "Nature",
    value: "nature",
    primaryColor: "oklch(0.5234 0.1347 144.1672)"
  },
  {
    name: "Vintage Paper",
    value: "vintage",
    primaryColor: "oklch(0.618 0.0778 65.5444)"
  },
  {
    name: "Claude",
    value: "claude",
    primaryColor: "oklch(0.6171 0.1375 39.0427)"
  }
];
const initialCustomThemePalette = "default";
const customThemePalette = writable(
  initialCustomThemePalette
);
const getInitialThemeMode = () => {
  return "light";
};
const themeMode = writable(getInitialThemeMode());
customThemePalette.subscribe((value) => {
});
themeMode.subscribe((value) => {
});
function setCustomThemePalette(paletteName) {
  customThemePalette.set(paletteName);
}
function toggleThemeMode() {
  themeMode.update(
    (currentMode) => currentMode === "light" ? "dark" : "light"
  );
}

export { allThemes as a, setCustomThemePalette as s, toggleThemeMode as t };
//# sourceMappingURL=customTheme-BWnX7620.js.map
