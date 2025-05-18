import { baseUrl } from "@/api/constants";
import { INCH } from "@/utils/constants";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Node, useOnSelectionChange, useReactFlow } from "@xyflow/react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "./ui/context-menu";
import { createNodeCopy } from "@/utils/node-payload";
import { toUSD } from "@/utils/string-formatting";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useFlowStore } from "@/hooks/use-flow-store";
import { ItemNodeData } from "@/utils/item-node-data";
import { useDisplayConfig } from "@/hooks/use-display-config";
import { ActionFactory } from "@/factory/action-factory";
import { useHistory } from "@/hooks/use-history";

export function ItemNode({ id, data, selected, } : { id: string, data: ItemNodeData, selected: boolean, }) {

    const { getNodes, addNodes, deleteElements } = useReactFlow();
    const setNodes = useFlowStore((state) => state.setNodes);
    const [rotation, setRotation] = useState<number>(data.rotation);
    const [price, setPrice] = useState<number>(data.price);
    const itemBorders = useDisplayConfig((state) => state.itemBorders);
    const infoCards = useDisplayConfig((state) => state.infoCards);
    const contextMenus = useDisplayConfig((state) => state.contextMenus);
    const { appendAction } = useHistory();

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if(node.id === id){
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            price: price,
                            rotation: rotation,
                        },
                    };
                }
                return node;
            }),
        );
    }, [price, rotation, setNodes]);

    //rotation logic
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

        const nodes = getNodes() as Node<ItemNodeData>[];
        const node = nodes.find(n => n.id === id);

        deleteElements({ nodes: [{ id: id }]});
        toast.dismiss();

        let newID = "";
        if(!node)
            return;
        const newNode = createNodeCopy(node);
        newID = newNode.id;

        const action = ActionFactory.Create(
            () => {        
                addNodes(newNode);  
            },
            () => {
                deleteElements({ nodes: [{ id: newID }]});
                toast.dismiss();
            }
        );
        appendAction(action);

    }, [id]);

    //duplication logic
    const duplicateItem = useCallback(() => {
        const nodes = getNodes() as Node<ItemNodeData>[];
        const node = nodes.find(n => n.id === id);
        if(!node)
            return;  
        const newNode = createNodeCopy(node);
        addNodes(newNode);

        const action = ActionFactory.Create(
            () => {        
                deleteElements({ nodes: [{ id: newNode.id }]});
                toast.dismiss();
            },
            () => {
                addNodes(newNode);  
            }
        );
        appendAction(action);

    }, [data]);
    
    //arrangement logic
    const moveToFront = useCallback(() => {
        setNodes((nodes) => {
            const node = nodes.find(n => n.id === id);
            if (!node) return nodes;
            const others = nodes.filter(n => n.id !== id);
            return [...others, node];
        });
    }, [id]);

    const moveToBack = useCallback(() => {
        setNodes((nodes) => {
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

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const sanitized = input.replace(/[$,]/g, "");
        const isValidCurrency = /^\d+(\.\d{0,2})?$/.test(sanitized)
        if(isValidCurrency && sanitized !== ""){
            setPrice(parseFloat(input));
        }
    }

    const item = data.item;

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    className={clsx(
                        'border rounded transition-colors duration-200 p-[2px]',
                        (selected && itemBorders) ? 'border-[#3f85eb]' : 'border-transparent',
                        (selected && itemBorders) ? 'hover:border-[#3f85eb]' : itemBorders && 'hover:border-[rgb(63,133,235,0.5)]',
                    )}
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: '0.3s',
                    }}
                    onClick={() => infoCards && toast(`${item.brand} ${item.name}`, {
                        duration: Infinity,
                        description: (
                            <ul className="flex-row space-y-1 pt-1">
                                <li>
                                    <p className="text-sm">Dimensions: {item.width}in x {item.height}in</p>
                                </li>
                                <li className="flex items-center">
                                    <Label htmlFor="price-input" className="w-14 text-sm">Price:</Label>
                                    <Input 
                                        id="price-input" 
                                        type="number" 
                                        placeholder={toUSD(price)}
                                        onChange={(e) => handlePriceChange(e)}
                                    />
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
            {
                contextMenus && (
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
                )
            }
        </ContextMenu>
    )

}