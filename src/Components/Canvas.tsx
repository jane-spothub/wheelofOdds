import {useRef, useEffect, type FC, useCallback} from "react";
import type {ColorBlock} from "../Utils/types.ts";
import {initialColors, usePrevious} from "../Hooks/useColors.ts";
import PointerImg from "../assets/img/scene/pointer-spin2.png"

interface CanvasProps {
    spinState: boolean;
    OnSetWinner:(w:ColorBlock)=>void;
    winner:ColorBlock| null;
}

export const Canvas: FC<CanvasProps> = ({spinState,OnSetWinner,winner}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offsetRef = useRef(0); // rotation offset

    const colorsRef = useRef<ColorBlock[]>(initialColors);
    const pointer = useRef<HTMLImageElement | null>(null);


    const drawWheel = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = "rgba(107,149,231,0.4)"; // pick your color
        ctx.fillRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 380; // 600px diameter

        ctx.clearRect(0, 0, width, height);
        ctx.save();

// // // define clipping path → top half of the circle
//         ctx.beginPath();
//         ctx.arc(centerX, centerY, radius + 5, Math.PI, 0); // semi-circle (180° to 0°)
//         ctx.lineTo(centerX, centerY+30);
//         ctx.closePath();
//         ctx.clip();

        const colors = colorsRef.current;
        const sliceAngle = (2 * Math.PI) / colors.length;

        colors.forEach((block, i) => {
            const startAngle = i * sliceAngle + offsetRef.current;
            const endAngle = startAngle + sliceAngle;

            // slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();

            // 🎨 check if this slice is orange → use gradient
            if (block.hex === "gradient-orange") {
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,       // inner circle (center, radius 0)
                    centerX, centerY, radius   // outer circle (center, radius = wheel size)
                );

                grad.addColorStop(0, "rgb(230,112,34)"); // inner (darker orange)
                grad.addColorStop(0.25, "rgb(241,184,57)"); // inner (darker orange)
                grad.addColorStop(1, "rgb(230,112,34)"); // outer (lighter golden)

                ctx.fillStyle = grad;

            } else {

                // ctx.fillStyle = block.hex; // solid purple
                const grad = ctx.createRadialGradient(
                    centerX, centerY, 0,           // inner circle (center, radius 0)
                    centerX, centerY, radius       // outer circle (center, radius = wheel radius)
                );

                grad.addColorStop(0, "rgba(68,18,47,0.2)"); // inner
                grad.addColorStop(1, "rgb(90,32,65)"); // outer

                ctx.fillStyle = grad;
            }
            ctx.fill();

            // label
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);

            // ✅ If purple background → make text white, else black
            if (block.hex === "rgb(90,32,67)") {
                ctx.fillStyle = "#fff";
            } else {
                ctx.fillStyle = "#000";
            }
            ctx.font = "bold 32px Arial";
            ctx.fillStyle = "#fff";
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 3;

            const text = block.name;
            // adjust y position
            ctx.strokeText(text,radius * 0.8, 0);
            ctx.fillText(text,radius * 0.8, 0);

            // ctx.fillText(block.name, radius * 0.7, 0);
            ctx.restore();

        });
/// 🎨 Gradient border for the wheel
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

// create linear gradient for stroke
        const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
        gradient.addColorStop(0, "rgb(90,32,67)");   // light gold
        gradient.addColorStop(0.25, "rgb(47,4,30)");
        gradient.addColorStop(0.5, "rgb(90,32,67)");
        gradient.addColorStop(0.75, "rgb(47,4,30)");
        gradient.addColorStop(1, "rgb(90,32,67)");

        ctx.lineWidth = 20;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.restore();

/// ✨ Inner shadow effect
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 10, 0, Math.PI * 2); // clip slightly inside
        ctx.clip();

        ctx.globalCompositeOperation = "source-atop";

// radial gradient fading inward
        const shadowGradient = ctx.createRadialGradient(centerX, centerY, radius - 30, centerX, centerY, radius);
        shadowGradient.addColorStop(0, "rgba(0,0,0,0)");
        shadowGradient.addColorStop(1, "rgba(0,0,0,0.5)");

        ctx.fillStyle = shadowGradient;
        ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

        ctx.restore();


        if (pointer.current) {
            const pointerWidth = 90;
            const pointerHeight = 60;

            const pointerX = centerX - pointerWidth / 2;
            const pointerY = centerY - radius - pointerHeight + 38;

            ctx.drawImage(pointer.current, pointerX, pointerY, pointerWidth, pointerHeight);
        }


        // === 🎨 Center Circle with Gradient + Outer + Inner Shadow ===
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);

