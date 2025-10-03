import DrawnNumbersGrid from '../DrawnNumbersGrid';

export default function DrawnNumbersGridExample() {
  const sampleDrawn = [12, 45, 23, 67, 8, 34, 56, 2, 78, 19, 41, 63];

  return (
    <div className="p-4">
      <DrawnNumbersGrid drawnNumbers={sampleDrawn} />
    </div>
  );
}
