// src/lib/domains.ts

export type DomainId = 'frontend' | 'backend' | 'devops' | 'dataScience';

export interface Comparison {
  title: string;
  description: string;
  salary: string; // e.g. "₹10–30 LPA"
  trending: boolean; // simple true/false
  technologies: string[]; // list of skills/techs
}
