import { useState } from 'react';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComboboxProps {
  value: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const Combobox = ({ value, onChange, placeholder, className }: ComboboxProps) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const addTag = (tag: string) => {
    if (tag.trim() && !value.includes(tag)) {
      onChange([...value, tag.trim()]);
    }
    setInputValue('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className={cn(className, 'flex flex-wrap items-center gap-2 border p-2 rounded-md')}>
      {value.map((tag) => (
        <span key={tag} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-md">
          {tag}
          <X className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-500" onClick={() => removeTag(tag)} />
        </span>
      ))}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Add Tag
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-2">
          <Command>
            <CommandInput
              placeholder={placeholder || 'Enter a tag'}
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(inputValue);
                }
              }}
            />
            <CommandList>
              {inputValue && <CommandItem onSelect={() => addTag(inputValue)}>Add "{inputValue}"</CommandItem>}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
