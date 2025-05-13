import { baseUrl, ItemType } from "@/api/constants";
import { Item } from "@/api/models";
import { INCH } from "@/utils/constants";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Node, useOnSelectionChange, useReactFlow } from "@xyflow/react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "./ui/context-menu";
import { convertItemToNodePayload } from "@/utils/node-payload";
import { toUSD } from "@/utils/string-formatting";

type ItemNodeProps = {
    itemType: ItemType,
    item: Item,
    price: number,
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
}

export function ItemNode({ id, data, selected, } : { id: string, data: ItemNodeProps, selected: boolean, }) {

    const { getNodes, addNodes, deleteElements } = useReactFlow();

    //rotation logic
    const [rotation, setRotation] = useState<number>(0);
    const rotateItem = useCallback((clockwise: boolean) => {
        if(rotation % 90 != 0)
            setRotation(0)
        else{
            const direction: number = clockwise ? 1 : -1;
            setRotation(rotation + (90 * direction));
        }
    }, [rotation]);

    //deletion logic
    const deleteItem = useCallback(() => {
        deleteElements({ nodes: [{ id: id }]});
        toast.dismiss();
    }, [id]);

    //duplication logic
    const duplicateItem = useCallback(() => {
        const nodes = getNodes();
        const position = nodes.find(n => n.id === id)?.position;  
        addNodes(convertItemToNodePayload(data.item, data.itemType, position));
    }, [data]);
    
    //arrangement logic
    const moveToFront = useCallback(() => {
        data.setNodes((nodes) => {
            const node = nodes.find(n => n.id === id);
            if (!node) return nodes;
            const others = nodes.filter(n => n.id !== id);
            return [...others, node];
        });
    }, [id]);

    const moveToBack = useCallback(() => {
        data.setNodes((nodes) => {
            const node = nodes.find(n => n.id === id);
            if (!node) return nodes;
            const others = nodes.filter(n => n.id !== id);
            return [node, ...others];
        });
    }, [id]);

    //toast config
    const onChange = useCallback(() => {
        toast.dismiss();
    }, []);

    useOnSelectionChange({
        onChange,
    });

    //keypress listeners
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selected) 
                return;
            switch(e.key){
                case 'e':
                case 'E':
                    rotateItem(true);
                    break;
                case 'q':
                case 'Q':
                    rotateItem(false);
                    break;
                case 'Delete':
                    deleteItem();
                    break;
                case 'd':
                case 'D':
                    duplicateItem();
                    break;
                case 'w':
                case 'W':
                    moveToFront();
                    break;
                case 's':
                case 'S':
                    moveToBack();
                    break;         
                default:
                    return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selected, rotateItem]);

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
                                    <p className="text-sm">{`Price: ${toUSD(data.price)}`}</p>
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
                <ContextMenuItem onMouseUp={() => rotateItem(true)}>
                    Rotate Clockwise
                    <ContextMenuShortcut>E</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onMouseUp={() => rotateItem(false)}>
                    Rotate Counter-Clockwise
                    <ContextMenuShortcut>Q</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onMouseUp={deleteItem}>
                    Delete
                    <ContextMenuShortcut>&#x232B;</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onMouseUp={duplicateItem}>
                    Duplicate
                    <ContextMenuShortcut>D</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onMouseUp={moveToFront}>
                    Move to Front
                    <ContextMenuShortcut>W</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onMouseUp={moveToBack}>
                    Move to Back
                    <ContextMenuShortcut>S</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )

}