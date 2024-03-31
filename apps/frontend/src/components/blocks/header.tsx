import { CircleUser, Package, Search } from "lucide-react";
import "../../styles/globals.css";

import { Button } from "@/components/ui/button";
import Logo from "@/assets/brighamJlogo.png";

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/modeToggle.tsx";

export function Header() {
  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-md lg:gap-6 text-nowrap">
          <a
            href="/home"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <img src={Logo} alt={"brigham logo"} className={"w-10"} />
            <Package className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
          <a
            href="/home"
            className="text-muted-foreground transition-colors hover:text-foreground "
          >
            Home
          </a>
          <a
            href="https://en.wikipedia.org/wiki/Shrek"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Navigation
          </a>
          <a
            href="/service-requests"
            className="text-muted-foreground transition-colors hover:text-foreground "
          >
            Service Request
          </a>
          <a
            href="/about-us"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About Us
          </a>
        </nav>
        <Sheet>
          <SheetTrigger asChild className={"f"}>
            <Button
              variant="invisible"
              size="icon"
              className="shrink-0 md:hidden hover:accent-white"
            >
              <img src={Logo} alt={"brigham logo"} className={"w-10"} />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <a
                href="https://en.wikipedia.org/wiki/Shrek"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <img src={Logo} alt={"brigham logo"} className={"w-10"} />

                <span className="sr-only">Acme Inc</span>
              </a>
              <a
                href="https://en.wikipedia.org/wiki/Shrek"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </a>
              <a
                href="https://en.wikipedia.org/wiki/Shrek"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </a>
              <a
                href="https://en.wikipedia.org/wiki/Shrek"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </a>
              <a
                href="https://en.wikipedia.org/wiki/Shrek"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </a>
              <a
                href="https://en.wikipedia.org/wiki/Shrek"
                className="hover:text-foreground"
              >
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Home</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Navigation</DropdownMenuItem>
              <DropdownMenuItem>Service Request</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>About Us</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/*                 the rest is all a test page, do not fret  */}

      {/*<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">*/}
      {/*    <div className="mx-auto grid w-full max-w-6xl gap-2">*/}
      {/*        <h1 className="text-3xl font-semibold">Settings</h1>*/}
      {/*    </div>*/}
      {/*    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">*/}
      {/*        <nav className="grid gap-4 text-sm text-muted-foreground">*/}
      {/*            <a href="https://en.wikipedia.org/wiki/Shrek" className="font-semibold text-primary">*/}
      {/*                General*/}
      {/*            </a>*/}
      {/*            <a href="https://en.wikipedia.org/wiki/Shrek">Security</a>*/}
      {/*            <a href="https://en.wikipedia.org/wiki/Shrek">Integrations</a>*/}
      {/*            <a href="https://en.wikipedia.org/wiki/Shrek">Support</a>*/}
      {/*            <a href="https://en.wikipedia.org/wiki/Shrek">Organizations</a>*/}
      {/*            <a href="https://en.wikipedia.org/wiki/Shrek">Advanced</a>*/}
      {/*        </nav>*/}
      {/*        <div className="grid gap-6">*/}
      {/*            <Card>*/}
      {/*                <CardHeader>*/}
      {/*                    <CardTitle>Store Name</CardTitle>*/}
      {/*                    <CardDescription>*/}
      {/*                        Used to identify your store in the marketplace.*/}
      {/*                    </CardDescription>*/}
      {/*                </CardHeader>*/}
      {/*                <CardContent>*/}
      {/*                    <form>*/}
      {/*                        <Input placeholder="Store Name" />*/}
      {/*                    </form>*/}
      {/*                </CardContent>*/}
      {/*                <CardFooter className="border-t px-6 py-4">*/}
      {/*                    <Button>Save</Button>*/}
      {/*                </CardFooter>*/}
      {/*            </Card>*/}
      {/*            <Card>*/}
      {/*                <CardHeader>*/}
      {/*                    <CardTitle>Plugins Directory</CardTitle>*/}
      {/*                    <CardDescription>*/}
      {/*                        The directory within your project, in which your plugins are*/}
      {/*                        located.*/}
      {/*                    </CardDescription>*/}
      {/*                </CardHeader>*/}
      {/*                <CardContent>*/}
      {/*                    <form className="flex flex-col gap-4">*/}
      {/*                        <Input*/}
      {/*                            placeholder="Project Name"*/}
      {/*                            defaultValue="/content/plugins"*/}
      {/*                        />*/}
      {/*                        <div className="flex items-center space-x-2">*/}
      {/*                            <Checkbox id="include" defaultChecked />*/}
      {/*                            <label*/}
      {/*                                htmlFor="include"*/}
      {/*                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
      {/*                            >*/}
      {/*                                Allow administrators to change the directory.*/}
      {/*                            </label>*/}
      {/*                        </div>*/}
      {/*                    </form>*/}
      {/*                </CardContent>*/}
      {/*                <CardFooter className="border-t px-6 py-4">*/}
      {/*                    <Button>Save</Button>*/}
      {/*                </CardFooter>*/}
      {/*            </Card>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</main>*/}
    </div>
  );
}
