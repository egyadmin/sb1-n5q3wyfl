export const generateBarcode = (text: string): string => {
  // Simple Code 128 barcode implementation
  const START_BASE = 104;
  const STOP = 106;
  
  // Convert text to ASCII values
  const values = text.split('').map(char => char.charCodeAt(0));
  
  // Calculate checksum
  let checksum = START_BASE;
  values.forEach((value, index) => {
    checksum += value * (index + 1);
  });
  checksum = checksum % 103;
  
  // Generate barcode data
  const barcodeData = [START_BASE, ...values, checksum, STOP];
  
  return barcodeData.map(value => value.toString(2).padStart(8, '0')).join('');
};

export const generateQRCode = (data: string): string => {
  // Simplified QR code generation (in real implementation, use a proper QR code library)
  const encoded = btoa(data);
  return encoded;
};