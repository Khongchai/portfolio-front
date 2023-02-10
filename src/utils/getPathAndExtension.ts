export function getPathAndExtension(url: string): [string, string] {
    const sections = url.split(".");
    if (sections.length < 2) {
        throw new Error("Invaid url");
    }

    const extension = sections.pop()!;
    const path = sections.join(".");
    return [path, extension];
}