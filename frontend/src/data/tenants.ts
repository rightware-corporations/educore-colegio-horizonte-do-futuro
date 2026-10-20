import type { TenantConfig, TenantModule } from '@/types/tenant';
import type { UserRole } from '@/types/roles';

export const ALL_TENANT_ROLES: UserRole[] = [
  'student',
  'guardian',
  'teacher',
  'pedagogy',
  'reception',
  'executive',
  'secretary',
  'finance',
];

export const CORE_TENANT_MODULES: TenantModule[] = [
  'student_registry',
  'admissions',
  'enrollment',
  'academic',
  'timetable',
  'attendance',
  'assessments',
  'gradebook',
  'finance',
  'treasury',
  'documents',
  'communication',
  'knowledge',
  'reporting',
];

export const DEFAULT_TENANTS: TenantConfig[] = [
  {
    id: 'tenant-horizonte-do-futuro-001',
    slug: 'colegio-horizonte-do-futuro',
    status: 'active',
    legalName: 'Colégio Horizonte do Futuro',
    countryCode: 'MZ',
    locale: 'pt-MZ',
    timezone: 'Africa/Maputo',
    currency: 'MZN',
    branding: {
      displayName: 'Colégio Horizonte do Futuro',
      shortName: 'Horizonte do Futuro',
      descriptor: 'Colégio',
      logo: '/school/logo.webp',
      mark: '/school/logo.webp',
      favicon: '/school/logo.webp',
      primaryHsl: '212 86% 19%',
      accentHsl: '38 91% 54%',
      sidebarHsl: '212 86% 15%',
      experiencePreset: 'editorial',
    },
    enabledRoles: ALL_TENANT_ROLES,
    enabledModules: CORE_TENANT_MODULES,
    publicExperience: {
      landingEnabled: true,
      applicationsEnabled: true,
      commerceEnabled: false,
      poweredByEduCore: true,
    },
    createdAt: '2026-10-19T00:00:00.000Z',
  },
];
