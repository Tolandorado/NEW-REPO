const express = require('express');
const workers = require('./database');
const sequelize = require('./database');
const cors = require('cors');

// const express = require('express')

const app = express()
const port = 3000
app.use(cors({ origin: '*' }));  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(workers)
})

app.use(express.json());

app.post('/register', async (req, res) => {
  const data = req.body;

  try {
    // Проверка на наличие всех обязательных полей
    if (!data.name || !data.password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }


    // Создание нового пользователя
    const newWorker = await sequelize.workers.workers.findAll().create({
      name: data.name,
      password: data.password, // Помните, что пароль нужно хешировать перед сохранением в базу данных
    });

    // Отправка ответа с информацией о созданном пользователе (без пароля)
    res.status(201).json({
      message: 'Data added successfully',
      data: newWorker // Возвращение данных новой записи
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});