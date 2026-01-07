import type { BorderStyle, Renderable, RenderContext } from "@opentui/core";
import type { PaddingInput } from "@opentui-ui/utils";

export interface PanelStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderStyle?: BorderStyle;
  border?: boolean;
  padding?: number | PaddingInput;
}

export interface PanelOptions extends PanelStyle {
  /** Panel title (string or renderable) */
  title?: string | Renderable;
  /** Panel content (renderable or array of renderables) */
  content: Renderable | Renderable[];
  /** Whether the panel can be collapsed */
  collapsible?: boolean;
  /** Whether the panel is initially collapsed */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onToggle?: (collapsed: boolean) => void;
}

