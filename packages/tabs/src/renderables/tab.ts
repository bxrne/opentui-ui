import {
  BoxRenderable,
  TextRenderable,
  type RenderContext,
  type Renderable,
} from "@opentui/core";
import type { Tab } from "../types";

export interface TabRenderableOptions {
  tab: Tab;
  active: boolean;
  onSelect: () => void;
  onClose?: () => void;
}

export class TabRenderable extends BoxRenderable {
  private _tab: Tab;
  private _active: boolean;
  private _onSelect: () => void;
  private _onClose?: () => void;
  private _labelRenderable: Renderable;

  constructor(ctx: RenderContext, options: TabRenderableOptions) {
    super(ctx, {
      id: `tab-${options.tab.id}`,
      flexDirection: "row",
      alignItems: "center",
      gap: 1,
      paddingLeft: 1,
      paddingRight: 1,
      backgroundColor: options.active ? "#2a2a2a" : undefined,
      border: options.active,
      borderColor: options.active ? "#4a4a4a" : undefined,
    });

    this._tab = options.tab;
    this._active = options.active;
    this._onSelect = options.onSelect;
    this._onClose = options.onClose;

    // Create label
    if (typeof options.tab.label === "string") {
      this._labelRenderable = new TextRenderable(ctx, {
        id: `tab-label-${options.tab.id}`,
        content: options.tab.label,
        fg: options.active ? "#ffffff" : "#888888",
      });
    } else {
      this._labelRenderable = options.tab.label;
    }

    this.add(this._labelRenderable);

    // Add close button if closable
    if (options.tab.closable && this._onClose) {
      const closeButton = new TextRenderable(ctx, {
        id: `tab-close-${options.tab.id}`,
        content: "×",
        fg: "#888888",
      });
      this.add(closeButton);
    }
  }

  public set active(value: boolean) {
    if (this._active === value) return;

    this._active = value;
    this.backgroundColor = value ? "#2a2a2a" : undefined;
    this.border = value;
    this.borderColor = value ? "#4a4a4a" : undefined;

    if (typeof this._tab.label === "string" && this._labelRenderable instanceof TextRenderable) {
      this._labelRenderable.fg = value ? "#ffffff" : "#888888";
    }

    this.requestRender();
  }

  public get tab(): Tab {
    return this._tab;
  }
}

