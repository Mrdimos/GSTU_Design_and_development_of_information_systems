-- Стартовая схема учётных записей для ЛР6.
-- Пароль и password_hash здесь намеренно отсутствуют: проверка пароля начинается в ЛР8.
-- Seed-учётные записи демонстрационные; измените роли под свой вариант.
-- PRAGMA foreign_keys действует только для текущего соединения; приложение должно
-- выполнять её при каждом открытии соединения SQLite.
-- PRAGMA foreign_keys действует только для текущего соединения; приложение должно
-- выполнять её при каждом открытии соединения SQLite.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    id           INTEGER PRIMARY KEY,
    login        TEXT NOT NULL UNIQUE,
    email        TEXT UNIQUE,
    display_name TEXT NOT NULL,
    role         TEXT NOT NULL,
    created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

INSERT OR IGNORE INTO users (login, email, display_name, role)
VALUES
    ('demo_employee', 'demo.employee@example.test', 'Demo Employee', 'employee'),
    ('demo_admin', 'demo.admin@example.test', 'Demo Administrator', 'admin');

-- В ЛР8 пароль demo_admin задаётся через переменную окружения и хешируется bcrypt.
-- Не добавляйте пароль в SQL-файл или исходный код.

-- В ЛР8 пароль demo_admin задаётся через переменную окружения и хешируется bcrypt.
-- Не добавляйте пароль в SQL-файл или исходный код.

-- Добавьте здесь таблицу членства/назначений, соответствующую предметной модели варианта.
-- Например, связь user_id с проектом, лабораторией, отделом или назначенной заявкой.

CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    PRIMARY KEY (user_id, role)
);
