export type ColorBlock ={
    id: number;
    name: string;
    hex: string;
    multiplier:number
}
export type ControlButton = {
    label: string;
    type: "range" | "parity" ;
    value: string | number;
};


export type ActiveState ={
    range?: string;
}