-- prisma_user_localにshadowDBの作成権限を付与（ローカルのみ）
GRANT CREATE, DROP ON *.* TO 'prisma_user_local'@'%';
FLUSH PRIVILEGES;
