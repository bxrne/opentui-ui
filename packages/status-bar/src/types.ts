import type { BorderStyle, Renderable } from "@opentui/core";

export interface StatusBarOptions {
  /** Height of the status bar */
  height?: number;
  /** Background color */
  backgroundColor?: string;
  /** Show border */
  border?: boolean;
  /** Border color */
  borderColor?: string;
  /** Border style */
  borderStyle?: BorderStyle;
  /** Left section content */
  left?: Renderable | Renderable[];
  /** Center section content */
  center?: Renderable | Renderable[];
  /** Right section content */
  right?: Renderable | Renderable[];
}

