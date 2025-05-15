import { useCallback, useState } from "react";
import { SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { useReactFlow } from "@xyflow/react";
import { formalizeItemType, toUSD } from "@/utils/string-formatting";
import { Checkbox } from "./ui/checkbox";

export function PricingMain() {

    const { getNodes } = useReactFlow();

    const nodes = getNodes();
    let total: number = 0;
    for(let node of nodes){
      total += node.data.price;
    }

    return (
        <>
            <SheetHeader>
                <SheetTitle>Pricing</SheetTitle>
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
                                    <Checkbox />
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