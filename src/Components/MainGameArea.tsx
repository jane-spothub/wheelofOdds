import {Canvas} from "./Canvas";
import {useEffect, useState} from "react";
import "../assets/maincss.css"
import {SpinControls} from "./SpinControls.tsx";
import type {ActiveState, ColorBlock} from "../Utils/types.ts";
import {ResultPopup} from "./ResultPopUp.tsx";

export const MainGameArea = () => {
    const [spinState, setSpinState] = useState<boolean>(false);
    const [winner, setWinner] = useState<ColorBlock | null>(null);
    const [betAmount, setBetAmount] = useState<number>(20)
    const [amountWon, setAmountWon] = useState<number>(0)
    const [active, setActive] = useState<ActiveState>({
        range: "high"
    });

    const handleSpin = () => {
        if (spinState) return;
        setSpinState(true);

    };

    useEffect(() => {
        if (!winner) return;
        let payout = 0;
        // Check active selection
        if (active.range === "high" && winner.id >= 11 && winner.id <= 20) {
            payout = betAmount * winner.multiplier;
        } else if (active.range === "low" && winner.id >= 1 && winner.id <= 10) {
            payout = betAmount * winner.multiplier;
        } else {
            payout = 0; // lost
        }

        setAmountWon(payout);
        console.log("winner:", winner.id, "active:", active.range, "payout:", payout);

        if (spinState) {
            setTimeout(() => {
                setSpinState(false);
            }, 2500);
        }
    }, [betAmount, spinState, winner, active]);

    return (
        <div className="Spin-main-container">
            <div className="spin-main-game-area">
                <div className="spin-game-area">
                    <Canvas
                        spinState={spinState}
                        OnSetWinner={setWinner}
                    />
                </div>
                <SpinControls
                    handleSpin={handleSpin}
                    spinState={spinState}
                    OnSetBetAmount={setBetAmount}
                    betAmount={betAmount}
                    OnSetActive={setActive}
                    active={active}
                />
                <ResultPopup
                    winner={winner ? winner.name : null}
                    amountWon={amountWon}
                    onClose={() => setWinner(null)}
                />
            </div>

        </div>
    );
};
