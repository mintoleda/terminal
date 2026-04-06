import { COMMANDS, fetchSkills, fetchProjects, fetchContacts, createOutput, getHelpOutput } from './commands';

export class Terminal {
  private history: string[] = [];
  private historyIndex: number = -1;
  private input: HTMLInputElement;
  private outputContainer: HTMLElement;
  private scrollContainer: HTMLElement;

  constructor(inputElement: HTMLInputElement, outputElement: HTMLElement, scrollElement: HTMLElement) {
    this.input = inputElement;
    this.outputContainer = outputElement;
    this.scrollContainer = scrollElement;

    this.init();
  }

  private init() {
    this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
    window.addEventListener('click', () => this.input.focus());

    // Welcome message
    const welcome = document.createElement('div');
    welcome.className = 'output-text';
    welcome.innerHTML = `
      <div class="bold-text" style="color: var(--primary)">Adetola OS (v1.0.0)</div>
      <div>Welcome to terminal.adetola.dev. Type 'help' to see available commands.</div>
    `;
    this.outputContainer.appendChild(welcome);
  }

  private async handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const command = this.input.value.trim();
      this.input.value = '';
      if (command) {
        this.history.unshift(command);
        this.historyIndex = -1;
        await this.executeCommand(command);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = -1;
        this.input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = this.input.value.toLowerCase();
      const match = Object.values(COMMANDS).find(cmd => cmd.startsWith(currentInput));
      if (match) {
        this.input.value = match;
      }
    }
  }

  private async executeCommand(commandStr: string) {
    const [cmd, ...args] = commandStr.split(' ');
    
    // Create command echo
    const echoLine = document.createElement('div');
    echoLine.className = 'output-command';
    echoLine.innerHTML = `<span>guest@adetola.dev:~$</span> <span class="command-result">${commandStr}</span>`;
    this.outputContainer.appendChild(echoLine);

    let output: HTMLElement | null = null;

    switch (cmd.toLowerCase()) {
      case COMMANDS.HELP:
        output = createOutput(getHelpOutput());
        break;
      case COMMANDS.ABOUT:
        output = createOutput('<div class="italic-text">software engineer studying cs & data science at ut austin. i play saxophone and experiment with my hyprland config.</div>');
        break;
      case COMMANDS.SKILLS:
        const skills = await fetchSkills();
        const skillContainer = document.createElement('div');
        skills.forEach(skill => {
          const span = document.createElement('span');
          span.className = 'skill-tag';
          span.textContent = `[${skill}]`;
          skillContainer.appendChild(span);
        });
        output = createOutput(skillContainer);
        break;
      case COMMANDS.PROJECTS:
        const projects = await fetchProjects();
        const projectContainer = document.createElement('div');
        projects.forEach(p => {
          const div = document.createElement('div');
          div.className = 'project-item';
          div.innerHTML = `
            <a href="${p.href}" class="project-title" target="_blank">${p.title}</a>
            <div class="project-desc">${p.description}</div>
            <div class="project-tags">${p.tags.join(' • ')}</div>
          `;
          projectContainer.appendChild(div);
        });
        output = createOutput(projectContainer);
        break;
      case COMMANDS.CONTACT:
        const contacts = await fetchContacts();
        const contactContainer = document.createElement('div');
        contacts.forEach(c => {
          const div = document.createElement('div');
          div.className = 'contact-item';
          div.innerHTML = `<span class="contact-label">${c.name}:</span> <a href="${c.href}" class="contact-link" target="_blank">${c.value}</a>`;
          contactContainer.appendChild(div);
        });
        output = createOutput(contactContainer);
        break;
      case COMMANDS.CLEAR:
        this.outputContainer.innerHTML = '';
        return;
      case COMMANDS.DATE:
        output = createOutput(new Date().toString());
        break;
      case COMMANDS.WHOAMI:
        output = createOutput('guest');
        break;
      case COMMANDS.ECHO:
        output = createOutput(args.join(' '));
        break;
      case COMMANDS.RESUME:
        output = createOutput('Opening resume...');
        window.open('https://adetola.dev/resources/resume.pdf', '_blank');
        break;
      case COMMANDS.USES:
        output = createOutput('Redirecting to /uses...');
        window.location.href = 'https://adetola.dev/uses';
        break;
      case COMMANDS.NOW:
        output = createOutput('Redirecting to /now...');
        window.location.href = 'https://adetola.dev/now';
        break;
      default:
        output = createOutput(`<div class="error-text">Command not found: ${cmd}. Type 'help' to see available commands.</div>`);
    }

    if (output) {
      this.outputContainer.appendChild(output);
    }

    this.scrollToBottom();
  }

  private scrollToBottom() {
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
  }
}
