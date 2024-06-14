const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');


// Подключение к базе данных
const sequelize = new Sequelize('database', 'user', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false // Отключаем автоматическое добавление timestamp
  }
});

// Определение модели
const workers = sequelize.define('workers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  }
});

// Создание таблицы в базе данных
const startServer = async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Таблица создана успешно!');

    const app = express();
    app.use(cors()); 
    app.use(express.json());

    // Маршрут для регистрации пользователя
    app.post('/register', async (req, res) => {
      const { name, password } = req.body;
      
      try {
        const newWorker = await workers.create({ name, password });
        res.status(201).json(newWorker); // Ответ в формате JSON
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка при регистрации пользователя' }); // Ответ в формате JSON
      }
    });

    // Запуск сервера
    app.listen(3000, () => {
      console.log('Сервер запущен на порту 3000');
    });
  } catch (error) {
    console.error('Ошибка при создании таблицы:', error);
  }
};

// Запускаем сервер
startServer();