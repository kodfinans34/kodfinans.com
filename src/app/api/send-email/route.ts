import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { smtpSettings, to, subject, text, html } = body;

        if (!smtpSettings || !smtpSettings.smtpHost || !smtpSettings.smtpUser || !smtpSettings.smtpPass) {
            return NextResponse.json({ error: 'SMTP ayarları eksik.' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: smtpSettings.smtpHost,
            port: parseInt(smtpSettings.smtpPort) || 465,
            secure: smtpSettings.smtpPort === "465", // true for 465, false for other ports
            auth: {
                user: smtpSettings.smtpUser,
                pass: smtpSettings.smtpPass,
            },
        });

        const info = await transporter.sendMail({
            from: smtpSettings.smtpFrom || smtpSettings.smtpUser,
            to,
            subject: subject || 'KodFinans Sistem Test Mesajı',
            text: text || 'Bu bir sistem test e-postasıdır.',
            html: html || '<p>Bu bir <b>sistem test e-postasıdır</b>.</p>',
        });

        return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (error: any) {
        console.error('SMTP Hatası:', error);
        return NextResponse.json({ error: error.message || 'E-posta gönderilirken bir hata oluştu.' }, { status: 500 });
    }
}
