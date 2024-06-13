import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice'; // Импортируем action для обновления состояния

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправить запрос на сервер для регистрации пользователя
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
     
      if (response.ok) {
        const data = await response.json();
        console.log('Данные ответа:', data);
        dispatch(setUser(data));
       
        // Перенаправить на другую страницу или обновить текущую
        // Например, history.push('/profile');
      } else {
        console.error('Ошибка регистрации:', await response.json());
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Register;