import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PhoneInput from 'react-phone-number-input';

const ResumesList = () => {
   const [resumes, setResumes] = useState([]);
   const [filterSkills, setFilterSkills] = useState([]); // Состояние для фильтра
   const [newFilterSkill, setNewFilterSkill] = useState(''); 
   const { access } = useSelector(state => state.user);

  // Добавление навыка для фильтра
  const addFilterSkill = () => {
    if (newFilterSkill.trim() !== '') {
      setFilterSkills([...filterSkills, newFilterSkill.trim()]);
      setNewFilterSkill('');
    }
  };

  //обновление фильтра
  const refreshFilter = () => {
    setFilterSkills([]);
  }

  // Фильтрация резюме
  const filteredResumes = resumes.filter(resume => {
    // Проверка, совпадают ли все навыки фильтра с навыками резюме
    return filterSkills.every(filterSkill => resume.skills.includes(filterSkill));
  });

   useEffect(() => {
    const fetchData = async() => {
        try {
            const res = await fetch('http://localhost:3000/resumes');
            const data = await res.json();
            setResumes(data) 
            console.log(data)
        } catch (error) {
            console.error('Ошибка при получении данных резюме:', error);
        }
    };
    fetchData()
 
   }, [])
  
   //refsresh кнопка для обновления списка
   const refreshList = async () => {
    try {
        const res = await fetch('http://localhost:3000/resumes');
        const data = await res.json();
        setResumes(data) 
    } catch (error) {
        console.error('Ошибка при получении данных резюме:', error);
    }
   };

   const handleClick = (resumeIndex) => {
    alert(`Вы откликнулись на резюме ${resumeIndex + 1}, обратная связь: ${filteredResumes[resumeIndex].phoneNumber}`);
   }

  

   return (
    <div>
      <h2>Список резюме</h2>
      <div>
        <label htmlFor="filterSkills">Фильтр по навыкам:</label>
        <input 
          type="text" 
          id="filterSkills" 
          value={newFilterSkill} 
          onChange={(e) => setNewFilterSkill(e.target.value)} 
        />
        <button type="button" onClick={addFilterSkill}>Добавить навык</button>
        <button type="button" onClick={refreshFilter}>REFRESH</button>
        <ul>
          {filterSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <ul>
        {filteredResumes.map((resume, index) => (
          <li key={index}>
            <h3>{resume.workerName}</h3>
            <p>Навыки: {resume.skills.join(', ')}</p>
            <p>Текст: {resume.text}</p>
            <button onClick={() => handleClick(index)}>Отклик</button>
          </li>
        ))}
      </ul>
      <button onClick={refreshList}>REFRESH</button>
    </div>
  );
  };

export default ResumesList;