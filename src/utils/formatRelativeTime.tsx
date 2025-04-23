import { formatDistanceToNow } from 'date-fns';
  // Format the createdAt timestamp to a relative time
  // This will return "5 minutes ago", "2 hours ago", etc.
  // Or fall back to sometime ago
export const formatRelativeTime = (timestamp: string | Date) => {
    try {
      const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'some time ago'; // Fallback if date parsing fails
    }
  };