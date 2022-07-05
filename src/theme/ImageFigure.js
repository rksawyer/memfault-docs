// @ts-check
import React, { useState, useMemo } from "react";
import { Image } from "react-datocms";
import cx from "classnames";

import css from "./ImageFigure.module.css";

export default function ImageFigure(props) {
    const { alt, title, className, src: data, style, children } = props;
    const [bgColor, setBgColor] = useState(
        typeof data === "string" ? "transparent" : "#B8D8DA"
    );
    const image = useMemo(() => {
        if (typeof data === "string")
            return (
                <img
                    src={data}
                    className={cx(css.image, className)}
                    {...{ alt, title, style }}
                />
            );
        const { src, srcSet, width, height } = data.src;
        return (
            <Image
                data={{
                    /*
                    NOTE: data properties that datocms Image looks for
                    https://github.com/datocms/react-datocms#progressiveresponsive-image

                    # HTML5 src/srcset/sizes attributes
                    srcSet
                    webpSrcSet
                    sizes
                    src

                    # size information (post-transformations)
                    width
                    height
                    aspectRatio

                    # SEO attributes
                    alt
                    title

                    # background color placeholder or...
                    bgColor

                    # blur-up placeholder, JPEG format, base64-encoded
                    base64
                    */
                    srcSet,
                    sizes: "(max-width: 960px) 100vw, 960px" /* SEE max-size of 960 in `docusaurus.config.js`! */,
                    src,
                    aspectRatio: width / height,
                    width,
                    height,
                    alt,
                    title,
                }}
                layout="responsive"
                fadeInDuration={200}
                usePlaceholder={false}
                className={cx(css.image, className)}
                style={style}
                onLoad={() => setBgColor("transparent")}
            />
        );
    }, [data]);

    return (
        <figure
            className={css.figure}
            style={{
                // @ts-ignore
                "--figure-bg-color": bgColor,
            }}
        >
            {image}
            {children ? (
                <figcaption className={css.caption}>{children}</figcaption>
            ) : null}
        </figure>
    );
}
