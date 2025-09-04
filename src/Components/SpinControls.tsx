import {type Dispatch, type FC, type SetStateAction} from "react";
import {controls} from "../Hooks/useColors.ts";
import type {ActiveState, ControlButton} from "../Utils/types.ts";
// import betChip from "../assets/img/scene/bet-amount.png"
// import betChipSelected from "../assets/img/scene/bet-amount-selected.png"


interface SpinControlsProps {
    handleSpin: () => void;
    spinState: boolean;
    betAmount: number;
    OnSetBetAmount: Dispatch<SetStateAction<number>>;
    OnSetActive: Dispatch<SetStateAction<ActiveState>>;
    active: ActiveState;
}

export const SpinControls: FC<SpinControlsProps> = ({
                                                        handleSpin,
                                                        spinState,
                                                        betAmount,
                                                        OnSetBetAmount,
                                                        OnSetActive,
                                                        active
                                                    }) => {
    const handleControlClick = (btn: ControlButton) => {
        OnSetActive((prev) => {
            if (btn.type === "range") {
                return {...prev, range: btn.value as string};
            }
            return prev;
        });
    };

    return (
        <div>

        <div className="Spin-main-controls">
            <div className="Bet-amount-area-spin">
                <div className="bet-Amount-text">
                    <div>
                        Bet Amount
                    </div>
                    <div>
                        {betAmount}
                    </div>
                    {/*<div>*/}
                    {/*    Amount Won*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    {amountWon}*/}
                    {/*</div>*/}
                </div>

                <div className="Bet-spin-area">
                    <div className="spin-short-bet">
                        {[20, 50, 100, 150, 250, 500].map((amount) => (
                            <div
                                className={`bet-short-spin ${betAmount === amount ? "active-bet":""}`}
                                key={amount}
                                onClick={() => OnSetBetAmount(amount)}
                            >
                                {/*{betAmount === amount ? (*/}
                                {/*    <img src={betChipSelected} alt="chip" className="chip-image"/>*/}
                                {/*) : (*/}
                                {/*    <img src={betChip} alt="chip" className="chip-image"/>*/}
                                {/*)}*/}
                                {amount}
                            </div>
                        ))}
                    </div>

                </div>
                <div>
                </div>
            </div>

            <div className="controls-container">
                <div className="controls-row">
                    {controls
                        .filter(btn => btn.type === "range")
                        .map((btn, i) => {
                            const isActive = active.range === btn.value;
                            return (
                                <div
                                    key={i}
                                    onClick={() => handleControlClick(btn)}
                                    className={`High-low-btn ${isActive ? "active" : "bg-gray-300"
                                    }`}
                                >
                                    {btn.label}
                                </div>
                            );
                        })}
                </div>
            </div>

            <div
                className={`control-spin-btn ${spinState ? "active-spin" : "Spin"}`}
                onClick={() => {
                    if (!active.range) {
                        return;
                    }
                    handleSpin();
                }}
            >
                {spinState ? "..." : "Spin"}
            </div>

        </div>
        </div>
    );
}