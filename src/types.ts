export interface Project {
  title: string;
  description: string;
  href: string;
  tags: string[];
}

export interface Contact {
  name: string;
  value: string;
  href: string;
}

export type Skill = string;

export interface CommandOutput {
  command: string;
  output: HTMLElement;
}
