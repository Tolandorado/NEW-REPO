import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';

const ResumeForm = () => {
    const dispatch = useDispatch();
    const { id: workerId, name: workerName, access } = useSelector(state => state.user);
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [text, setText] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const navigate = useNavigate(); 
    // Добавление скилла в массив
    const addSkillToArr = () => {
        if (newSkill.trim() !== '') { // Проверяем, не пустое ли поле
          setSkills([...skills, newSkill.trim()]);
          setNewSkill(''); // Очищаем поле ввода
        }
      };
  
    // Отправка формы
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        // Отправка POST-запроса на сервер
        const response = await fetch('http://localhost:3000/add-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            workerId,
            workerName,
            skills,
            text,
            phoneNumber
          }),
        });
    
        // Обработка ответа сервера
        if (response.ok) {
        
          // Обновление состояния
          const data = await response.json();
          console.log('Данные ответа:', data);
          setSkills([]); // Очистка массива навыков
          setNewSkill(''); // Очистка поля ввода навыков
          setText(''); // 
          navigate('/')
          setPhoneNumber('')
          // ...
        } else {
          // Обработка ошибки
          // ...
        }
      } catch (error) {
        // Обработка ошибки
        // ...
      }
    };
  
    return (
        <>
        {access === false && (
        <div>
          <h2>Доступ запрещен</h2>
          <p>У вас нет прав для регистрации.</p>
          <Link to='/register'>Страница входа</Link>
        </div>
      )}
        {access && (
            <>
            <Link to='/'>Вернуться на главную</Link>
            <form onSubmit={handleSubmit}>
                <div>
            <label htmlFor="text">Текст резюме:</label>
            <textarea 
              id="text"
              value={text} 
              onChange={(e) => setText(e.target.value)}
            />
                </div>

                <div>
              <label htmlFor="phoneNumber">Номер телефона:</label> 
              <PhoneInput
                placeholder="Введите номер телефона"
                value={phoneNumber}
                onChange={setPhoneNumber} 
              /> 
            </div>
    
                <div>
                    <label htmlFor="skills">Навыки:</label>
            <input 
              type="text" 
              id="skills" 
              value={newSkill} 
              onChange={(e) => setNewSkill(e.target.value)} 
            />
            <button type="button" onClick={addSkillToArr}>Добавить навык</button>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          {/* ... (остальной код формы) */}
          <button type="submit">создать резюме</button>
        </form>
            </>
        )}
        </>
  );
  };

export default ResumeForm;