import Database from 'better-sqlite3';

export function openDatabase(filename = process.env.DATABASE_PATH ?? './data/app.sqlite') {
  const db = new Database(filename);
  // SQLite foreign-key enforcement is connection-local: set it on every connection.
  db.pragma('foreign_keys = ON');
  return db;
}
