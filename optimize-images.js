const filesize = require("filesize");
const fs = require("fs");
const glob = require("glob");
const sharp = require("sharp");
const pt = require("path");

function withSize(path) {
    const size = fs.statSync(path).size;
    return { path, size };
}

function addSizes(itemsWithSize) {
    return itemsWithSize.reduce((sum, item) => {
        return sum + item.size;
    }, 0);
}

const MAX_WIDTH_PIXELS = 1280;

const successfulPaths = [];
const erroredPaths = {};

function formatSize(size) {
    return filesize(size, { pad: true }).padStart(12);
}

const MIN_SUFFIX = "-min";

function formatMinPath(path) {
    const parsed = pt.parse(path);
    const min = `${parsed.dir}/${parsed.name}${MIN_SUFFIX}${parsed.ext}`;
    return min;
}

function isMinifiedCopy(path) {
    return !path.includes(MIN_SUFFIX);
}

function minifiedCopyNotExists(path) {
    return !fs.existsSync(formatMinPath(path));
}

function optimize(path) {
    return sharp(path)
        .resize({
            width: MAX_WIDTH_PIXELS,
            fit: "inside",
            withoutEnlargement: true,
        })
        .jpeg({
            progressive: true,
            force: false,
        })
        .png({
            force: false,
            colors: 256,
            compressionLevel: 9,
        })
        .toBuffer();
}

async function run(path, reprocess) {
    try {
        const minPath = formatMinPath(path);
        if (!fs.existsSync(minPath) || reprocess) {
            console.log("[PROCESSING]", path);
            const buffer = await optimize(path);
            fs.writeFileSync(minPath, buffer);
        }
        successfulPaths.push(path);
    } catch (err) {
        console.log("[FAILED]", path, "\n", err);
        erroredPaths[path] = {
            message: err.message,
            fileName: err.fileName,
            lineNumber: err.lineNumber,
        };
    }
}

function printHelp() {
    console.log(`
  This tool produces minified copies with -min appended to their names
  before the extension. Make sure to go over usage locations and append
  -min to the URI.
  
  For example:
  
      pics/chip.png -> pics/chip-min.png
  
  If you're feeling adventurous:
  
      find ./docs -type f -exec sed -i -e 's/\.png/-min.png/g' {} \;
  
  USAGE:
      
      yarn optimize-images [OPTIONS]
  
  OPTIONS:
  
      --reprocess   Images for which a -min version already exists will
                    be skipped. To force reprocessing these images, pass
                    the --reprocess option.
      -h, --help    Show this help message and exit.
    `);
}

const help = process.argv.includes("--help") || process.argv.includes("-h");
if (help) {
    printHelp();
    process.exit(0);
}

glob("./static/**/*.{jpg,jpeg,png}", async function (error, allImages) {
    if (error) return error;
    const reprocess = process.argv.includes("--reprocess");
    const originalImages = allImages.filter(isMinifiedCopy);
    const images = reprocess
        ? originalImages
        : originalImages.filter(minifiedCopyNotExists);
    const sizesBefore = images.map(withSize);

    for (const path of images) {
        await run(path, reprocess);
    }

    const longestPathLength = Math.max(0, ...images.map((path) => path.length));
    const sizesAfter = images.map(formatMinPath).map(withSize);
    const sizeComparison = sizesBefore
        .map((item, index) => ({
            path: item.path.padEnd(longestPathLength),
            before: formatSize(item.size),
            after: formatSize(sizesAfter[index].size),
            saved: formatSize(item.size - sizesAfter[index].size),
            savedSize: item.size - sizesAfter[index].size,
        }))
        .sort((a, b) => b.savedSize - a.savedSize);

    if (sizeComparison.length) {
        console.table(sizeComparison.map(({ savedSize, ...rest }) => rest));
    } else {
        console.log(
            "No images needed to be optimized. To reprocess, pass the --reprocess option."
        );
    }

    const sizeBefore = addSizes(sizesBefore);
    const sizeAfter = addSizes(sizesAfter);
    const savedTotal = sizeBefore - sizeAfter;

    console.log(`Total size before: ${formatSize(sizeBefore)}`);
    console.log(`Total size after:  ${formatSize(sizeAfter)}`);
    console.log(`Space saved:       ${formatSize(savedTotal)}`);
});
