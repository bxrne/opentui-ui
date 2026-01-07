import {
  BoxRenderable,
  TextRenderable,
  type RenderContext,
  type Renderable,
} from "@opentui/core";
import { DEFAULT_HEADER_HEIGHT, HEADER_Z_INDEX } from "../constants";
import type { HeaderOptions } from "../types";

export class HeaderRenderable extends BoxRenderable {
  private _options: HeaderOptions;
  private _titleRenderable: Renderable;
  private _actionsContainer: BoxRenderable;

  constructor(ctx: RenderContext, options: HeaderOptions) {
    const height = options.height ?? DEFAULT_HEADER_HEIGHT;

    super(ctx, {
      id: "header",
      position: "absolute",
      left: 0,
      top: 0,
      width: ctx.width,
      height,
      backgroundColor: options.backgroundColor ?? "#1a1a1a",
      border: options.border ?? true,
      borderColor: options.borderColor,
      borderStyle: options.borderStyle,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 2,
      paddingRight: 2,
      zIndex: HEADER_Z_INDEX,
    });

    this._options = options;

    // Create title
    if (typeof options.title === "string") {
      this._titleRenderable = new TextRenderable(ctx, {
        id: "header-title",
        content: options.title,
        fg: options.borderColor,
      });
    } else {
      this._titleRenderable = options.title;
    }

    // Create actions container
    this._actionsContainer = new BoxRenderable(ctx, {
      id: "header-actions",
      flexDirection: "row",
      alignItems: "center",
      gap: 1,
    });

    // Add actions if provided
    if (options.actions) {
      this.addActions(options.actions);
    }

    // Add title and actions
    this.add(this._titleRenderable);
    this.add(this._actionsContainer);
  }

  private addActions(actions: Renderable | Renderable[]): void {
    if (Array.isArray(actions)) {
      for (const action of actions) {
        this._actionsContainer.add(action);
      }
    } else {
      this._actionsContainer.add(actions);
    }
  }

  public updateDimensions(width: number): void {
    this.width = width;
    this.requestRender();
  }

  public set title(value: string | Renderable) {
    this._options.title = value;
    this.remove(this._titleRenderable.id);
    this._titleRenderable.destroyRecursively();

    if (typeof value === "string") {
      this._titleRenderable = new TextRenderable(this.ctx, {
        id: "header-title",
        content: value,
        fg: this._options.borderColor,
      });
    } else {
      this._titleRenderable = value;
    }

    this.add(this._titleRenderable, 0);
    this.requestRender();
  }

  public set actions(value: Renderable | Renderable[] | undefined) {
    this._options.actions = value;
    const children = [...this._actionsContainer.children];
    for (const child of children) {
      this._actionsContainer.remove(child.id);
      child.destroyRecursively();
    }
    if (value) {
      this.addActions(value);
    }
    this.requestRender();
  }

  public override destroy(): void {
    this._titleRenderable.destroyRecursively();
    this._actionsContainer.destroyRecursively();
    super.destroy();
  }
}

