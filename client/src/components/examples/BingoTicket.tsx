import BingoTicket from '../BingoTicket';

export default function BingoTicketExample() {
  const sampleNumbers = [12, 5, 23, 45, 67, 3, 18, 29, 41, 53, 8, 21, 0, 39, 58, 15, 27, 34, 48, 62, 1, 19, 31, 44, 70];
  const markedNumbers = [12, 23, 29, 34];

  return (
    <div className="p-4 space-y-4 max-w-md">
      <BingoTicket 
        ticketId="abc123" 
        numbers={sampleNumbers} 
        markedNumbers={markedNumbers}
        network="base"
      />
      <BingoTicket 
        ticketId="def456" 
        numbers={sampleNumbers.map(n => (n + 5) % 75)} 
        network="monad"
        isWinner={true}
      />
    </div>
  );
}
