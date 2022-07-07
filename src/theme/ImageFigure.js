// @ts-check
import React, { useState, useMemo } from "react";
import { Image } from "react-datocms";
import cx from "classnames";

import css from "./ImageFigure.module.css";

export default function ImageFigure(props) {
    const {
        alt,
        title,
        className,
        src: data,
        style,
        children,
        pixelRatio = 1,
    } = props;
    const [bgColor, setBgColor] = useState(
        typeof data === "string" ? "transparent" : "#B8D8DA"
    );
    const image = useMemo(() => {
        /*
            NOTE
            this check handles cases where src has received a static URL string,
            such as for an image which is under the `/static/` directory, or
            such as will result from importing `gif` or `svg` source files in the MDX
            (only png and jpeg imports actually create a data object)
        */
        if (typeof data === "string")
            return (
                <a href={data} target="_blank" className={css.link}>
                    <img
                        src={data}
                        className={cx(css.image, className)}
                        {...{ alt, title, style }}
                    />
                </a>
            );
        /*
            NOTE
            if the previous check failed, we can assume we've got src data for a PNG or JPEG image
        */
        const { src, srcSet, images } = data.src;
        const { width, height, path } = images.sort(
            (a, b) => a.width - b.width
        )[images.length - 1];
        return (
            <a href={path} target="_blank" className={css.link}>
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
                        sizes: `(max-width: ${Math.min(
                            960,
                            width
                        )}px) 100vw, ${Math.min(
                            960,
                            width
                        )}px` /* SEE max-size of 960 in `docusaurus.config.js`! */,
                        src,
                        aspectRatio: width / height,
                        width: width / pixelRatio,
                        height: height / pixelRatio,
                        alt,
                        title,
                    }}
                    fadeInDuration={200}
                    usePlaceholder={false}
                    className={cx(css.image, className)}
                    style={style}
                    onLoad={() => setBgColor("transparent")}
                />
            </a>
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
