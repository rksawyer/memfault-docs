import React from "react";

import ProjectAwareTabs from "@site/src/components/ProjectAwareTabs";

export const SYSTEM_YOCTO = "Yocto";
export const SYSTEM_OTHER = "Other";

export function LinuxBuildSystemOptionsTabs({ children }) {
    return (
        <ProjectAwareTabs
            groupId="Linux_build_system_option"
            defaultValueFn={(details) => {
                // See linuxOptions.ts in our app code.
                if (
                    details?.operatingSystem &&
                    !details.operatingSystem.includes("Yocto")
                )
                    return SYSTEM_OTHER;
                return SYSTEM_YOCTO;
            }}
            values={[
                { label: "Yocto", value: SYSTEM_YOCTO },
                { label: "Other", value: SYSTEM_OTHER },
            ]}
        >
            {children}
        </ProjectAwareTabs>
    );
}
