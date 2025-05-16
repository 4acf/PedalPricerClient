import { Button } from "./ui/button";
import { SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";

export function AboutMain() {
    return (
        <>
            <SheetHeader>
                <SheetTitle>About</SheetTitle>
            </SheetHeader>
            <div className="px-6 py-10 max-w-3xl mx-auto space-y-10 text-pretty overflow-auto">

                <div className="relative pl-4 border-l-2 border-(--accent)">
                    <h1 className="text-xl font-bold">Welcome to <b>pedalpricer.com,</b></h1>
                    <p className="mt-2">
                        a website for guitar players (or any musicians really) to design and budget effects pedalboards! This is my second iteration of the site, which was (and still is) a clone of pedalplayground.com I made to teach myself web development.
                    </p>
                </div>

                <div className="relative pl-4 border-l-2 border-(--accent)">
                    <h1 className="text-xl font-bold">Version 1</h1>
                    <p className="mt-2">
                        Version 1, which is no longer available, was not very good. The code was messy and hard to maintain. The user interface was ok, but it was not responsive. The server code was outdated and in need of a rewrite. For these reasons, I decided to make this new version 
                    </p>
                </div>

                <div className="relative pl-4 border-l-2 border-(--accent)">
                    <h1 className="text-xl font-bold">Improvements</h1>
                    <p className="mt-2">
                        This version includes a few crucial improvements: a configurable and responsive UI, better pricing controls, and an improved canvas for your pedalboard designs. 
                    </p>
                </div>

                <div className="relative pl-4 border-l-2 border-(--accent)">
                    <h1 className="text-xl font-bold">Data Set</h1>
                    <p className="mt-2">
                        The site makes use of pedalplayground.com's public data set. For this reason, this site is not monetized and will always be free to use.
                    </p>
                </div>

            </div>
            <SheetFooter className="items-center">
                <form action="https://github.com/4acf/PedalPricerClient" target="_blank">
                    <Button variant="outline" className="cursor-pointer">
                        View source code on GitHub
                    </Button>
                </form>
            </SheetFooter>
        </>
    )
}