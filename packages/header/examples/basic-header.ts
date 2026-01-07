#!/usr/bin/env bun
/**
 * Basic Header Example
 *
 * Demonstrates the header component with @opentui/core.
 * Run with: bun packages/header/examples/basic-header.ts
 */

import {
  BoxRenderable,
  type CliRenderer,
  createCliRenderer,
  type KeyEvent,
  TextRenderable,
} from "@opentui/core";

import { HeaderRenderable } from "../src/index";

let renderer: CliRenderer | null = null;
let header: HeaderRenderable | null = null;

function createUI(rendererInstance: CliRenderer): void {
  renderer = rendererInstance;
  renderer.setBackgroundColor("#1a1a2e");

  // Create header
  header = new HeaderRenderable(renderer, {
    title: "My Application",
    actions: new TextRenderable(renderer, { content: "Settings | Help" }),
    backgroundColor: "#1a1a1a",
    border: true,
  });
  renderer.root.add(header);

  const mainContainer = new BoxRenderable(renderer, {
    id: "main",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 2,
    gap: 1,
    paddingTop: 3, // Account for header
  });

  const title = new TextRenderable(renderer, {
    id: "title",
    content: "Header Demo",
    fg: "#e94560",
  });
  mainContainer.add(title);

  const content = new TextRenderable(renderer, {
    id: "content",
    content: "This is the main content area.\nThe header is fixed at the top.",
    wrapMode: "word",
    fg: "#a0a0a0",
  });
  mainContainer.add(content);

  const helpText = new TextRenderable(renderer, {
    id: "help",
    content: "Press 'q' to quit",
    fg: "#888888",
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
  onResize: (width) => {
    header?.updateDimensions(width);
  },
});

