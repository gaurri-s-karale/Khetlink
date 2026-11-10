import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { RoleSelectPage } from './pages/RoleSelectPage';
import { MainAppContainer } from './pages/MainAppContainer';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  if (currentView === 'landing') {
    return <LandingPage />;
  }

  if (currentView === 'login') {
    return <RoleSelectPage />;
  }

  return <MainAppContainer />;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
