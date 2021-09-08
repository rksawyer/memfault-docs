import React from "react";
import Tabs from "@theme/Tabs";

export default function LinuxOtaOptionsTabs({ children }) {
    return (
        <Tabs
            groupId="Linux_OTA_option"
            values={[
                { label: "SWUpdate", value: "swupdate" },
                { label: "Custom", value: "custom" },
            ]}
            defaultValue="swupdate"
        >
            {children}
        </Tabs>
    );
}
