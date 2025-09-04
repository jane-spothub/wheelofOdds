
interface ResultPopupProps {
    winner: string | null;
    amountWon: number;
    onClose: () => void;
}

export const ResultPopup: React.FC<ResultPopupProps> = ({ winner, amountWon, onClose }) => {
    if (!winner) return null;

    const isWin = amountWon > 0;

    return (
        <div className="popup-overlay">
            <div className={`popup-container ${isWin ? "popup-win" : "popup-lose"}`}>
                <h2
                className={`title ${isWin ? "you-win":"you-lose"}`}
                >{isWin ? "You Won!!" : "You Lose!!"}</h2>
                {/*<div className="result-cont">*/}
                {/*    <div className="result-amount">*/}
                {/*        Result: <strong>{winner}</strong>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="result-message">
                    {isWin ? `${amountWon}` : "Better luck next time."}
                </div>
                <button className="popup-btn" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
};
