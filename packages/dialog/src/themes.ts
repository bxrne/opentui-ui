import type { DialogContainerOptions, DialogStyle } from "./types";

export interface DialogTheme extends Omit<DialogContainerOptions, "manager"> {
  name: string;
  description: string;
}

export const DEFAULT_BACKDROP_OPACITY = 0.35;

export const DEFAULT_STYLE: DialogStyle = {
  backdropOpacity: DEFAULT_BACKDROP_OPACITY,
  backdropColor: "#000000",
  backgroundColor: "#262626",
  border: false,
  padding: 1,
};

export const DEFAULT_PADDING = { top: 1, right: 1, bottom: 1, left: 1 };

export const minimal: DialogTheme = {
  name: "Minimal",
  description: "Clean and unobtrusive, lighter backdrop, no borders (default)",
  backdropMode: "top-only",
  dialogOptions: {
    style: DEFAULT_STYLE,
  },
};

export const classic: DialogTheme = {
  name: "Classic",
  description: "Traditional dialog style with heavier backdrop",
  backdropMode: "per-dialog",
  dialogOptions: {
    style: {
      backdropOpacity: 0.59,
      backdropColor: "#000000",
      backgroundColor: "#1a1a1a",
      border: false,
      paddingTop: 1,
      paddingRight: 2,
      paddingBottom: 1,
      paddingLeft: 2,
    },
  },
};

export const unstyled: DialogTheme = {
  name: "Unstyled",
  description: "No default styles - full control for custom implementations",
  unstyled: true,
  backdropMode: "top-only",
  dialogOptions: {
    unstyled: true,
    style: {
      backdropOpacity: 0,
      backgroundColor: undefined,
      border: false,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    },
  },
};

export const danger: DialogTheme = {
  name: "Danger",
  description: "Red-accented for destructive actions",
  backdropMode: "top-only",
  dialogOptions: {
    style: {
      backdropOpacity: 0.65,
      backdropColor: "#1a0000",
      backgroundColor: "#1a1a1a",
      border: true,
      borderColor: "#b91c1c",
      borderStyle: "single",
      paddingTop: 1,
      paddingRight: 2,
      paddingBottom: 1,
      paddingLeft: 2,
    },
  },
};

export const themes = {
  minimal,
  classic,
  unstyled,
  danger,
} as const;
