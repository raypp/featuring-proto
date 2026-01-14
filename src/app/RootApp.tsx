import { useState } from "react";
import { ServiceSelector } from "./ServiceSelector";
import StudioApp from "./App";
import FeaturingApp from "../featuring/App";
import { ConnectedAccount, DEMO_CONNECTED_ACCOUNT } from "../shared";

export default function RootApp() {
  const [selectedService, setSelectedService] = useState<"studio" | "response" | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<ConnectedAccount | null>(null);

  // Handle account connection from Studio
  const handleConnect = () => {
    setConnectedAccount(DEMO_CONNECTED_ACCOUNT);
  };

  // Handle logout - disconnect account
  const handleDisconnect = () => {
    setConnectedAccount(null);
  };

  if (selectedService === null) {
    return <ServiceSelector onSelectService={setSelectedService} />;
  }

  if (selectedService === "studio") {
    return (
      <StudioApp
        onSwitchService={setSelectedService}
        connectedAccount={connectedAccount}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
    );
  }

  // 피처링 서비스 (B2B)
  return (
    <FeaturingApp
      onBackToServiceSelector={() => setSelectedService(null)}
      onSwitchService={setSelectedService}
      connectedAccount={connectedAccount}
    />
  );
}
