import { saveAs } from 'file-saver';
import QRCode from 'qrcode';

interface QRData {
  id: string;
  name: string;
  quantity?: number;
  location?: string;
  type?: string;
  serialNumber?: string;
  image?: string;
}

export const generateQRData = (item: QRData): string => {
  const data = {
    ...item,
    timestamp: new Date().toISOString(),
    checksum: calculateChecksum(item)
  };
  return JSON.stringify(data);
};

export const parseQRData = (qrData: string): QRData & { scannedAt: Date } => {
  try {
    const data = JSON.parse(qrData);
    const { checksum, ...itemData } = data;
    
    // Verify checksum
    if (checksum !== calculateChecksum(itemData)) {
      throw new Error('Invalid QR code checksum');
    }

    return {
      ...itemData,
      scannedAt: new Date()
    };
  } catch (error) {
    console.error('QR parse error:', error);
    throw new Error('رمز QR غير صالح');
  }
};

export const generateQRCode = async (data: QRData, size = 300): Promise<string> => {
  try {
    const qrData = generateQRData(data);
    const qrImage = await QRCode.toDataURL(qrData, {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });
    return qrImage;
  } catch (error) {
    console.error('QR generation error:', error);
    throw new Error('فشل في إنشاء رمز QR');
  }
};

export const downloadQRCode = async (data: QRData, filename: string) => {
  try {
    const qrImage = await generateQRCode(data);
    const blob = await (await fetch(qrImage)).blob();
    saveAs(blob, `${filename}.png`);
  } catch (error) {
    console.error('QR download error:', error);
    throw new Error('فشل في تحميل رمز QR');
  }
};

// Helper function to calculate checksum
function calculateChecksum(data: any): string {
  const str = JSON.stringify(data);
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return hash.toString(16);
}