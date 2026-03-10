import { Shield, Terminal, Lock, Search, Cpu, Globe } from 'lucide-react';
import { Course, Service } from './types';
import React from 'react';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Network Auditing',
    description: 'Master the art of scanning, testing, and securing complex network infrastructures.',
    duration: '8 Weeks',
    level: 'Intermediate',
    icon: 'Terminal',
  },
  {
    id: '2',
    title: 'Penetration Testing',
    description: 'Learn professional-grade vulnerability assessment and exploitation techniques.',
    duration: '12 Weeks',
    level: 'Advanced',
    icon: 'Shield',
  },
  {
    id: '3',
    title: 'Web App Security',
    description: 'Deep dive into OWASP Top 10 and securing modern web applications.',
    duration: '6 Weeks',
    level: 'Intermediate',
    icon: 'Globe',
  },
  {
    id: '4',
    title: 'Digital Forensics',
    description: 'Investigate cyber crimes and learn data recovery and analysis methods.',
    duration: '10 Weeks',
    level: 'Advanced',
    icon: 'Search',
  },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Vulnerability Assessment',
    description: 'Identifying security weaknesses before attackers do.',
    icon: 'Cpu',
  },
  {
    id: 's2',
    title: 'Incident Response',
    description: 'Rapid action to contain and mitigate cyber security breaches.',
    icon: 'Lock',
  },
  {
    id: 's3',
    title: 'Security Consulting',
    description: 'Expert guidance on building robust security frameworks.',
    icon: 'Shield',
  },
];

export const ACADEMY_NAME = "Zynovia Cyber Security";
export const ACADEMY_TAGLINE = "Empowering the Next Generation of Ethical Hackers";
