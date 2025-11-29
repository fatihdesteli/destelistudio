import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const KV_KEY = 'app-links';
const dataDir = path.join(process.cwd(), 'data');
const dataFilePath = path.join(dataDir, 'app-links.json');

interface AppLink {
  id: string;
  name: string;
  appStoreUrl: string;
  playStoreUrl: string;
  active: boolean;
  createdAt: string;
}

// Check if KV is available
async function isKVAvailable(): Promise<boolean> {
  try {
    await kv.ping();
    return true;
  } catch {
    return false;
  }
}

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
}

// Get app links from KV or JSON fallback
async function getAppLinks(): Promise<AppLink[]> {
  const kvAvailable = await isKVAvailable();

  if (kvAvailable) {
    try {
      const data = await kv.get<AppLink[]>(KV_KEY);
      return data || [];
    } catch (error) {
      console.error('KV get error:', error);
      // Fallback to JSON
    }
  }

  // Fallback: Read from JSON file
  if (existsSync(dataFilePath)) {
    const fileContent = await readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  }

  return [];
}

// Save app links to KV or JSON fallback
async function saveAppLinks(appLinks: AppLink[]): Promise<void> {
  const kvAvailable = await isKVAvailable();

  if (kvAvailable) {
    try {
      await kv.set(KV_KEY, appLinks);
      return;
    } catch (error) {
      console.error('KV set error:', error);
      // Fallback to JSON
    }
  }

  // Fallback: Write to JSON file
  await ensureDataDir();
  await writeFile(dataFilePath, JSON.stringify(appLinks, null, 2), 'utf-8');
}

// GET - Tüm app linklerini getir
export async function GET(request: NextRequest) {
  try {
    const appLinks = await getAppLinks();
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

    const appLinks = await getAppLinks();

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

    await saveAppLinks(appLinks);

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
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    return NextResponse.json(
      { error: `Kaydetme hatası: ${errorMessage}` },
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

    const appLinks = await getAppLinks();
    const filteredLinks = appLinks.filter(app => app.id !== id);

    if (filteredLinks.length === appLinks.length) {
      return NextResponse.json(
        { error: 'Uygulama bulunamadı' },
        { status: 404 }
      );
    }

    await saveAppLinks(filteredLinks);

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
