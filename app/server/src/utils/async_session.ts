// セッションを保存するためのsession.save()がコールバックを使うため、asyncとして使えるようラップします
export const saveSessionAsync = async (session: Express.Request['session']): Promise<void> => {
  return new Promise((resolve, reject) => {
    session.save((err: Error | null) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

// セッションを破棄するためのsession.destroy()がコールバックを使うため、asyncとして使えるようラップします
export const destroySessionAsync = async (session: Express.Request['session']): Promise<void> => {
  return new Promise((resolve, reject) => {
    session.destroy((err: Error | null) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};
