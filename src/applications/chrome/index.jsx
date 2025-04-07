import ApplicationWrapper from "@/components/ApplicationWrapper";
import HomeLogo from "./home_logo.svg";

export const chrome_metadata = {
    logo: "/application_logo/chrome_pc_application_logo.png",
    name: "Chrome",
    description: "This is a Demo Application, nothing to see!",
    type: "application",
    code: "chrome_application",
    key: "original",
    resize: true,
    draggable: true,
};

const chrome_application = ({ idx }) => {
    return (
        <ApplicationWrapper metadata={chrome_metadata} idx={idx}>
            <div className="h-full bg-[#3c3c3c] flex flex-col items-center gap-5 py-14">
                <div>
                    <img src={HomeLogo.src} alt="Chrome Home Logo" />
                </div>

                <div>
                    <iframe src="https://brave.com"></iframe>
                </div>
            </div>
        </ApplicationWrapper>
    );
};

export default chrome_application;
