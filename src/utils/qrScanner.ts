import { Html5QrcodeScanner } from 'html5-qrcode';

export const initializeScanner = (
  elementId: string,
  onScan: (text: string) => void,
  onError: (error: string) => void
) => {
  const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1.0,
    showTorchButtonIfSupported: true,
    rememberLastUsedCamera: true,
    supportedScanTypes: [
      Html5QrcodeScanner.SCAN_TYPE_CAMERA,
      Html5QrcodeScanner.SCAN_TYPE_FILE
    ]
  };

  const scanner = new Html5QrcodeScanner(elementId, config, false);

  scanner.render(
    (decodedText) => {
      try {
        // Validate QR data format
        const data = JSON.parse(decodedText);
        if (!data.id || !data.type) {
          throw new Error('Invalid QR code format');
        }
        onScan(decodedText);
      } catch (error) {
        onError('رمز QR غير صالح');
      }
    },
    (error) => {
      console.warn(`QR Scan Error: ${error}`);
      onError('فشل في مسح رمز QR');
    }
  );

  return scanner;
};

export const stopScanner = async (scanner: Html5QrcodeScanner) => {
  try {
    await scanner.clear();
  } catch (error) {
    console.error('Error stopping scanner:', error);
  }
};