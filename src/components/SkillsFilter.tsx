import {Pill, TextInput, ActionIcon, Group, Text} from '@mantine/core'
import { useState } from 'react';

type SkillsFilterProps = {
    skills: string[];
    onChange: (skills: string[]) => void;
}

export default function SkillsFilter({skills, onChange}: SkillsFilterProps){
    const [inputValue, setInputValue] = useState('');

const handleAdd = () => {
    const trimmed = inputValue.trim()
    if(trimmed && !skills.includes(trimmed)){
        onChange([...skills, trimmed]);
        setInputValue('');
    }
};

const handleRemove = (skillToRemove: string) => {
    const updated = skills.filter((skill) => skill !== skillToRemove);
    onChange(updated);
}

return(
      <>
      <Text size="sm" fw={500} mb={4}>Ключевые навыки</Text>
      
      <Group gap="xs" mb="sm" wrap="wrap">
        {skills.map(skill => (
          <Pill key={skill} withRemoveButton onRemove={() => handleRemove(skill)}>
            {skill}
          </Pill>
        ))}
      </Group>

      <Group gap="xs">
        <TextInput 
          placeholder="Навык"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          style={{ flex: 1 }}
        />
        <ActionIcon size="md" onClick={handleAdd}>
          +
        </ActionIcon>
      </Group>
    </>
)
}