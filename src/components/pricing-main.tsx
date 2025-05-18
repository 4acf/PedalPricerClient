import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { Node, useReactFlow } from "@xyflow/react";
import { formalizeItemType, toUSD } from "@/utils/string-formatting";
import { Checkbox } from "./ui/checkbox";
import { useFlowStore } from "@/hooks/use-flow-store";
import { useCallback } from "react";
import { ItemNodeData } from "@/utils/item-node-data";

export function PricingMain() {

    const { getNodes } = useReactFlow();
    const setNodes = useFlowStore((state) => state.setNodes);

    const handleChecked = useCallback((id: string, include: boolean) => {
        setNodes((nds) =>
            nds.map((node) => {
                if(node.id === id){
                    return {
                    ...node,
                    data: {
                        ...node.data,
                        include: !include,
                    },
                    };
                }
                return node;
            }),
        );
    }, [setNodes]);

    const nodes = getNodes() as Node<ItemNodeData>[];
    let total: number = 0;
    for(let node of nodes){
        if(node.data.include)
            total += node.data.price;
    }

    return (
        <>
            <SheetHeader>
                <SheetTitle>Pricing</SheetTitle>
                <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="px-5 overflow-auto">
                <Table>
                    <TableCaption className="sticky bottom-0 bg-background pt-2">{nodes.length === 0 ? "No results." : "Your pricing information."}</TableCaption>
                    <TableHeader className="sticky top-0 bg-background">
                        <TableRow>
                            <TableHead>Include</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {nodes.map((node) => (
                            <TableRow key={node.id}>
                                <TableCell>
                                    <Checkbox checked={node.data.include} onCheckedChange={() => handleChecked(node.id, node.data.include)}/>
                                </TableCell>
                                <TableCell>{formalizeItemType(node.data.itemType)}</TableCell>
                                <TableCell className="whitespace-normal break-words">{node.data.item.brand} {node.data.item.name}</TableCell>
                                <TableCell className="text-right">{toUSD(node.data.price)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <SheetFooter>
                <SheetTitle className="text-2xl">Total: {toUSD(total)}</SheetTitle>
            </SheetFooter>
        </>
    )
}