import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, reason, app } = body;

    if (!username || !email) {
      return NextResponse.json(
        { error: 'Kullanıcı adı ve e-posta gereklidir.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'deletion-requests.json');

    let requests = [];

    // Read existing requests if file exists
    if (existsSync(filePath)) {
      const fileContent = await readFile(filePath, 'utf-8');
      requests = JSON.parse(fileContent);
    }

    // Add new request
    const newRequest = {
      id: Date.now(),
      app: app || 'Belirtilmedi',
      username,
      email,
      reason: reason || 'Belirtilmedi',
      requestDate: new Date().toISOString(),
      status: 'pending'
    };

    requests.push(newRequest);

    // Save to file
    await writeFile(filePath, JSON.stringify(requests, null, 2), 'utf-8');

    return NextResponse.json(
      {
        success: true,
        message: 'Hesap silme talebiniz alındı. 30 gün içinde işleme alınacaktır.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing deletion request:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
