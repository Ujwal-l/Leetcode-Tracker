// src/lib/api.ts
import type { Comparison, DomainId } from './domains';

// Mock API until we wire up AI
export async function callCompareAPI(
  a: DomainId,
  b: DomainId
): Promise<Comparison> {
  return {
    title: `${a} vs ${b}`,
    description: `Mock comparison between ${a} and ${b}.`,
    salary: '₹10–30 LPA',
    trending: true,
    technologies: ['React', 'Python', 'AWS'],
  };
}

export const MOCK_TECH = ['React', 'Node.js', 'Python', 'AWS'];
