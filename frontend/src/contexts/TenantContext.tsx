import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ALL_TENANT_ROLES, CORE_TENANT_MODULES, DEFAULT_TENANTS } from '@/data/tenants';
import type { CreateTenantInput, TenantConfig, TenantModule } from '@/types/tenant';

interface TenantContextValue {
  tenants: TenantConfig[];
  activeTenant: TenantConfig;
  activeTenantId: string;
  setActiveTenant: (tenantId: string) => void;
  createTenant: (input: CreateTenantInput) => TenantConfig;
  updateTenant: (tenantId: string, patch: Partial<TenantConfig>) => void;
  setModuleEnabled: (tenantId: string, module: TenantModule, enabled: boolean) => void;
  resetPreviewTenants: () => void;
}

const TenantContext = createContext<TenantContextValue | null>(null);

function normaliseSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function applyTenantTheme(tenant: TenantConfig) {
  const root = document.documentElement;
  root.style.setProperty('--primary', tenant.branding.primaryHsl);
  root.style.setProperty('--ring', tenant.branding.primaryHsl);
  root.style.setProperty('--sidebar-background', tenant.branding.sidebarHsl);
  root.style.setProperty('--sidebar-primary', tenant.branding.accentHsl);
  root.style.setProperty('--sidebar-ring', tenant.branding.accentHsl);
  root.style.setProperty('--brand-orange', tenant.branding.accentHsl);
  document.body.dataset.tenantPreset = tenant.branding.experiencePreset;
  document.title = 'Colégio Horizonte do Futuro | EduCore';

  if (tenant.branding.favicon) {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = tenant.branding.favicon;
  }
}

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenants, setTenants] = useState<TenantConfig[]>(DEFAULT_TENANTS);
  const [activeTenantId, setActiveTenantId] = useState(DEFAULT_TENANTS[0].id);

  const activeTenant = useMemo(
    () => tenants.find((tenant) => tenant.id === activeTenantId) ?? tenants[0] ?? DEFAULT_TENANTS[0],
    [tenants, activeTenantId],
  );

  useEffect(() => {
    applyTenantTheme(activeTenant);
  }, [activeTenant]);

  const setActiveTenant = useCallback((tenantId: string) => {
    setActiveTenantId((current) => (tenants.some((tenant) => tenant.id === tenantId) ? tenantId : current));
  }, [tenants]);

  const createTenant = useCallback((input: CreateTenantInput) => {
    const slug = normaliseSlug(input.slug || input.displayName);
    const now = new Date().toISOString();
    const tenant: TenantConfig = {
      id: `tenant-${Date.now()}`,
      slug,
      status: 'draft',
      legalName: input.legalName,
      countryCode: 'MZ',
      locale: 'pt-MZ',
      timezone: 'Africa/Maputo',
      currency: 'MZN',
      branding: {
        displayName: input.displayName,
        shortName: input.shortName || input.displayName,
        descriptor: 'Instituição de Ensino',
        primaryHsl: input.primaryHsl || '215 48% 24%',
        accentHsl: input.accentHsl || '198 75% 45%',
        sidebarHsl: input.primaryHsl || '215 48% 18%',
        experiencePreset: input.experiencePreset || 'modern',
      },
      enabledRoles: ALL_TENANT_ROLES,
      enabledModules: CORE_TENANT_MODULES,
      publicExperience: {
        landingEnabled: true,
        applicationsEnabled: true,
        commerceEnabled: false,
        poweredByEduCore: true,
      },
      createdAt: now,
    };

    setTenants((current) => {
      if (current.some((item) => item.slug === slug)) return current;
      return [...current, tenant];
    });
    setActiveTenantId(tenant.id);
    return tenant;
  }, []);

  const updateTenant = useCallback((tenantId: string, patch: Partial<TenantConfig>) => {
    setTenants((current) => current.map((tenant) => tenant.id === tenantId ? { ...tenant, ...patch } : tenant));
  }, []);

  const setModuleEnabled = useCallback((tenantId: string, module: TenantModule, enabled: boolean) => {
    setTenants((current) => current.map((tenant) => {
      if (tenant.id !== tenantId) return tenant;
      const modules = new Set(tenant.enabledModules);
      if (enabled) {
        modules.add(module);
      } else {
        modules.delete(module);
      }
      return { ...tenant, enabledModules: Array.from(modules) };
    }));
  }, []);

  const resetPreviewTenants = useCallback(() => {
    setTenants(DEFAULT_TENANTS);
    setActiveTenantId(DEFAULT_TENANTS[0].id);
  }, []);

  const value = useMemo(() => ({
    tenants,
    activeTenant,
    activeTenantId,
    setActiveTenant,
    createTenant,
    updateTenant,
    setModuleEnabled,
    resetPreviewTenants,
  }), [tenants, activeTenant, activeTenantId, setActiveTenant, createTenant, updateTenant, setModuleEnabled, resetPreviewTenants]);

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) throw new Error('useTenant must be used within TenantProvider');
  return context;
}
