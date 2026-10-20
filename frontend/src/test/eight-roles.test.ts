import { describe, expect, it } from 'vitest';
import { ALL_TENANT_ROLES, DEFAULT_TENANTS } from '@/data/tenants';
import { ROLE_HOME, ROLE_LABELS, ROLE_NOTIFICATIONS } from '@/types/roles';
import { ROLE_BOTTOM_NAV, ROLE_NAVIGATION } from '@/shared/navigation/roleNavigation';

describe('EduCore Horizonte — oito perfis', () => {
  it('mantém exactamente os oito perfis aprovados', () => {
    expect(ALL_TENANT_ROLES).toEqual([
      'student', 'guardian', 'teacher', 'pedagogy',
      'reception', 'executive', 'secretary', 'finance',
    ]);
    expect(DEFAULT_TENANTS[0].enabledRoles).toEqual(ALL_TENANT_ROLES);
  });

  it('cada perfil tem entrada própria e navegação desktop/mobile', () => {
    for (const role of ALL_TENANT_ROLES) {
      expect(ROLE_LABELS[role]).toBeTruthy();
      expect(ROLE_HOME[role]).toMatch(/^\/app\//);
      expect(ROLE_NAVIGATION[role].length).toBeGreaterThan(0);
      expect(ROLE_BOTTOM_NAV[role].length).toBeGreaterThan(0);
      expect(ROLE_NAVIGATION[role][0].path).toBe(ROLE_HOME[role]);
    }
  });

  it('Receção mantém zona separada da Secretaria e Finanças', () => {
    expect(ROLE_HOME.reception).toBe('/app/reception/dashboard');
    expect(ROLE_NOTIFICATIONS.reception).toBe('/app/reception/notifications');
    expect(ROLE_NAVIGATION.reception.map(item => item.path)).toEqual(expect.arrayContaining([
      '/app/reception/requests',
      '/app/reception/desk',
      '/app/reception/admissions',
      '/app/reception/appointments',
      '/app/reception/referrals',
    ]));
    expect(ROLE_NAVIGATION.reception.every(item => item.path.startsWith('/app/reception/'))).toBe(true);
  });
});
