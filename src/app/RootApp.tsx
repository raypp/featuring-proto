import { useState } from "react";
import { ServiceSelector } from "./ServiceSelector";
import StudioApp from "./App";
import FeaturingApp from "../featuring/App";

export default function RootApp() {
  const [selectedService, setSelectedService] = useState<"studio" | "response" | null>(null);

  if (selectedService === null) {
    return <ServiceSelector onSelectService={setSelectedService} />;
  }

  if (selectedService === "studio") {
    return <StudioApp />;
  }

  // 피처링 서비스 (B2B)
  return (
    <FeaturingApp
      onBackToServiceSelector={() => setSelectedService(null)}
    />
  );
}

