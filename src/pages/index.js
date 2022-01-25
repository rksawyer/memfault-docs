/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const supportedTargets = [
    {
        col: 4,
        title: <>MCU Guides</>,
        description: (
            <>
                Memfault's{" "}
                <a href="https://github.com/memfault/memfault-firmware-sdk/">
                    open-source SDK
                </a>{" "}
                supports any MCU device irrespective of the RTOS in use or
                connectivity path in place. See{" "}
                <a href="docs/mcu/introduction">documentation for MCUs</a>.
            </>
        ),
    },
    {
        col: 4,
        title: <>Android Guides</>,
        description: (
            <>
                Memfault supports any AOSP device. Our{" "}
                <a href="https://github.com/memfault/bort">open-source SDK</a>{" "}
                is available for Android 8-12. See{" "}
                <a href="docs/android/introduction">
                    documentation for Android
                </a>
                .
            </>
        ),
    },
    {
        col: 4,
        title: <>Embedded Linux Guides</>,
        description: (
            <>
                Memfault support for Linux is a new addition, and it's currently
                limited to over-the-air updates (OTA) and release management.
                See{" "}
                <a href="docs/linux/introduction">documentation for Linux</a>.
            </>
        ),
    },
];

const externalContent = [
    {
        col: 6,
        title: <>Memfault Platform</>,
        description: (
            <>
                The{" "}
                <a href="docs/platform/projects-and-fleets">
                    Memfault Platform
                </a>{" "}
                is a web application where all the features you've integrated
                with in your project come to life.
            </>
        ),
    },
    {
        col: 6,
        title: <>Cloud API</>,
        description: (
            <>
                Memfault's open{" "}
                <a
                    href="https://api-docs.memfault.com"
                    target="_blank"
                    rel="noopener"
                >
                    Cloud API
                </a>{" "}
                can be used from embedded devices, continuous integration
                systems (CI/CD), or cloud applications.
            </>
        ),
    },
    {
        col: 6,
        title: <>Webinars</>,
        description: (
            <>
                Our{" "}
                <a href="https://memfault.com/webinars">on-demand webinars</a>{" "}
                contain plenty of conversations and advice on embedded
                development.
            </>
        ),
    },
    {
        col: 6,
        title: <>Interrupt Blog</>,
        description: (
            <>
                We are proud to be the founders of the{" "}
                <a href="https://interrupt.memfault.com">Interrupt Blog</a>, a
                great community for people who share a passion for hardware and
                embedded development.
            </>
        ),
    },
];

function FeatureRow({ features }) {
    return (
        <div className="row">
            {features.map((props, idx) => (
                <Feature key={idx} {...props} />
            ))}
        </div>
    );
}

function Feature({ imageUrl, title, description, col }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={classnames(`col col--${col}`, styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img src={imgUrl} alt={title} />
                </div>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <header
                className={classnames("hero hero--primary", styles.heroBanner)}
            >
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={classnames(
                                "button button--outline button--secondary button--lg hero__get-started-button",
                                styles.getStarted
                            )}
                            to={useBaseUrl("docs/mcu/introduction")}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                <section className={styles.features}>
                    <div className="container">
                        <FeatureRow features={supportedTargets} />
                        <FeatureRow features={externalContent} />
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default Home;
