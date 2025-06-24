export function parseUserAgent(userAgent: string) {
  const isMobile = /Mobile|Android/i.test(userAgent);
  const isTablet = /Tablet|iPad/i.test(userAgent);
  const isWindows = /Windows NT/i.test(userAgent);
  const isMac = /Macintosh|Mac OS X/i.test(userAgent);
  const isLinux = /Linux/i.test(userAgent) && !/Android/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  let deviceType = 'Desktop';
  if (isMobile) deviceType = 'Mobile';
  else if (isTablet) deviceType = 'Tablet';

  let os = 'Unknown';
  if (isWindows) os = 'Windows';
  else if (isMac) os = 'macOS';
  else if (isLinux) os = 'Linux';
  else if (isAndroid) os = 'Android';
  else if (isIOS) os = 'iOS';

  let browser = 'Unknown';
  if (/Chrome/i.test(userAgent) && !/Edg|OPR/.test(userAgent))
    browser = 'Chrome';
  else if (/Firefox/i.test(userAgent)) browser = 'Firefox';
  else if (/Safari/i.test(userAgent) && !/Chrome|OPR/.test(userAgent))
    browser = 'Safari';
  else if (/Edg/i.test(userAgent)) browser = 'Edge';
  else if (/OPR/i.test(userAgent)) browser = 'Opera';

  return { deviceType, os, browser };
}
