import { osConfig } from "@/config/os-config";

// Get the closest aspect Ratio based on the width and height
const getAspectRatio = (width, height) => {
    const ratio = width / height;
    const aspectRatios = osConfig.aspectRatios;

    return aspectRatios.reduce((prev, curr) =>
        Math.abs(curr.value - ratio) < Math.abs(prev.value - ratio)
            ? curr
            : prev
    );
};

// Get the best Width and Height based on the aspect ratio
const getARSize = (width, height) => {
    const { value: aspectRatio } = getAspectRatio(width, height);

    let newWidth = width;
    let newHeight = newWidth / aspectRatio;

    if (newHeight > height) {
        newHeight = height;
        newWidth = newHeight * aspectRatio;
    }

    return {
        width: parseInt(newWidth),
        height: parseInt(newHeight),
        aspectRatio,
    };
};

export { getAspectRatio, getARSize };
