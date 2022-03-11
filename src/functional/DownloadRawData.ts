export const downloadRawData = (url: string) => {
    console.time("downloadRawData");

    const download = require("download");

    const destinationFolder = "rawData";
    download(url, destinationFolder);

    console.timeEnd("downloadRawData");
};