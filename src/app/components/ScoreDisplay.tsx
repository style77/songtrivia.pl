type ScoreDisplayProps = {
    points: number;
    onRetry: () => void;
};

const ScoreDisplay = ({ points, onRetry }: ScoreDisplayProps) => {
    return (
      <div>
        <p className="text-4xl">Zdobyłeś {points} punktów!</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={onRetry}>
          Spróbuj ponownie
        </button>
      </div>
    );
  }

export default ScoreDisplay;