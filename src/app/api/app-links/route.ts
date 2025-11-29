import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'app-links.json');

interface AppLink {
  id: string;
  name: string;
  appStoreUrl: string;
  playStoreUrl: string;
  active: boolean;
  createdAt: string;
}

// GET - Tüm app linklerini getir
export async function GET(request: NextRequest) {
  try {
    if (!existsSync(dataFilePath)) {
      return NextResponse.json([], { status: 200 });
    }

    const fileContent = await readFile(dataFilePath, 'utf-8');
    const appLinks: AppLink[] = JSON.parse(fileContent);

    return NextResponse.json(appLinks, { status: 200 });
  } catch (error) {
    console.error('Error reading app links:', error);
    return NextResponse.json(
      { error: 'Veriler okunamadı' },
      { status: 500 }
    );
  }
}

// POST - Yeni app link ekle veya güncelle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, appStoreUrl, playStoreUrl, active = true } = body;

    if (!id || !name || !appStoreUrl || !playStoreUrl) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      );
    }

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(appStoreUrl) || !urlPattern.test(playStoreUrl)) {
      return NextResponse.json(
        { error: 'Geçerli URL giriniz' },
        { status: 400 }
      );
    }

    let appLinks: AppLink[] = [];

    if (existsSync(dataFilePath)) {
      const fileContent = await readFile(dataFilePath, 'utf-8');
      appLinks = JSON.parse(fileContent);
    }

    // Check if ID already exists
    const existingIndex = appLinks.findIndex(app => app.id === id);

    const appLink: AppLink = {
      id,
      name,
      appStoreUrl,
      playStoreUrl,
      active,
      createdAt: existingIndex >= 0 ? appLinks[existingIndex].createdAt : new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      // Update existing
      appLinks[existingIndex] = appLink;
    } else {
      // Add new
      appLinks.push(appLink);
    }

    await writeFile(dataFilePath, JSON.stringify(appLinks, null, 2), 'utf-8');

    return NextResponse.json(
      {
        success: true,
        message: existingIndex >= 0 ? 'Uygulama güncellendi' : 'Uygulama eklendi',
        data: appLink,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving app link:', error);
    return NextResponse.json(
      { error: 'Kaydetme hatası' },
      { status: 500 }
    );
  }
}

// DELETE - App link sil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID gerekli' },
        { status: 400 }
      );
    }

    if (!existsSync(dataFilePath)) {
      return NextResponse.json(
        { error: 'Veri bulunamadı' },
        { status: 404 }
      );
    }

    const fileContent = await readFile(dataFilePath, 'utf-8');
    let appLinks: AppLink[] = JSON.parse(fileContent);

    const filteredLinks = appLinks.filter(app => app.id !== id);

    if (filteredLinks.length === appLinks.length) {
      return NextResponse.json(
        { error: 'Uygulama bulunamadı' },
        { status: 404 }
      );
    }

    await writeFile(dataFilePath, JSON.stringify(filteredLinks, null, 2), 'utf-8');

    return NextResponse.json(
      { success: true, message: 'Uygulama silindi' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting app link:', error);
    return NextResponse.json(
      { error: 'Silme hatası' },
      { status: 500 }
    );
  }
}
