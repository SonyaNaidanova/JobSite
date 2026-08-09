import { TextInput, Button, Group } from "@mantine/core";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <Group gap="xs" style={{ width: '100%' }}>
      <TextInput 
        placeholder="Должность, компания" 
        size="md" 
        radius="md" 
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        style={{ flex: 1 }} 
        styles={{
          input: {
            backgroundColor: '#F6F6F7', 
            border: '1px solid #E9ECEF',
          }
        }}
      />   
      <Button size="md" radius="md">
        Найти
      </Button>
    </Group>
  );
}