import React from "react";

export function EnableServerSideDeveloperMode() {
    return (
        <>
            Server-side rate limiting will apply to the device you're using to
            work on the integration process. Once you can see the device on the
            Memfault Web App, consider enabling{" "}
            <a href="/docs/platform/rate-limiting#server-side-developer-mode">
                Server-Side Developer Mode
            </a>{" "}
            for it on the Memfault Web App to temporarily bypass these limits.
        </>
    );
}
