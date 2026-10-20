export type UserRole =
  | 'student'
  | 'guardian'
  | 'teacher'
  | 'pedagogy'
  | 'executive'
  | 'reception'
  | 'secretary'
  | 'finance';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  institution?: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  student: 'Aluno',
  guardian: 'Encarregado',
  teacher: 'Professor',
  pedagogy: 'Pedagogia',
  executive: 'Direcção',
  reception: 'Receção',
  secretary: 'Secretaria',
  finance: 'Finanças',
};

export const ROLE_HOME: Record<UserRole, string> = {
  student: '/app/student/dashboard',
  guardian: '/app/guardian/dashboard',
  teacher: '/app/teacher/dashboard',
  pedagogy: '/app/pedagogy/dashboard',
  executive: '/app/executive/dashboard',
  reception: '/app/reception/dashboard',
  secretary: '/app/secretary/dashboard',
  finance: '/app/finance/dashboard',
};

export const ROLE_NOTIFICATIONS: Partial<Record<UserRole, string>> = {
  student: '/app/student/notifications',
  guardian: '/app/guardian/notifications',
  teacher: '/app/teacher/notifications',
  pedagogy: '/app/pedagogy/notifications',
  executive: '/app/executive/notifications',
  reception: '/app/reception/notifications',
  secretary: '/app/secretary/notifications',
  finance: '/app/finance/notifications',
};
