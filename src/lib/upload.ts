export const uploadFile = async (file: File, _path: string): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Local file upload failed.");
    }

    const data = await response.json();
    if (!data.success) {
        throw new Error(data.error || "File upload failed");
    }

    return data.url;
};
