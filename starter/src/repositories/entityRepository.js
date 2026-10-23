// ЛР6: замените entity/items на сущность своего варианта.
// Передавайте db из openDatabase(); SQL должен оставаться в repository, не в controller.
export function createEntityRepository(db) {
  return {
    findAll({ limit = 50, offset = 0 } = {}) {
      // TODO: заменить таблицу/поля на предметную модель; использовать параметризованные запросы.
      return db.prepare('SELECT id, name, created_at FROM entities ORDER BY id LIMIT ? OFFSET ?')
        .all(limit, offset);
    },
    findById(id) {
      return db.prepare('SELECT id, name, created_at FROM entities WHERE id = ?').get(id) ?? null;
    },
    create({ name, createdAt }) {
      const result = db.prepare('INSERT INTO entities (name, created_at) VALUES (?, ?)')
        .run(name, createdAt);
      return this.findById(Number(result.lastInsertRowid));
    },
  };
}
