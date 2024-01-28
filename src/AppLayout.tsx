import { ReactNode } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { AppShell, NavLink, ScrollArea } from '@mantine/core';

import { IconHome, IconSettings } from '@tabler/icons-react';

import { useAppSelector, selectIsSidebarOpened } from '@/app-redux';

import { AppTitle } from './AppTitle';

export const AppLayout = ({}: { children?: ReactNode }) => {
  const isSidebarOpened = useAppSelector(selectIsSidebarOpened);

  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 50 + 200,
        breakpoint: 'sm',
        collapsed: { mobile: !isSidebarOpened },
      }}
    >
      <AppTitle />

      <AppShell.Navbar>
        <div className="w-full h-full flex">
          <div className="py-5 flex-1 flex flex-col items-center">
            <NavLink
              label="Home"
              leftSection={<IconHome size={18} />}
              onClick={() => navigate('/')}
              active={window.location.pathname === '/'}
            />
            <NavLink
              label="GraphQL"
              leftSection={<IconSettings size={18} />}
              onClick={() => navigate('/graphql')}
              active={window.location.pathname === '/graphql'}
            />
            <NavLink
              label="RLS"
              leftSection={<IconSettings size={18} />}
              onClick={() => navigate('/rls')}
              active={window.location.pathname === '/rls'}
            />
          </div>
        </div>
      </AppShell.Navbar>

      <AppShell.Main>
        <ScrollArea p="md" style={{ height: 'calc(100vh - 60px)' }}>
          <Outlet />
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
};
