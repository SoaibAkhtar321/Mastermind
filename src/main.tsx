import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const hasPrerenderedMarkup = container.innerHTML.trim().length > 0;

if (hasPrerenderedMarkup) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
