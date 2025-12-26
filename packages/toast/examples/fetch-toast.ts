#!/usr/bin/env bun
/**
 * Fetch Toast Example
 *
 * Demonstrates toast.promise() with HTTP responses, including
 * automatic handling of non-2xx status codes.
 *
 * Run with: bun packages/toast/examples/fetch-toast.ts
 */

import {
  BoxRenderable,
  createCliRenderer,
  type KeyEvent,
  TextRenderable,
} from "@opentui/core";

import { ToasterRenderable, toast } from "../src/index";

/** Simulate network latency */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Simulate a fetch with artificial delay */
async function fakeFetch(
  response: Response,
  latency = 1500,
): Promise<Response> {
  await delay(latency);
  return response;
}

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  targetFps: 30,
});

renderer.setBackgroundColor("#1a1a2e");

// Main container
const main = new BoxRenderable(renderer, {
  id: "main",
  flexDirection: "column",
  padding: 2,
  gap: 1,
});

main.add(
  new TextRenderable(renderer, {
    id: "title",
    content: "Fetch Toast Demo",
    fg: "#e94560",
  }),
);

main.add(
  new TextRenderable(renderer, {
    id: "help",
    content: `
Press a key to test different HTTP scenarios:
  1 - Success (200 OK)
  2 - Not Found (404)
  3 - Server Error (500)
  4 - Network Error (fetch throws)
  q - Quit
`.trim(),
    fg: "#a0a0a0",
  }),
);

renderer.root.add(main);

// Toaster
const toaster = new ToasterRenderable(renderer, {
  position: "bottom-right",
});
renderer.root.add(toaster);

// Keyboard handler
renderer.keyInput.on("keypress", (key: KeyEvent) => {
  switch (key.name) {
    case "1":
      // Simulate successful response
      toast.promise(
        fakeFetch(
          new Response(JSON.stringify({ id: 1, name: "John" }), {
            status: 200,
          }),
        ),
        {
          loading: "Fetching user...",
          success: "User loaded successfully!",
          error: "Failed to load user",
        },
      );
      break;

    case "2":
      // Simulate 404 response - toast.promise detects response.ok === false
      toast.promise(
        fakeFetch(
          new Response("Not Found", { status: 404, statusText: "Not Found" }),
        ),
        {
          loading: "Fetching user...",
          success: "User loaded!",
          error: (err) => `Error: ${err}`,
        },
      );
      break;

    case "3":
      // Simulate 500 response
      toast.promise(
        fakeFetch(new Response("Internal Server Error", { status: 500 })),
        {
          loading: "Saving data...",
          success: "Saved!",
          error: (err) => `Server error: ${err}`,
        },
      );
      break;

    case "4":
      // Simulate network failure (promise rejects)
      toast.promise(
        delay(1500).then(() =>
          Promise.reject(new Error("Network unavailable")),
        ),
        {
          loading: "Connecting...",
          success: "Connected!",
          error: (err) =>
            `Connection failed: ${err instanceof Error ? err.message : err}`,
        },
      );
      break;

    case "q":
      renderer.destroy();
      process.exit(0);
  }
});
