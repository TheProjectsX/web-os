const ApplicationDesktopIcon = ({
    metadata,
    className,
    runOnDoubleClick = () => {},
}) => {
    const { logo, name, description } = metadata;
    return (
        <div
            title={`${name}\n${description}`}
            className={`flex flex-col items-center px-2 py-0.5 gap-1 text-white text-center w-[5rem] hover:bg-gray-300/20 rounded-sm ${className}`}
            onDoubleClick={runOnDoubleClick}
        >
            <img
                src={logo}
                alt={name}
                className="w-14 h-14 select-none pointer-events-none"
            />
            <p className="text-sm select-none pointer-events-none line-clamp-2 leading-4 text-center break-all">
                {name}
            </p>
        </div>
    );
};

export default ApplicationDesktopIcon;
