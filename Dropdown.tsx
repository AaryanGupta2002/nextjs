//Nextjs/corrtn/src/components/Dropdown.tsx
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
  } from "@/components/ui/select";
  
  type DropdownProps = {
    label: string;
    options: string[];
    onChange: (value: string) => void;
  };
  
  export function Dropdown({ label, options, onChange }: DropdownProps) {
    return (
      <div>
        <label>{label}</label>
        <Select onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
  