import { defaultConfig } from "@/config/default";
import ApplicationWrapper from "@/components/ApplicationWrapper";

export default function Home() {
    return (
        <div className="w-full h-full relative">
            {defaultConfig.application.list.map((item, idx) => (
                <ApplicationWrapper
                    application={<item.application />}
                    metadata={item.metadata}
                    idx={idx}
                    key={idx}
                />
            ))}
        </div>
    );
}
