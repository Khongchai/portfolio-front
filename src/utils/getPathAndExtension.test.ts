import { getPathAndExtension } from "./getPathAndExtension";

describe("Test path and extension extractions", () => {
    const inputAndOutput: { input: string, output: [string, string] }[] = [
        {
            input: "https://khong.xyz/somepath/file.svg",
            output: ["https://khong.xyz/somepath/file", "svg"],
        },
        {
            input: "https://www.khong.xyz/logos/jest.png",
            output: ["https://www.khong.xyz/logos/jest", "png"],
        },
        {
            input: "somefolder1/somefolder2/somefile.png",
            output: ["somefolder1/somefolder2/somefile", "png"],
        },
        {
            input: "somefile.jpg",
            output: ["somefile", "jpg"],
        }
    ];

    for (const testCase of inputAndOutput) {
        test(`Test path and extension extractions for  + ${testCase.input}`, () => {
            expect(getPathAndExtension(testCase.input)).toStrictEqual(testCase.output);
        });
    }

});