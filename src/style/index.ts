import * as PIXI from "pixi.js";
export const retroGoldGradient = new PIXI.TextStyle({
    fontFamily: "Press Start 2P",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: ["#fcb69f", "#f6d365"], // gradient
    stroke: "#e6e9f0",
    strokeThickness: 3,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

export const postSpectacularGradient = new PIXI.TextStyle({
    fontFamily: "Orbitron",
    fontSize: 72,
    fontWeight: "bold",
    fill: ["#6a11cb", "#2575fc"], // gradient
    stroke: "#4facfe",
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: false,
    wordWrapWidth: 440,
});
