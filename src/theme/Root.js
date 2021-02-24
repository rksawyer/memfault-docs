import React from "react";

import { EmbedModeProvider } from "../components/EmbedMode";

export default function Root({ children }) {
    return <EmbedModeProvider>{children}</EmbedModeProvider>;
}
