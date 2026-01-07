#!/usr/bin/env bun
/**
 * Basic Tabs Example
 *
 * Demonstrates the tabs component with @opentui/core.
 * Run with: bun packages/tabs/examples/basic-tabs.ts
 */

import {
  BoxRenderable,
  type CliRenderer,
  createCliRenderer,
  type KeyEvent,
  TextRenderable,
} from "@opentui/core";

import { TabsRenderable } from "../src/index";

let renderer: CliRenderer | null = null;
let tabs: TabsRenderable | null = null;

function createUI(rendererInstance: CliRenderer): void {
  renderer = rendererInstance;
  renderer.setBackgroundColor("#1a1a2e");

  const mainContainer = new BoxRenderable(renderer, {
    id: "main",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 1,
    gap: 1,
  });

  const title = new TextRenderable(renderer, {
    id: "title",
    content: "Tabs Demo",
    fg: "#e94560",
  });
  mainContainer.add(title);

  // Create tabs
  tabs = new TabsRenderable(renderer, {
    tabs: [
      {
        id: "tab1",
        label: "Tab 1",
        content: new TextRenderable(renderer, {
          content: "Content for Tab 1\n\nThis is the first tab's content.",
          wrapMode: "word",
        }),
      },
      {
        id: "tab2",
        label: "Tab 2",
        content: new TextRenderable(renderer, {
          content: "Content for Tab 2\n\nThis is the second tab's content.",
          wrapMode: "word",
        }),
        closable: true,
      },
      {
        id: "tab3",
        label: "Tab 3",
        content: new TextRenderable(renderer, {
          content: "Content for Tab 3\n\nThis is the third tab's content.",
          wrapMode: "word",
        }),
        closable: true,
      },
    ],
    activeTab: "tab1",
    onTabChange: (id) => {
      console.log("Tab changed to:", id);
    },
    onTabClose: (id) => {
      console.log("Tab closed:", id);
    },
  });
  mainContainer.add(tabs);

  const helpText = new TextRenderable(renderer, {
    id: "help",
    content: "Press 'q' to quit",
    fg: "#a0a0a0",
  });
  mainContainer.add(helpText);

  renderer.root.add(mainContainer);

  // Set up keyboard handler
  renderer.keyInput.on("keypress", (evt: KeyEvent) => {
    const key = evt.name;
    switch (key) {
      case "q":
        renderer?.destroy();
        break;
    }
  });
}

createCliRenderer({
  onInit: createUI,
  onResize: () => {
    // Handle resize if needed
  },
});

