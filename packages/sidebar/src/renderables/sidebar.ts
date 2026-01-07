import {
  BoxRenderable,
  type RenderContext,
  type Renderable,
} from "@opentui/core";
import {
  DEFAULT_COLLAPSED_WIDTH,
  DEFAULT_SIDEBAR_WIDTH,
  SIDEBAR_Z_INDEX,
} from "../constants";
import type { SidebarOptions } from "../types";

export class SidebarRenderable extends BoxRenderable {
  private _options: SidebarOptions;
  private _contentContainer: BoxRenderable;
  private _collapsed: boolean;
  private _expandedWidth: number;
  private _collapsedWidth: number;

  constructor(ctx: RenderContext, options: SidebarOptions) {
    const position = options.position ?? "left";
    const expandedWidth = options.width ?? DEFAULT_SIDEBAR_WIDTH;
    const collapsedWidth = options.collapsedWidth ?? DEFAULT_COLLAPSED_WIDTH;
    const collapsed = options.collapsed ?? false;

    super(ctx, {
      id: "sidebar",
      position: "absolute",
      left: position === "left" ? 0 : undefined,
      right: position === "right" ? 0 : undefined,
      top: 0,
      width: collapsed ? collapsedWidth : expandedWidth,
      height: ctx.height,
      backgroundColor: options.backgroundColor ?? "#1a1a1a",
      border: options.border ?? true,
      borderColor: options.borderColor,
      borderStyle: options.borderStyle,
      flexDirection: "column",
      zIndex: SIDEBAR_Z_INDEX,
    });

    this._options = options;
    this._collapsed = collapsed;
    this._expandedWidth = expandedWidth;
    this._collapsedWidth = collapsedWidth;

    // Create content container
    this._contentContainer = new BoxRenderable(ctx, {
      id: "sidebar-content",
      flexDirection: "column",
      visible: !collapsed,
      padding: 1,
    });

    // Add content
    this.addContent(options.content);

    // Add content container
    this.add(this._contentContainer);
  }

  private addContent(content: Renderable | Renderable[]): void {
    if (Array.isArray(content)) {
      for (const item of content) {
        this._contentContainer.add(item);
      }
    } else {
      this._contentContainer.add(content);
    }
  }

  public updateDimensions(_width: number, height?: number): void {
    const h = height ?? this._ctx.height;
    this.height = h;
    this.requestRender();
  }

  public get collapsed(): boolean {
    return this._collapsed;
  }

  public set collapsed(value: boolean) {
    if (this._collapsed === value) return;

    this._collapsed = value;
    this.width = value ? this._collapsedWidth : this._expandedWidth;
    this._contentContainer.visible = !value;
    this._options.onToggle?.(value);
    this.requestRender();
  }

  public toggle(): void {
    this.collapsed = !this._collapsed;
  }

  public set content(value: Renderable | Renderable[]) {
    const children = [...this._contentContainer.children];
    for (const child of children) {
      this._contentContainer.remove(child.id);
      child.destroyRecursively();
    }
    this.addContent(value);
    this.requestRender();
  }

  public override destroy(): void {
    this._contentContainer.destroyRecursively();
    super.destroy();
  }
}

