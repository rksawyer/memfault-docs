import React from "react";

export function EnableServerSideDevelopmentMode() {
    return (
        <>
            Server-side rate limiting will apply to the device you're using to
            work on the integration process. Once you can see the device on the
            Memfault Web App, consider enabling{" "}
            <a href="/docs/platform/rate-limiting#server-side-development-mode">
                Server-Side Development Mode
            </a>{" "}
            for it on the Memfault Web App to temporarily bypass these limits.
        </>
    );
}
