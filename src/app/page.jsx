import demo_application, { demo_metadata } from "@/applications/demo";
import ApplicationWrapper from "@/components/ApplicationWrapper";

export default function Home() {
    // const applications = [
    //     {
    //         application: demo_application,
    //         metadata: demo_metadata,
    //         icon_position
    //     }
    // ]

    return (
        <div className="w-full h-full relative">
            <ApplicationWrapper
                application={<demo_application />}
                metadata={demo_metadata}
                position={{ xp: 0, yp: 0 }}
            />
        </div>
    );
}
