import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice'; // Импортируем action для обновления состояния
import { Link } from 'react-router-dom';

const Home = () => {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
      const fetchWorkers = async () => {
        try {
          const response = await fetch('http://localhost:3000/workers');
          if (response.ok) {
            const data = await response.json();
            setWorkers(data);
          } else {
            console.error('Ошибка получения данных:', response.status);
          }
        } catch (error) {
          console.error('Ошибка получения данных:', error);
        }
      };
  
      fetchWorkers();
    }, []);
  
    return (
      <div>
        <h2>Список работников:</h2>
        <ul>
          {workers.map((worker) => (
            <li key={worker.id}>
              {worker.name}
              {/* ... отобразить другие поля модели */}
            </li>
          ))}
        </ul>
      </div>
    );
  };


export default Home;