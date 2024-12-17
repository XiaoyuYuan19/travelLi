// Base64 编码/解码工具
export function encodeData(data: unknown): string {
  const jsonString = JSON.stringify(data);
  // 使用 encodeURIComponent 处理 Unicode 字符
  const encoded = encodeURIComponent(jsonString);
  return btoa(encoded);
}

export function decodeData<T>(encoded: string): T | null {
  try {
    const decoded = atob(encoded);
    // 解码 URL 编码的字符串
    const jsonString = decodeURIComponent(decoded);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to decode data:', error);
    return null;
  }
}