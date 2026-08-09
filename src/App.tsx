import { AppShell, Container, Grid, Text, Select, Paper, Stack, Pagination, Group, Alert } from "@mantine/core"
import Header from "./components/Header"
import SearchInput from "./components/SearchInput"
import {useState, useEffect} from 'react'
import SkillsFilter from "./components/SkillsFilter";
import JobCard from "./components/JobCard";
import { useSelector, useDispatch } from 'react-redux'
import { fetchJobs } from "./store/jobsThunks";
import type { AppDispatch, RootState } from "./store";

const SKILLS = ['JavaScript', 'React', 'Redux', 'Python'];


function App() {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState<string | null>('Все');
  const [skills, setSkills] = useState<string[]>(SKILLS);
  const [page, setPage] = useState(1);

const handleSearchChange = (val: string) => {
  setSearch(val);
  setPage(1);
};

const handleCityChange = (val: string | null) => {
  setCity(val);
  setPage(1);
};

const handleSkillsChange = (val: string[]) => {
  setSkills(val);
  setPage(1);
};

const dispatch = useDispatch<AppDispatch>();

const { jobsList, totalPages, isLoading, error} = useSelector((state: RootState) => state.jobs);

useEffect(() => {
  dispatch(fetchJobs({ search, city, skills, page }));
}, [search, city, skills, page, dispatch]);

  return(
    
  <AppShell header={{ height:60 }}>
    <AppShell.Header bg="white"> 
      <Container size="xl" h="100%">
    <Group justify="space-between" h="100%" align="center">
      <Header />
    </Group>
  </Container></AppShell.Header>


    <AppShell.Main bg="#F6F6F7">
  <Container size="xl" py="md">
    
    <Group justify="space-between" align="flex-end" mb="xl">
      <Stack gap={4}>
        <Text fw={700} size="xl">Список вакансий</Text>
        <Text c="dimmed" size="sm">по профессии Frontend-разработчик</Text>
      </Stack>
      
      <div style={{ width: '508px' }}>
        <SearchInput value={search} onChange={handleSearchChange} />
      </div>
    </Group>

    <Grid gap="md">
      
      <Grid.Col span={4}>
        
          <Stack gap="md">

            <Paper p="md" radius="md" withBorder bg="white">
              <SkillsFilter skills={skills} onChange={handleSkillsChange} />
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

      <Grid.Col span={8}>
        <Stack gap="md">
          {isLoading && <Text size="sm" c="dimmed">Загрузка вакансий...</Text>}
          {error && (
            <Alert variant="light" color="red" title="Внимание" radius="md">{error}: Необходимо включить VPN</Alert>)}
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
          }
          }}
         />
        </Stack>
      </Grid.Col>
    </Grid>

  </Container>
</AppShell.Main>
  </AppShell>
  )
}

export default App