// linear gradient for the circle fill
        const centerGradient = ctx.createRadialGradient(
            centerX, centerY, 0,        // inner circle (at center, radius 0)
            centerX, centerY, 80        // outer circle (at center, radius 60)
        );

// add color stops
        centerGradient.addColorStop(0, "rgb(242,176,30)");   // light gold
        centerGradient.addColorStop(0.25, "rgb(242,176,30)");
        centerGradient.addColorStop(0.5, "rgb(230,112,34)");
        centerGradient.addColorStop(0.75, "rgb(230,112,34)");
        centerGradient.addColorStop(1, "rgb(34,3,38)");
// fill with gradient
        ctx.fillStyle = centerGradient;

// ✅ Outer shadow
        ctx.shadowColor = "rgb(0,0,0)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;

        ctx.fill();
        ctx.restore();

// === ✨ Inner shadow trick ===
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.clip();

        ctx.globalCompositeOperation = "source-atop";

// radial gradient for inner shadow (dark edge, transparent inside)
        const innerShadow = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 60);
        innerShadow.addColorStop(0, "rgba(0,0,0,0)");   // center clear
        innerShadow.addColorStop(1, "rgba(57,0,65,0.35)"); // edge dark

        ctx.fillStyle = innerShadow;
        ctx.fillRect(centerX - 60, centerY - 60, 120, 120);
        ctx.restore();

        //
        // ctx.stroke();
        // ctx.restore();
        if (winner) {
            ctx.fillStyle = "rgb(47,4,30)";   // inside color
            ctx.font = "bold 90px Arial";     // bold + big font
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.strokeStyle = "#fffefe";      // outline color (black)
            ctx.lineWidth = 4;                // outline thickness

// Draw outline first
            ctx.strokeText(winner.name, centerX, centerY);

// Draw filled text on top
            ctx.fillText(winner.name, centerX, centerY);


        } else {

            ctx.fillStyle = "rgb(47,4,30)";   // inside color
            ctx.font = "bold 100px Arial";     // bold + big font
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.strokeStyle = "#fffefe";      // outline color (black)
            ctx.lineWidth = 4;                // outline thickness
            ctx.strokeText("..", centerX, centerY);
            ctx.fillText("..", centerX, centerY);
            // ctx.fillText("..", centerX, centerY);
        }
        // After drawing the wheel
        // ctx.fillStyle = "#222"; // same as background
        // ctx.fillRect(0, centerY+40, width, height / 2);

    }, [winner]);

    // initial draw
    useEffect(() => {
        drawWheel();
    }, [drawWheel]);
    const prevSpin = usePrevious(spinState); // track previous value

    // spin effect
    useEffect(() => {
        // if (!spinState) return;
        if (!pointer.current) {
            const img = new Image();
            img.src = PointerImg;
            img.onload = () => {
                pointer.current = img;
                drawWheel(); // 👈 draw immediately once pointer is ready
            };
        } else {
            drawWheel(); // if pointer already cached
        }
        if (!spinState || prevSpin === spinState) return;
        const spinDuration = 3000;
        const start = performance.now();

        const colors = colorsRef.current;
        const sliceAngle = (2 * Math.PI) / colors.length;

        // === Step 1: pick random winner at start ===
        const winnerIndex = Math.floor(Math.random() * colors.length);
        const sliceMiddle = winnerIndex * sliceAngle + sliceAngle / 2;

        // === Step 2: compute final target offset ===
        const targetOffset = -(sliceMiddle + Math.PI / 2);

        // === Step 3: also add extra spins for realism ===
        const extraSpins = 4 * 2 * Math.PI; // 4 full spins
        const startOffset = offsetRef.current;

        function animate(now: number) {
            const elapsed = now - start;
            const t = Math.min(elapsed / spinDuration, 1);

            // ease-out
            const easeOut = 1 - Math.pow(1 - t, 3);

            // === Step 4: interpolate between start and target with extra spins ===
            offsetRef.current =
                startOffset + extraSpins * (1 - easeOut) + (targetOffset - startOffset) * easeOut;

            drawWheel();

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                offsetRef.current = targetOffset; // lock in
                drawWheel();
                OnSetWinner(colors[winnerIndex]); // ✅ stop clean in middle
            }
        }

        requestAnimationFrame(animate);
    }, [spinState, drawWheel, prevSpin, OnSetWinner]);

    return <canvas ref={canvasRef} width={800} height={800}/>;
};
