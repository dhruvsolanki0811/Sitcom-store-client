export function formatTimestamp(timestamp:string) {
    const date = new Date(timestamp);
  
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  
    return formattedDate;
  }
  