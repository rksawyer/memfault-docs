import React, { useMemo } from "react";

const DEFAULTS = { enabled: false, settings: {} };

const EmbedModeContext = React.createContext(DEFAULTS);

/** Support for embedding the docs in an iframe from our application */
export function EmbedModeProvider({ children }) {
    const value = useMemo(() => {
        if (typeof window === "undefined") return DEFAULTS;

        const params = new URL(document.location).searchParams;
        return { enabled: params.get("embed") != null, settings: {} };
    }, []);
    return (
        <EmbedModeContext.Provider value={value}>
            {value.enabled ? (
                <div className="embed-mode">{children}</div>
            ) : (
                children
            )}
        </EmbedModeContext.Provider>
    );
}
