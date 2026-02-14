export function getTimeGreeting(time: Date = new Date()): string {
  const hour = time.getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour <= 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

export function formatLocalDate(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatTimeByLocale(time: string): string {
  if (!time) return '';

  const normalized = time.split('.')[0];
  const date = new Date(`1970-01-01T${normalized}`);

  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}