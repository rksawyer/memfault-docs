import React, { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";

export function ZephyrManifest() {
    const FALLBACK_LATEST_TAG = "0.43.3";
    const [latestTag, setLatestTag] = useState(FALLBACK_LATEST_TAG);

    useEffect(() => {
        const fetchLatestTag = async () => {
            try {
                const response = await fetch(
                    "https://api.github.com/repos/memfault/memfault-firmware-sdk/releases/latest",
                );
                const data = await response.json();
                const tag = data.tag_name;
                setLatestTag(tag);
            } catch (error) {
                setLatestTag(
                    `${FALLBACK_LATEST_TAG} # Or look up the latest tag`,
                );
            }
        };

        fetchLatestTag();
    }, []);

    const codeSnippet = `
    manifest:
      remotes:
        # Add the Memfault GitHub repo
        - name: memfault
          url-base: https://github.com/memfault

      projects:
        # The Memfault SDK
        - name: memfault-firmware-sdk
          path: modules/lib/memfault-firmware-sdk
          revision: ${latestTag}
          remote: memfault
    `;

    // from https://docusaurus.io/docs/next/markdown-features/code-blocks#usage-in-jsx
    return (
        <CodeBlock language="yaml" title="west.yml">
            {codeSnippet}
        </CodeBlock>
    );
}
