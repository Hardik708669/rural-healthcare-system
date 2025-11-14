import { useEffect } from 'react';
import { syncQueue } from './utils/offlineSync';

function App() {
  useEffect(() => {
    const onOnline = async () => {
      console.log('Back online — syncing queue');
      await syncQueue();
    };
    window.addEventListener('online', onOnline);
    // initial attempt
    if (navigator.onLine) syncQueue();
    return () => window.removeEventListener('online', onOnline);
  }, []);
  // ...
}
