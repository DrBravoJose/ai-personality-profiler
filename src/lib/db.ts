import fs from 'fs';
import path from 'path';

export type SessionStatus = 'waiting' | 'completed';

export interface PersonalityResult {
  R: number; // Rule-abiding vs Autonomous (0-100, >50 means R)
  L: number; // Logical vs Empathetic (0-100, >50 means L)
  C: number; // Cautious vs Diverse (0-100, >50 means C)
  S: number; // System-aligned vs User-centric (0-100, >50 means S)
  archetype: string;
  description: string;
}

export interface SessionData {
  id: string;
  status: SessionStatus;
  createdAt: number;
  result?: PersonalityResult;
}

const dbPath = path.join(process.cwd(), 'src/data/sessions.json');

export function getSessions(): Record<string, SessionData> {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, '{}', 'utf-8');
      return {};
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB:', error);
    return {};
  }
}

export function saveSession(session: SessionData) {
  const sessions = getSessions();
  sessions[session.id] = session;
  fs.writeFileSync(dbPath, JSON.stringify(sessions, null, 2), 'utf-8');
}

export function getSession(id: string): SessionData | null {
  const sessions = getSessions();
  return sessions[id] || null;
}
