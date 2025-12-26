/**
 * ToasterRenderable - Container for toast notifications
 *
 * Manages the display of multiple toasts, subscribes to ToastState,
 * and handles positioning, stacking, and removal.
 */

import { BoxRenderable, type RenderContext } from "@opentui/core";

import { TOAST_WIDTH } from "../constants";
import { ToastState } from "../state";
import type { Toast, ToasterOptions, ToastToDismiss } from "../types";
import { getPositionStyles, isCenteredPosition, isTopPosition } from "../utils";
import { ToastRenderable } from "./toast";

/**
 * ToasterRenderable - Container for toast notifications
 *
 * Features:
 * - Subscribes to ToastState for automatic toast management
 * - Supports 6 position variants (top/bottom + left/center/right)
 * - Single or stack mode for multiple toasts
 * - Configurable visible toast limit in stack mode
 * - Automatic oldest toast removal when limit exceeded
 *
 * @example
 * ```ts
 * import { ToasterRenderable, toast } from '@opentui-ui/toast';
 *
 * // Basic usage - add to your app once
 * const toaster = new ToasterRenderable(ctx);
 * ctx.root.add(toaster);
 *
 * // Then show toasts from anywhere
 * toast.success('Hello World!');
 * ```
 *
 * @example
 * ```ts
 * // With full configuration
 * const toaster = new ToasterRenderable(ctx, {
 *   position: 'top-right',
 *   stackingMode: 'stack',
 *   visibleToasts: 5,
 *   closeButton: true,
 *   gap: 1,
 *   toastOptions: {
 *     style: { backgroundColor: '#1a1a1a' },
 *     duration: 5000,
 *     success: { style: { borderColor: '#22c55e' } },
 *     error: { style: { borderColor: '#ef4444' } },
 *   },
 * });
 * ```
 *
 * @example
 * ```ts
 * // With a theme preset
 * import { minimal } from '@opentui-ui/toast/themes';
 *
 * const toaster = new ToasterRenderable(ctx, {
 *   ...minimal,
 *   position: 'bottom-center',
 * });
 * ```
 */
export class ToasterRenderable extends BoxRenderable {
  private _options: ToasterOptions;
  private _toastRenderables: Map<string | number, ToastRenderable> = new Map();
  private _unsubscribe: (() => void) | null = null;

  constructor(ctx: RenderContext, options: ToasterOptions = {}) {
    const position = options.position ?? "bottom-right";
    const offset = options.offset ?? {};
    const positionStyles = getPositionStyles(position, offset);

    // For center positioning, don't constrain the container width
    // The individual toasts will have their own maxWidth
    const isCentered = isCenteredPosition(position);

    super(ctx, {
      id: "toaster",
      flexDirection: "column",
      gap: options.gap ?? 1,
      zIndex: 9999,
      ...(isCentered ? {} : { maxWidth: options.maxWidth ?? TOAST_WIDTH }),
      ...positionStyles,
    });

    this._options = options;
    this.subscribe();
  }

  /**
   * Subscribe to toast state changes
   */
  private subscribe(): void {
    this._unsubscribe = ToastState.subscribe((toast) => {
      if ("dismiss" in toast && (toast as ToastToDismiss).dismiss) {
        this.removeToast((toast as ToastToDismiss).id);
      } else {
        this.addOrUpdateToast(toast as Toast);
      }
    });
  }

  /**
   * Add a new toast or update an existing one
   */
  private addOrUpdateToast(toast: Toast): void {
    const existing = this._toastRenderables.get(toast.id);

    if (existing) {
      // Update existing toast
      existing.updateToast(toast);
      return;
    }

    // Handle stacking mode
    const stackingMode = this._options.stackingMode ?? "single";
    if (stackingMode === "single") {
      // Dismiss all existing toasts
      for (const [id] of this._toastRenderables) {
        this.removeToast(id);
      }
    } else {
      // Stack mode - limit visible toasts
      const maxVisible = this._options.visibleToasts ?? 3;
      const currentCount = this._toastRenderables.size;

      if (currentCount >= maxVisible) {
        // Remove oldest toast(s)
        const toRemove = currentCount - maxVisible + 1;
        const ids = Array.from(this._toastRenderables.keys());
        for (let i = 0; i < toRemove; i++) {
          const id = ids[i];
          if (id !== undefined) {
            this.removeToast(id);
          }
        }
      }
    }

    // Create new toast renderable with cascading styles
    const toastRenderable = new ToastRenderable(this.ctx, {
      toast,
      icons: this._options.icons,
      toastOptions: this._options.toastOptions,
      closeButton: this._options.closeButton,
      onRemove: (t) => this.handleToastRemoved(t),
    });

    this._toastRenderables.set(toast.id, toastRenderable);

    // Add to container (position based on y-axis)
    const position = this._options.position ?? "bottom-right";
    if (isTopPosition(position)) {
      // New toasts at the end (bottom of stack)
      this.add(toastRenderable);
    } else {
      // New toasts at the beginning (top of stack, visually at bottom)
      this.add(toastRenderable, 0);
    }

    this.requestRender();
  }

  /**
   * Remove a toast by ID
   */
  private removeToast(id: string | number): void {
    const toast = this._toastRenderables.get(id);
    if (toast) {
      toast.dismiss();
    }
  }

  /**
   * Handle when a toast is fully removed
   */
  private handleToastRemoved(toast: Toast): void {
    const renderable = this._toastRenderables.get(toast.id);
    if (renderable) {
      this._toastRenderables.delete(toast.id);
      this.remove(renderable.id);
      renderable.destroy();
      this.requestRender();
    }
  }

  /**
   * Get the current number of visible toasts
   *
   * @example
   * ```ts
   * if (toaster.toastCount > 0) {
   *   console.log(`Showing ${toaster.toastCount} notifications`);
   * }
   * ```
   */
  public get toastCount(): number {
    return this._toastRenderables.size;
  }

  /**
   * Dismiss all toasts managed by this toaster
   *
   * @example
   * ```ts
   * // Clear all notifications
   * toaster.dismissAll();
   * ```
   */
  public dismissAll(): void {
    for (const [id] of this._toastRenderables) {
      this.removeToast(id);
    }
  }

  /**
   * Clean up on destroy
   */
  public override destroy(): void {
    this._unsubscribe?.();

    for (const [, renderable] of this._toastRenderables) {
      renderable.destroy();
    }
    this._toastRenderables.clear();

    super.destroy();
  }
}
