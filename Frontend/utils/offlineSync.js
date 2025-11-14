import localforage from 'localforage';
import { createEncounter } from '../services/api';

localforage.config({ name: 'rural-health' });

export async function queueEncounter(encounter) {
  const queue = (await localforage.getItem('encounterQueue')) || [];
  queue.push({ ...encounter, queuedAt: new Date().toISOString() });
  await localforage.setItem('encounterQueue', queue);
}

export async function syncQueue() {
  const queue = (await localforage.getItem('encounterQueue')) || [];
  const remaining = [];
  for (const item of queue) {
    try {
      await createEncounter(item);
    } catch (err) {
      console.error('Sync failed for item', item, err);
      remaining.push(item);
    }
  }
  await localforage.setItem('encounterQueue', remaining);
  return remaining.length === 0;
}

// call window.addEventListener('online', syncQueue) somewhere in App init
