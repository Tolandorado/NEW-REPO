import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResumesList from '../resumesList';
import { Link } from 'react-router-dom';
import styles from './home.module.scss';
import { removeUser } from '../../store/slices/userSlice'

const Home = () => {
  const { name } = useSelector(state => state.user);
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(removeUser());
  }
    
    return (
      <>
      <div>
      <span>Вы авторизовались как {name}</span>
      <Link to='/add-resume' className={styles.option}>Создать резюме</Link>
      <button onClick={handleSubmit} className={styles.option}>Выйти</button>
      </div>
    
      <ResumesList />
      </>
    );
  };


export default Home;