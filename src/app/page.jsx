import demo_application, { demo_metadata } from "@/applications/demo";
import ApplicationWrapper from "@/components/ApplicationWrapper";

export default function Home() {
    return (
        <div className="w-full h-full relative">
            <ApplicationWrapper
                application={<demo_application />}
                metadata={demo_metadata}
                idx={0}
            />
        </div>
    );
}
