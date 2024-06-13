import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData, thunkAPI) => {
      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Возвращаем только id и name для сохранения в Redux
          return { id: data.id, name: data.name }; 
        } else {
          return thunkAPI.rejectWithValue(await response.json()); 
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );