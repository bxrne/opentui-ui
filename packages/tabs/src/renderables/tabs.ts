import {
  BoxRenderable,
  type RenderContext,
} from "@opentui/core";
import { TabsState } from "../state";
import type { TabsOptions } from "../types";
import { TabRenderable } from "./tab";

export class TabsRenderable extends BoxRenderable {
  private _options: TabsOptions;
  private _state: TabsState;
  private _tabBar: BoxRenderable;
  private _contentContainer: BoxRenderable;
  private _tabRenderables: Map<string | number, TabRenderable> = new Map();
  private _unsubscribe: (() => void) | null = null;

  constructor(ctx: RenderContext, options: TabsOptions) {
    super(ctx, {
      id: "tabs",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    });

    this._options = options;
    this._state = new TabsState(options.tabs, options.activeTab);

    // Create tab bar
    this._tabBar = new BoxRenderable(ctx, {
      id: "tabs-bar",
      flexDirection: "row",
      width: "100%",
      gap: 0,
      border: true,
      borderColor: "#4a4a4a",
    });

    // Create content container
    this._contentContainer = new BoxRenderable(ctx, {
      id: "tabs-content",
      flexDirection: "column",
      width: "100%",
      flex: 1,
    });

    // Subscribe to state changes
    this._unsubscribe = this._state.subscribe((tabs, activeTab) => {
      this.updateTabs(tabs, activeTab);
    });

    // Initial render
    this.updateTabs(this._state.tabs, this._state.activeTab);

    // Add containers
    this.add(this._tabBar);
    this.add(this._contentContainer);
  }

  private updateTabs(tabs: typeof this._state.tabs, activeTab?: string | number): void {
    // Update tab bar
    const children = [...this._tabBar.children];
    for (const child of children) {
      this._tabBar.remove(child.id);
      child.destroyRecursively();
    }
    this._tabRenderables.clear();

    for (const tab of tabs) {
      const isActive = tab.id === activeTab;
      const tabRenderable = new TabRenderable(this.ctx, {
        tab,
        active: isActive,
        onSelect: () => {
          this._state.setActiveTab(tab.id);
          this._options.onTabChange?.(tab.id);
        },
        onClose: tab.closable
          ? () => {
              if (this._state.closeTab(tab.id)) {
                this._options.onTabClose?.(tab.id);
              }
            }
          : undefined,
      });
      this._tabRenderables.set(tab.id, tabRenderable);
      this._tabBar.add(tabRenderable);
    }

    // Update content
    const contentChildren = [...this._contentContainer.children];
    for (const child of contentChildren) {
      this._contentContainer.remove(child.id);
      child.destroyRecursively();
    }

    if (activeTab !== undefined) {
      const activeTabData = tabs.find((t) => t.id === activeTab);
      if (activeTabData) {
        this._contentContainer.add(activeTabData.content);
      }
    }

    this.requestRender();
  }

  public set activeTab(value: string | number | undefined) {
    if (value !== undefined) {
      this._state.setActiveTab(value);
      this._options.onTabChange?.(value);
    }
  }

  public get activeTab(): string | number | undefined {
    return this._state.activeTab;
  }

  public override destroy(): void {
    this._unsubscribe?.();
    this._tabBar.destroyRecursively();
    this._contentContainer.destroyRecursively();
    super.destroy();
  }
}

