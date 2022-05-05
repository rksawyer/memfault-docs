import React from "react";

import Admonition from "@theme/Admonition";

export default function ReadMoreAdmonition({ children, ...props }) {
    return (
        <Admonition type="tip" icon="📖" title="Read More" {...props}>
            {children}
        </Admonition>
    );
}
