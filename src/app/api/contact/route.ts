import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, email, subject, message, to, type } = body;

        // Email gönderme simülasyonu
        // Gerçek uygulamada burada nodemailer veya başka bir email servisi kullanılır
        console.log('📧 İletişim Formu Gönderildi:');
        console.log('Gönderen:', name);
        console.log('Telefon:', phone);
        console.log('E-posta:', email);
        console.log('Konu:', subject);
        console.log('Mesaj:', message);
        console.log('Alıcı:', to);
        console.log('Tip:', type);

        // Simüle edilmiş başarılı yanıt
        // Gerçek uygulamada email gönderme işlemi burada yapılır

        return NextResponse.json({
            success: true,
            message: 'Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.'
        }, { status: 200 });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({
            success: false,
            message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
        }, { status: 500 });
    }
}
