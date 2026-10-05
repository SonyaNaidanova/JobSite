import {
  Container,
  Grid,
  Text,
  Select,
  Paper,
  Stack,
  Pagination,
  Group,
  Alert,
} from '@mantine/core';
import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchInput from '../components/SearchInput';
import SkillsFilter from '../components/SkillsFilter';
import JobCard from '../components/JobCard';
import { fetchJobs } from '../store/jobsThunks';
import type { AppDispatch, RootState } from '../store';
import { useSearchParams } from 'react-router-dom';


const SKILLS = ['JavaScript', 'React', 'Redux', 'Python'];

export default function VacanciesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const city = searchParams.get('city') || 'Все';
  const skillsParam = searchParams.get('skills');
  const skills = useMemo(() => {
  if (skillsParam === null) {
    return SKILLS;
  }
  return skillsParam.split(',').filter(Boolean);
  }, [skillsParam]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  const { jobsList, totalPages, isLoading, error } = useSelector(
    (state: RootState) => state.jobs
  );

const handleSearchChange = (value: string) => {
  const nextParams = new URLSearchParams(searchParams);

  if (value) {
    nextParams.set('search', value);
  } else {
    nextParams.delete('search');
  }

  setSearchParams(nextParams, { replace: true });
  setPage(1);
};

  const handleCityChange = (value: string | null) => {
  const nextParams = new URLSearchParams(searchParams);

  if (value && value !== 'Все') {
    nextParams.set('city', value);
  } else {
    nextParams.delete('city');
  }

  setSearchParams(nextParams);
  setPage(1);
};

  const handleSkillsChange = (value: string[]) => {
  const nextParams = new URLSearchParams(searchParams);

  nextParams.set('skills', value.join(','));

  setSearchParams(nextParams);
  setPage(1);
};

  useEffect(() => {
    dispatch(fetchJobs({ search, city, skills, page }));
  }, [search, city, skills, page, dispatch]);

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" align="flex-end" mb="xl">
        <Stack gap={4}>
          <Text fw={700} size="xl">
            Список вакансий
          </Text>
          <Text c="dimmed" size="sm">
            по профессии Frontend-разработчик
          </Text>
        </Stack>

        <div style={{ width: '508px', maxWidth: '100%' }}>
          <SearchInput value={search} onChange={handleSearchChange} />
        </div>
      </Group>

      <Grid  gap="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            <Paper p="md" radius="md" withBorder bg="white">
              <SkillsFilter
                skills={skills}
                onChange={handleSkillsChange}
              />
            </Paper>

            <Paper p="md" radius="md" withBorder bg="white">
              <Select
                label="Город"
                data={['Все', 'Москва', 'Санкт-Петербург']}
                value={city}
                onChange={handleCityChange}
              />
            </Paper>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="md">
            {isLoading && (
              <Text size="sm" c="dimmed">
                Загрузка вакансий...
              </Text>
            )}

            {error && (
              <Alert color="red" title="Ошибка загрузки" radius="md">
                {error}
              </Alert>
            )}

            {jobsList.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}

            <Pagination
              total={totalPages}
              value={page}
              onChange={setPage}
              mt="lg"
              styles={{
                control: {
                  backgroundColor: '#F6F6F7',
                  border: '1px solid #E9ECEF',
                  color: '#0F0F10',
                },
              }}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}