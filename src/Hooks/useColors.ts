import type {ColorBlock, ControlButton} from "../Utils/types.ts";
import {useEffect, useRef} from "react";

export const initialColors: ColorBlock[] = [
    { id: 1, name: "1", hex: "rgb(90,32,67)",multiplier:2.98},
    { id: 2, name: "2", hex: "gradient-orange",multiplier:2.95},
    { id: 3, name: "3", hex: "rgb(90,32,67)",multiplier:2.9},
    { id: 4, name: "4", hex: "gradient-orange",multiplier:2.8},
    { id: 5, name: "5", hex: "rgb(90,32,67)",multiplier:2.8},
    { id: 6, name: "6", hex: "gradient-orange",multiplier:2.7},
    { id: 7, name: "7", hex: "rgb(90,32,67)",multiplier:2.6},
    { id: 8, name: "8", hex: "gradient-orange",multiplier:2.5},
    { id: 9, name: "9", hex: "rgb(90,32,67)",multiplier:2.3},
    { id: 10, name: "10", hex: "gradient-orange",multiplier:2.2},
    { id: 11, name: "11", hex: "rgb(90,32,67)",multiplier:2.1},
    { id: 12, name: "12", hex: "gradient-orange",multiplier:1.9},
    { id: 13, name: "13", hex: "rgb(90,32,67)",multiplier:1.8},
    { id: 14, name: "14", hex: "gradient-orange",multiplier:1.7},
    { id: 15, name: "15", hex: "rgb(90,32,67)",multiplier:1.6},
    { id: 16, name: "16", hex: "gradient-orange",multiplier:1.5},
    { id: 17, name: "17", hex: "rgb(90,32,67)",multiplier:1.4},
    { id: 18, name: "18", hex: "gradient-orange",multiplier:1.3},
    { id: 19, name: "19", hex: "rgb(90,32,67)",multiplier:1.2},
    { id: 20, name: "20", hex: "gradient-orange",multiplier:1.1},
];

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined); // ✅ provide initial value
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export const controls: ControlButton[] = [
    { label: "High (11-20)", type: "range", value: "high" },
    { label: "Low (1-10)", type: "range", value: "low" },
];