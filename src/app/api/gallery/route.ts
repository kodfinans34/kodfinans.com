import { NextRequest, NextResponse } from "next/server";
import { readdir, stat, unlink } from "fs/promises";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

export async function GET() {
    try {
        const uploadDir = join(process.cwd(), "public", "uploads");

        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        const files = await readdir(uploadDir);

        // Return files sorted by modified time (newest first)
        const fileStats = await Promise.all(
            files.map(async (fileName) => {
                const stats = await stat(join(uploadDir, fileName));
                return {
                    name: fileName,
                    url: `/uploads/${fileName}`,
                    fullPath: fileName, // To uniquely identify
                    mtimeMs: stats.mtimeMs // For sorting
                };
            })
        );

        // Sort descending
        fileStats.sort((a, b) => b.mtimeMs - a.mtimeMs);

        return NextResponse.json(fileStats);
    } catch (error) {
        console.error("Gallery API error:", error);
        return NextResponse.json({ error: "Galeri yüklenirken sunucu hatası oluştu." }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const fileName = url.searchParams.get("file");

        if (!fileName) {
            return NextResponse.json({ error: "Dosya adı belirtilmedi." }, { status: 400 });
        }

        const uploadDir = join(process.cwd(), "public", "uploads");
        const filePath = join(uploadDir, fileName);

        if (!existsSync(filePath)) {
            return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 404 });
        }

        await unlink(filePath);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete API error:", error);
        return NextResponse.json({ error: "Dosya silinirken sunucu hatası oluştu." }, { status: 500 });
    }
}
