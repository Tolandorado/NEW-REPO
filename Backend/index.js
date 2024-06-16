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

// Определение модели workers
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
    allowNull: false,
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

    // Маршрут для авторизации пользователя
    app.post('/login', async (req, res) => {
      const { name, password } = req.body;
      
      try {

        const worker = await workers.findOne({where: { name }});
        
        if (!password) {
          return res.status(400).json({ message: 'Пароль не может быть пустым' });
        }

        if (!worker) {
          return res.status(404).json({ message: 'Пользователь не найден' });
        }

        if (worker.password !== password) {
          return res.status(401).json({message:'Неверный пароль'})
        }
        res.status(201).json(worker); // Ответ в формате JSON
      } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({ message: 'Ошибка при авторизации пользователя' }); // Ответ в формате JSON
      }
    });

    // Маршрут для регистрации пользователя
    app.post('/register', async (req, res) => {
      const { name, password } = req.body;
      
      try {

        const existingWorker = await workers.findOne({ where: { name } });
        
        if (!password) {
          return res.status(400).json({ message: 'Пароль не может быть пустым' });
        }

        if (existingWorker) {
          return res.status(409).json({ message: 'Пользователь с таким именем уже существует' });
        }

        const newWorker = await workers.create({ name, password });
        res.status(201).json(newWorker); // Ответ в формате JSON
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка при регистрации пользователя' }); // Ответ в формате JSON
      }
    });

    // Маршрут для списка юзеров
    app.get('/workers', async (req, res) => {
      const {name, password} = req.body

       try {
        const allWorkers = await workers.findAll();
        res.status(200).json(allWorkers); // Ответ в формате JSON
      } catch (error) {
        console.error({message: "я лох("})
      }
    })
  

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