import WalletConnect from '../WalletConnect';

export default function WalletConnectExample() {
  return (
    <div className="p-4">
      <WalletConnect onConnect={(address, network) => console.log('Connected:', address, network)} />
    </div>
  );
}
