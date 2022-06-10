import React from "react";

import iconLight from "./icon-normalized-charts-light-64x64.gif";
import iconDark from "./icon-normalized-charts-dark-64x64.gif";

import { useColorMode } from "@docusaurus/theme-common";

export default function NormalizedCharts() {
    const { isDarkTheme } = useColorMode();
    const icon = isDarkTheme ? iconDark : iconLight;
    return (
        <img
            src={icon}
            style={{ width: "1em", height: "1em" }}
            alt="Icon to Toggle Chart Normalization "
        />
    );
}
