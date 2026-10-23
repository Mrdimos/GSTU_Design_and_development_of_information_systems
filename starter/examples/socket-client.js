// Запуск после установки socket.io-client и запуска совместимого сервера.
import { io } from 'socket.io-client';

const token = process.env.DEMO_ACCESS_TOKEN;
if (!token) throw new Error('Set DEMO_ACCESS_TOKEN in the environment');
const socket = io('http://localhost:3000/app', { auth: { token }, reconnection: true });
socket.on('connect', () => console.log('connected', socket.id));
socket.on('connect_error', (error) => console.error('connection error', error.message));
socket.on('notification', (payload) => console.log('notification', payload));
