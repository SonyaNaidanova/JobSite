import { AppShell, Container, Group } from '@mantine/core';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import VacanciesPage from './pages/VacanciesPage';
import VacancyPage from './pages/VacancyPage';

function App() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header bg="white">
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%" align="center">
            <Header />
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main bg="#F6F6F7">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/vacancies" replace />}
          />

          <Route
            path="/vacancies"
            element={<VacanciesPage />}
          />
          <Route
            path="/vacancies/:id"
            element={<VacancyPage />}
          />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
