import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ResumesList from './resumesList';
import { Link } from 'react-router-dom';

const Home = () => {
  const { name } = useSelector(state => state.user);
    
    return (
      <>
      <div>
      <span>Вы авторизовались как {name}</span>
      </div>
      <Link to='/add-resume'>Создать резюме</Link>
      <ResumesList />
      </>
    );
  };


export default Home;