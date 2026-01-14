import { ArrowRightLeft } from "lucide-react";

interface ServiceSwitcherBarProps {
    currentService: "studio" | "response";
    onSwitchService: (service: "studio" | "response") => void;
}

export function ServiceSwitcherBar({ currentService, onSwitchService }: ServiceSwitcherBarProps) {
    const targetService = currentService === "studio" ? "response" : "studio";
    const targetServiceName = currentService === "studio" ? "피처링 서비스 (B2B)" : "피처링 스튜디오 (B2C)";
    const currentServiceName = currentService === "studio" ? "피처링 스튜디오" : "피처링 서비스";

    return (
        <div className="h-12 bg-gray-900 border-t border-gray-800 flex items-center justify-between px-6 shrink-0 z-50">
            <div className="flex items-center gap-3">
                <span className="text-gray-400 text-xs font-medium">현재 서비스</span>
                <div className={`px-2 py-0.5 rounded text-xs font-bold ${currentService === "studio"
                        ? "bg-[var(--ft-color-primary-500)] text-white"
                        : "bg-[var(--ft-color-orange-500)] text-white"
                    }`}>
                    {currentServiceName}
                </div>
            </div>

            <button
                onClick={() => onSwitchService(targetService)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors group"
            >
                <span className="text-gray-300 text-xs group-hover:text-white transition-colors">
                    {targetServiceName}로 이동
                </span>
                <ArrowRightLeft className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
        </div>
    );
}
