import { baseUrl, ItemType } from "@/api/constants";
import { Item } from "@/api/models";
import { INCH } from "@/utils/constants";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useOnSelectionChange } from "@xyflow/react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "./ui/context-menu";

type ItemNodeProps = {
    itemType: ItemType,
    item: Item,
}

export function ItemNode({ data, selected } : { data: ItemNodeProps, selected: boolean }) {

    const [rotation, setRotation] = useState<number>(0);
    const rotateItem = () => {
        if(rotation % 90 != 0)
            setRotation(0)
        else
            setRotation(rotation + 90);
    }

    const onChange = useCallback(() => {
        toast.dismiss();
    }, []);

    useOnSelectionChange({
        onChange,
    });

    const item = data.item;

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    className={clsx(
                        'border rounded transition-colors duration-200 p-[2px]',
                        selected ? 'border-[#3f85eb]' : 'border-transparent',
                        selected ? 'hover:border-[#3f85eb]' : 'hover:border-[rgb(63,133,235,0.5)]',
                    )}
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: '0.3s',
                    }}
                    onClick={() => toast(`${item.brand} ${item.name}`, {
                        duration: Infinity,
                        description: (
                            <ul>
                                <li>
                                    <p className="text-sm">Dimensions: {item.width}in x {item.height}in</p>
                                </li>
                                <li>
                                    <p className="text-sm">Price: $ -</p>
                                </li>
                            </ul>
                        ),
                    })}
                >
                    <img 
                        src={`${baseUrl}/${data.itemType}/${item.id}/image`}
                        style={
                            {
                                width: item.width * INCH,
                                height: item.height * INCH,
                            }
                        }
                    />
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onMouseUp={rotateItem}>
                    Rotate
                    <ContextMenuShortcut>R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                    Delete
                    <ContextMenuShortcut>Del</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                    Duplicate
                    <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )

}