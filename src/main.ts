import { Terminal } from './terminal';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('terminal-input') as HTMLInputElement;
  const history = document.getElementById('history') as HTMLElement;
  const content = document.getElementById('terminal-content') as HTMLElement;

  if (input && history && content) {
    new Terminal(input, history, content);
  }
});
