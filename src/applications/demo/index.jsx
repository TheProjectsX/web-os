import ApplicationWrapper from "@/components/ApplicationWrapper";

export const demo_metadata = {
    logo: "/application_logo/genshin_impact_pc_application_logo.png",
    name: "Demo",
    description: "This is a Demo Application, nothing to see!",
    type: "application",
    code: "demo_application",
    key: "original",
    resize: true,
    draggable: true,
};

const demo_application = ({ idx }) => {
    return (
        <ApplicationWrapper metadata={demo_metadata} idx={idx}>
            <div className="p-2 text-white">
                This is a Demo Application, nothing to see!
            </div>
        </ApplicationWrapper>
    );
};

export default demo_application;
