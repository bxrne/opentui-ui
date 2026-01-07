import {
  BoxRenderable,
  type RenderContext,
  type Renderable,
} from "@opentui/core";
import { DEFAULT_STATUS_BAR_HEIGHT, STATUS_BAR_Z_INDEX } from "../constants";
import type { StatusBarOptions } from "../types";

export class StatusBarRenderable extends BoxRenderable {
  private _options: StatusBarOptions;
  private _leftContainer: BoxRenderable;
  private _centerContainer: BoxRenderable;
  private _rightContainer: BoxRenderable;

  constructor(ctx: RenderContext, options: StatusBarOptions = {}) {
    const height = options.height ?? DEFAULT_STATUS_BAR_HEIGHT;

    super(ctx, {
      id: "status-bar",
      position: "absolute",
      left: 0,
      bottom: 0,
      width: ctx.width,
      height,
      backgroundColor: options.backgroundColor ?? "#1a1a1a",
      border: options.border ?? true,
      borderColor: options.borderColor,
      borderStyle: options.borderStyle,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 1,
      paddingRight: 1,
      zIndex: STATUS_BAR_Z_INDEX,
    });

    this._options = options;

    // Create containers for left, center, right sections
    this._leftContainer = new BoxRenderable(ctx, {
      id: "status-bar-left",
      flexDirection: "row",
      alignItems: "center",
      gap: 1,
    });

    this._centerContainer = new BoxRenderable(ctx, {
      id: "status-bar-center",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
    });

    this._rightContainer = new BoxRenderable(ctx, {
      id: "status-bar-right",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 1,
    });

    // Add content to sections
    if (options.left) {
      this.addToSection(this._leftContainer, options.left);
    }
    if (options.center) {
      this.addToSection(this._centerContainer, options.center);
    }
    if (options.right) {
      this.addToSection(this._rightContainer, options.right);
    }

    // Add containers to status bar
    this.add(this._leftContainer);
    this.add(this._centerContainer);
    this.add(this._rightContainer);
  }

  private addToSection(
    container: BoxRenderable,
    content: Renderable | Renderable[],
  ): void {
    if (Array.isArray(content)) {
      for (const item of content) {
        container.add(item);
      }
    } else {
      container.add(content);
    }
  }

  public updateDimensions(width: number): void {
    this.width = width;
    this.requestRender();
  }

  public set left(value: Renderable | Renderable[] | undefined) {
    this._options.left = value;
    const children = [...this._leftContainer.children];
    for (const child of children) {
      this._leftContainer.remove(child.id);
      child.destroyRecursively();
    }
    if (value) {
      this.addToSection(this._leftContainer, value);
    }
    this.requestRender();
  }

  public set center(value: Renderable | Renderable[] | undefined) {
    this._options.center = value;
    const children = [...this._centerContainer.children];
    for (const child of children) {
      this._centerContainer.remove(child.id);
      child.destroyRecursively();
    }
    if (value) {
      this.addToSection(this._centerContainer, value);
    }
    this.requestRender();
  }

  public set right(value: Renderable | Renderable[] | undefined) {
    this._options.right = value;
    const children = [...this._rightContainer.children];
    for (const child of children) {
      this._rightContainer.remove(child.id);
      child.destroyRecursively();
    }
    if (value) {
      this.addToSection(this._rightContainer, value);
    }
    this.requestRender();
  }

  public override destroy(): void {
    this._leftContainer.destroyRecursively();
    this._centerContainer.destroyRecursively();
    this._rightContainer.destroyRecursively();
    super.destroy();
  }
}

