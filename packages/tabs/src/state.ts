import type { Tab } from "./types";

export class TabsState {
  private _tabs: Map<string | number, Tab> = new Map();
  private _activeTab: string | number | undefined;
  private _subscribers: Set<(tabs: Tab[], activeTab?: string | number) => void> =
    new Set();

  constructor(tabs: Tab[], activeTab?: string | number) {
    for (const tab of tabs) {
      this._tabs.set(tab.id, tab);
    }
    this._activeTab = activeTab ?? tabs[0]?.id;
  }

  public get tabs(): Tab[] {
    return Array.from(this._tabs.values());
  }

  public get activeTab(): string | number | undefined {
    return this._activeTab;
  }

  public setActiveTab(id: string | number): void {
    if (this._tabs.has(id)) {
      this._activeTab = id;
      this.notify();
    }
  }

  public closeTab(id: string | number): boolean {
    if (!this._tabs.has(id)) return false;
    if (this._tabs.size === 1) return false; // Don't close last tab

    this._tabs.delete(id);

    // If closed tab was active, switch to another tab
    if (this._activeTab === id) {
      const remainingTabs = Array.from(this._tabs.keys());
      this._activeTab = remainingTabs[0];
    }

    this.notify();
    return true;
  }

  public subscribe(
    callback: (tabs: Tab[], activeTab?: string | number) => void,
  ): () => void {
    this._subscribers.add(callback);
    return () => {
      this._subscribers.delete(callback);
    };
  }

  private notify(): void {
    const tabs = this.tabs;
    const activeTab = this._activeTab;
    for (const callback of this._subscribers) {
      callback(tabs, activeTab);
    }
  }
}

