import { GetItems } from '@/api/api';
import { ItemPreview, ItemType } from '@/api/models';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ActionFactory } from '@/factory/action-factory';
import { useHistory } from '@/hooks/use-history';
import { cn } from '@/lib/utils';
import { createDefaultNode } from '@/utils/node-payload';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useReactFlow } from '@xyflow/react';
import { ChevronsUpDown } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { ModifiedItemPreview } from './nav-submenu';

type Option = {
  key: string;
  value: string;
  label: string;
  disabled: boolean,
};

interface VirtualizedCommandProps {
  options: Option[];
  placeholder: string;
  onSelectOption?: (option: string) => void;
}

const VirtualizedCommand = ({
  options,
  placeholder,
  onSelectOption,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isKeyboardNavActive, setIsKeyboardNavActive] = useState(false);

  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  const scrollToIndex = (index: number) => {
    virtualizer.scrollToIndex(index, {
      align: 'center',
    });
  };

  const handleSearch = (search: string) => {
    setIsKeyboardNavActive(false);
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        setIsKeyboardNavActive(true);
        setFocusedIndex((prev) => {
          const newIndex = prev === -1 ? 0 : Math.min(prev + 1, filteredOptions.length - 1);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        setIsKeyboardNavActive(true);
        setFocusedIndex((prev) => {
          const newIndex = prev === -1 ? filteredOptions.length - 1 : Math.max(prev - 1, 0);
          scrollToIndex(newIndex);
          return newIndex;
        });
        break;
      }
      case 'Enter': {
        event.preventDefault();
        if (filteredOptions[focusedIndex] && !filteredOptions[focusedIndex].disabled) {
          onSelectOption?.(filteredOptions[focusedIndex].value);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <Command
      shouldFilter={false}
      onKeyDown={handleKeyDown}
      filter={(value, search) => {
        if (value.toLowerCase().includes(search.toLowerCase())) return 1;
        return 0;
      }}
    >
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandList
        ref={parentRef}
        style={{
          width: '100%',
          overflow: 'auto',
        }}
        onMouseDown={() => setIsKeyboardNavActive(false)}
        onMouseMove={() => setIsKeyboardNavActive(false)}
      >
        <CommandEmpty>No item found.</CommandEmpty>
        <CommandGroup>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualOptions.map((virtualOption) => (
              <CommandItem
                ref={virtualizer.measureElement}
                data-index={virtualOption.index}
                key={filteredOptions[virtualOption.index].key}
                disabled={filteredOptions[virtualOption.index].disabled}
                className={cn(
                  'absolute left-0 top-0 w-full bg-transparent',
                  filteredOptions[virtualOption.index].disabled && 'text-xs',
                  filteredOptions[virtualOption.index].disabled && virtualOption.index !== 0 && 'pt-4',
                  focusedIndex === virtualOption.index && !filteredOptions[virtualOption.index].disabled && 'bg-accent text-accent-foreground',
                  isKeyboardNavActive &&
                    focusedIndex !== virtualOption.index &&
                    'aria-selected:bg-transparent aria-selected:text-primary',
                )}
                style={{
                  transform: `translateY(${virtualOption.start}px)`,
                  position: 'absolute',
                }}
                value={filteredOptions[virtualOption.index].value}
                onMouseEnter={() => !isKeyboardNavActive && setFocusedIndex(virtualOption.index)}
                onMouseLeave={() => !isKeyboardNavActive && setFocusedIndex(-1)}
                onSelect={onSelectOption}
              >
                {filteredOptions[virtualOption.index].label}
              </CommandItem>
            ))}
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

interface VirtualizedComboboxProps {
  api: ItemType,
  singular: string,
  options: ModifiedItemPreview[];
  searchPlaceholder?: string;
  width?: string;
}

export function VirtualizedCombobox({
  api,
  singular,
  options,
  searchPlaceholder = 'Search items...',
  width = '254px',
}: VirtualizedComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { addNodes, deleteElements } = useReactFlow();
  const appendAction = useHistory((state) => state.appendAction);

  const selectedItem = options.find((option) => option.id === selectedOption);

  const addItem = useCallback(async () => {

    if(selectedOption === "")
        return;

    const items = await GetItems(api, [selectedOption]);
    items.forEach(element => {
        const newNode = createDefaultNode(element, api);
        addNodes(newNode);
        const action = ActionFactory.Create(
            () => {
                const id = newNode.id;
                deleteElements({ nodes: [{ id: id }]});
                toast.dismiss();
            },
            () => {
                addNodes(newNode);  
            }
        );
        appendAction(action);
    });
  
  }, [selectedOption]);

  return (
    <div className="py-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between overflow-hidden"
            style={{ width }}
          >
            <span 
              className={cn(
                "truncate opacity-50 font-normal",
                selectedOption !== "" && "opacity-100",
              )}
            >
              {selectedItem
                ? `${selectedItem.brand} ${selectedItem.name}`
                : searchPlaceholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[254px] p-0" style={{ width }}>
          <VirtualizedCommand
            options={options.map((option) => ({
              key: option.id,
              value: option.id,
              label: `${option.brand} ${option.name}`,
              disabled: option.disabled,
            }))}
            placeholder={searchPlaceholder}
            onSelectOption={(currentValue) => {
              setSelectedOption(currentValue === selectedOption ? '' : currentValue);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <Button variant="outline" className="mt-1 mb-1 w-[254px] mt-2" onClick={addItem}>Add {singular}</Button>
    </div>
  );
}
