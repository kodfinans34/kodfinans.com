import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Lütfen bir dosya seçin." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize file name
        const timestamp = new Date().getTime();
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const finalName = `${timestamp}_${safeName}`;

        // Ensure public/uploads exists
        const uploadDir = join(process.cwd(), "public", "uploads");
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = join(uploadDir, finalName);
        await writeFile(filePath, buffer);

        const url = `/uploads/${finalName}`;

        return NextResponse.json({ url, name: finalName, success: true });
    } catch (error) {
        console.error("Upload process error:", error);
        return NextResponse.json({ error: "Dosya yüklenirken sunucu hatası oluştu." }, { status: 500 });
    }
}
