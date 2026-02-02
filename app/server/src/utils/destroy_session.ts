export const destroySessionAsync = async (session: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    session.destroy((err: Error | null) => {
      if (err) {
        return reject(err);
      }
      
      resolve();
    });
  });
};
