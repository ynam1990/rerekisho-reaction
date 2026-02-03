import { cleanupUsers } from './cleanup_users.js';

export const runDailyBatches = async () => {
  console.log('Daily batches started.');

  await cleanupUsers();
  
  console.log('Daily batches completed.');
};
