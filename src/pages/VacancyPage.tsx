import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Badge,
  Container,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { fetchJobById } from '../store/jobsThunks';
import type { AppDispatch, RootState } from '../store';


export default function VacancyPage() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const { currentJob, isDetailsLoading, detailsError } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [id, dispatch]);

  const spaceLabels = {
    office: 'Офис',
    remote: 'Можно удалённо',
    hybrid: 'Гибрид',
  };

  const jobMatchesId =
    currentJob !== null && String(currentJob.id) === id;

  return (
  <Container size={660} py="lg">
    {detailsError ? (
      <Alert color="red" title="Ошибка загрузки">
        {detailsError}
      </Alert>
    ) : isDetailsLoading || !jobMatchesId ? (
      <Text c="dimmed">Загрузка вакансии...</Text>
    ) : (
      <Stack gap="lg">
        <Paper p="lg" radius="md" bg="white">
          <Stack gap="xs">
            <Text
              component="h1"
              size="lg"
              fw={700}
              c="indigo.5"
              m={0}
            >
              {currentJob.name}
            </Text>

            <Group gap="md">
              <Text size="sm">{currentJob.salary} ₽</Text>
              <Text size="sm" c="dimmed">
                Опыт: {currentJob.experience}
              </Text>
            </Group>

            <Text size="sm" c="dimmed" mt="xs">
              {currentJob.company_name}
            </Text>

            <Badge
              color={
                currentJob.space === 'remote'
                  ? 'indigo'
                  : currentJob.space === 'hybrid'
                    ? 'dark'
                    : 'gray'
              }
              variant="filled"
              radius="sm"
              size="sm"
              style={{ alignSelf: 'flex-start' }}
            >
              {spaceLabels[currentJob.space]}
            </Badge>

            <Text size="sm">{currentJob.city}</Text>
          </Stack>
        </Paper>

        <Paper p="lg" radius="md" bg="white">
          <Stack gap="sm">
            <Text component="h2" size="lg" fw={700} m={0}>
              Компания
            </Text>

            <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
              {currentJob.about_company}
            </Text>

            <Text component="h2" size="sm" fw={700} m={0} mt="xs">
              О вакансии:
            </Text>

            <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
              {currentJob.description}
            </Text>
          </Stack>
        </Paper>
      </Stack>
    )}
  </Container>
);
}