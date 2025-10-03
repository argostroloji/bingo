import CountdownTimer from '../CountdownTimer';

export default function CountdownTimerExample() {
  const targetTime = new Date(Date.now() + 45 * 60 * 1000);
  
  return (
    <div className="flex items-center justify-center p-8">
      <CountdownTimer targetTime={targetTime} onComplete={() => console.log('Draw complete!')} />
    </div>
  );
}
