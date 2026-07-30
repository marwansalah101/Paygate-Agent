import * as THREE from "three";

// Same 1.586:1 ratio as the card body, rendered large enough to stay crisp
// under the plane's real-world size.
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 646;

const GRAY_200 = "#e5e8ec"; // mirrors --color-gray-200
const GRAY_500 = "#6b7280"; // mirrors --color-gray-500
const BLUE_HIGHLIGHT = "#c7dffb"; // mirrors --color-blue-highlight

const SANS_STACK = "ui-sans-serif, system-ui, -apple-system, sans-serif";
const MONO_STACK = "ui-monospace, 'SFMono-Regular', Menlo, monospace";

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawTrackedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, tracking: number) {
  let cursor = x;
  for (const char of text) {
    ctx.fillText(char, cursor, y);
    cursor += ctx.measureText(char).width + tracking;
  }
}

/**
 * Draws a believable (fictional) payment-card face onto an offscreen
 * canvas and returns it as a CanvasTexture — no network fetch, no binary
 * asset, fully procedural. Everything outside the rounded silhouette stays
 * transparent so the plane reads as a printed decal over the card body's
 * own material, not an opaque second face.
 */
export function createCardFaceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    roundedRectPath(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 48);
    ctx.save();
    ctx.clip();

    // Chip — cool silver/gray, deliberately not gold: keeps the site's
    // single-accent-color discipline and reads more fintech-native.
    const chipX = 72;
    const chipY = 96;
    const chipW = 130;
    const chipH = 100;
    const chipGradient = ctx.createLinearGradient(chipX, chipY, chipX, chipY + chipH);
    chipGradient.addColorStop(0, GRAY_200);
    chipGradient.addColorStop(1, GRAY_500);
    roundedRectPath(ctx, chipX, chipY, chipW, chipH, 14);
    ctx.fillStyle = chipGradient;
    ctx.fill();

    ctx.strokeStyle = "rgba(17, 19, 24, 0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(chipX + chipW / 2, chipY + 12);
    ctx.lineTo(chipX + chipW / 2, chipY + chipH - 12);
    ctx.moveTo(chipX + 12, chipY + chipH / 2);
    ctx.lineTo(chipX + chipW - 12, chipY + chipH / 2);
    ctx.stroke();

    // Wordmark — "Pay" + accent dot + "Gate", right-aligned.
    const wordmarkY = 150;
    const rightMargin = 72;
    ctx.font = `600 44px ${SANS_STACK}`;
    ctx.textAlign = "left";
    const payWidth = ctx.measureText("Pay").width;
    const gateWidth = ctx.measureText("Gate").width;
    const dotDiameter = 14;
    const dotGap = 12;
    const totalWidth = payWidth + dotGap + dotDiameter + dotGap + gateWidth;
    let cursorX = CANVAS_WIDTH - rightMargin - totalWidth;

    ctx.fillStyle = "#ffffff";
    ctx.fillText("Pay", cursorX, wordmarkY);
    cursorX += payWidth + dotGap;

    ctx.fillStyle = BLUE_HIGHLIGHT;
    ctx.beginPath();
    ctx.arc(cursorX + dotDiameter / 2, wordmarkY - 14, dotDiameter / 2, 0, Math.PI * 2);
    ctx.fill();
    cursorX += dotDiameter + dotGap;

    ctx.fillStyle = "#ffffff";
    ctx.fillText("Gate", cursorX, wordmarkY);

    // Masked card number — the one monospace "live data" element on the face.
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = `500 52px ${MONO_STACK}`;
    ctx.fillText("••••  ••••  ••••  4521", 72, 420);

    // Merchant name — same fictional pilot merchant used in the demo form,
    // for narrative continuity across the page.
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = `600 26px ${SANS_STACK}`;
    drawTrackedText(ctx, "RIYADH COFFEE CO.", 72, CANVAS_HEIGHT - 72, 3);

    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
