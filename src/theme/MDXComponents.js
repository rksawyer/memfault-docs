import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import ImageFigure from "@theme/ImageFigure";

export default {
    // Re-use the default mapping
    ...MDXComponents,
    // add our custom components to scope
    ImageFigure,
};
