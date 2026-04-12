import { Project, Contact, Skill } from './types';

const API_BASE = 'https://adetola.dev/api';

export const COMMANDS = {
  HELP: 'help',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  CONTACT: 'contact',
  CLEAR: 'clear',
  DATE: 'date',
  WHOAMI: 'whoami',
  ECHO: 'echo',
  RESUME: 'resume',
  USES: 'uses',
  NOW: 'now',
  LS: 'ls',
} as const;

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return await res.json();
  } catch (e) {
    console.error(e);
    return ["Java", "Python", "JavaScript", "TypeScript", "React", "Spring Boot", "Docker", "PostgreSQL", "Apache Kafka", "Google Cloud Platform"];
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchContacts(): Promise<Contact[]> {
  try {
    const res = await fetch(`${API_BASE}/contact`);
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return await res.json();
  } catch (e) {
    console.error(e);
    return [
      { name: "Email", value: "adetolaadetunji08@gmail.com", href: "mailto:adetolaadetunji08@gmail.com" },
      { name: "GitHub", value: "mintoleda", href: "https://github.com/mintoleda" },
      { name: "LinkedIn", value: "in/adetola-adetunji", href: "https://www.linkedin.com/in/adetola-adetunji/" }
    ];
  }
}

export function createOutput(content: string | HTMLElement): HTMLElement {
  const div = document.createElement('div');
  div.className = 'output-text';
  if (typeof content === 'string') {
    div.innerHTML = content;
  } else {
    div.appendChild(content);
  }
  return div;
}

export function getHelpOutput(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'help-grid';
  
  const helpData = [
    [COMMANDS.HELP, 'Show this help message'],
    [COMMANDS.ABOUT, 'Learn more about me'],
    [COMMANDS.SKILLS, 'List my technical skills'],
    [COMMANDS.PROJECTS, 'View my recent projects'],
    [COMMANDS.CONTACT, 'Get in touch'],
    [COMMANDS.CLEAR, 'Clear the terminal output'],
    [COMMANDS.DATE, 'Show current date and time'],
    [COMMANDS.WHOAMI, 'Print current user'],
    [COMMANDS.ECHO, 'Print arguments'],
    [COMMANDS.RESUME, 'Link to resume'],
    [COMMANDS.USES, 'Link to my setup'],
    [COMMANDS.NOW, 'Link to what I\'m doing now'],
    [COMMANDS.LS, 'List all available commands'],
  ];

  helpData.forEach(([cmd, desc]) => {
    const cmdSpan = document.createElement('span');
    cmdSpan.className = 'help-cmd';
    cmdSpan.textContent = cmd;
    
    const descSpan = document.createElement('span');
    descSpan.className = 'help-desc';
    descSpan.textContent = desc;
    
    container.appendChild(cmdSpan);
    container.appendChild(descSpan);
  });

  return container;
}
