import { Paper, Text, Badge, Button, Group, Stack } from '@mantine/core'
import { type Job } from "../store/jobsThunks";

export default function JobCard({ job }: { job: Job }) {
  const getSpaceLabel = (space: string) => {
    if (space === 'remote') return 'Можно удалённо';
    if (space === 'hybrid') return 'Гибрид';
    return 'Офис';
  };

  const getSpaceColor = (space: string) => {
    if (space === 'remote') return 'blue';    
    if (space === 'hybrid') return 'black';   
    return 'gray';                            
  };

  return (
    <Paper p="md" radius="md" withBorder mb="sm" bg="white">
      <Stack gap="xs">
        
        <Text fw={700} size="lg">{job.name}</Text>

        <Group gap="md">
          <Text fw={400} c="#0F0F10">{job.salary} ₽</Text>
          <Text size="sm" c="dimmed">Опыт: {job.experience}</Text>
        </Group>

        <Text size="sm" c="dimmed">{job.company_name}</Text>

        <Group>
          <Badge 
            color={getSpaceColor(job.space)} 
            variant="filled" 
            radius="sm" 
          >
            {getSpaceLabel(job.space)}
          </Badge>
        </Group>

        <Text size="sm" fw={400} c="#0F0F10">{job.city}</Text>

        <Group justify="flex-start" mt="xs">
          <Button color="black" size="sm" radius="md">
            Смотреть вакансию
          </Button>
        </Group>

      </Stack>
    </Paper>
  )
}