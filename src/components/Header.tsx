import {Group, Text, Anchor, Image} from '@mantine/core'
import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <>
        <Group gap="xs">
        <Image 
        src='/JobSite/logoHH.png' 
        h={32}       
        w="auto" 
        alt="HH Logo"
        />
        <Text fw={700} size='lg'>.FrontEnd</Text>
        </Group>

        <Group 
        gap="md" 
        style={{ 
        position: 'absolute', 
        left: '50%', 
        transform: 'translateX(-50%)' 
         }}>
      <Anchor
       component={Link}
       to="/vacancies"
       c="#0F0F10"
       fw={500}
       underline="never"
       >
        Вакансии FE
      </Anchor>
        <Text c="indigo.6" fw={700}>•</Text>
        <Image src="/JobSite/user-circle.svg" h={25} w="auto" alt="Logo"/>
        <Anchor c="dimmed" underline="never">
               Обо мне
        </Anchor>
        </Group>
        </>
    )
}