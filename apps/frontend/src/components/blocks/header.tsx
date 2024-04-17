import {
  CircleUser,
  CreditCard,
  FolderArchive,
  Key,
  LogOut,
  Package,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/modeToggle.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

interface HeaderProps {
  highlighted?: string; // Assuming highlightColor is a string
}

export function Header({ highlighted }: HeaderProps) {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  useEffect(() => {
    const redirect = async () => {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        await loginWithRedirect({
          appState: {
            returnTo: location.pathname,
          },
        });
      }
    };
    if (!isLoading && isAuthenticated) {
      redirect().then();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading, loginWithRedirect]);

  const handleLogin = () => {
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    });
  };

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex flex-col items-center gap-4 bg-blue-900">
        <div className="h-20 w-full flex items-center justify-center border-b-4 border-yellow-500 px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap- md:text-md lg:gap-6 text-nowrap">
            <a
              href=""
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <img src={Logo} alt={"brigham logo"} className={"w-10"} />
              <Package className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <div className={"flex w-full items-center justify-end gap-4 pr-4"}>
              {!isLoading && isAuthenticated && (
                <>
                  <a
                    href="/home"
                    className={`transition-colors hover:text-yellow-500 text-gray-300 ${highlighted === "/home" ? "text-yellow-500 " : "text-gray-300"}`}
                  >
                    Home
                  </a>
                  <a
                    href="/service-requests"
                    className={`transition-colors hover:text-yellow-500 text-gray-300 ${highlighted === "/service-requests" ? "text-yellow-500 " : "text-gray-300"}`}
                  >
                    Service Requests
                  </a>
                  <a
                    href="/csv-table"
                    className={`transition-colors hover:text-yellow-500 text-gray-300 ${highlighted === "/csv-table" ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    CSV Table
                  </a>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`transition-colors hover:text-yellow-500 text-gray-300 ${highlighted === "/map-editor" ? "text-yellow-500" : "text-gray-300"}`}
                      >
                        Map Editor
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-36">
                      <DropdownMenuLabel>Editor View</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = "/map-editor/map")
                          }
                        >
                          Map View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = "/map-editor/table")
                          }
                        >
                          Table View
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
              <a
                href="/about-us"
                className={`transition-colors hover:text-yellow-500 text-gray-300 ${highlighted === "/about-us" ? "text-yellow-500" : "text-gray-300"}`}
              >
                About Us
              </a>
            </div>
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
                  href="/home"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src={Logo} alt={"brigham logo"} className={"w-10"} />

                  <span className="sr-only">Home</span>
                </a>
                <a
                  href="/service-requests"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Service Requests
                </a>
                <a
                  href="/about-us"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
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
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2  lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search ..."
                  className="pl-8 sm:w-[300px] md:w-[300px] lg:w-[300px]"
                />
              </div>
            </form>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary" // CHANGE THIS TO MAKE THE COLOR RIGHT?
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  {!isLoading && isAuthenticated && (
                    <DropdownMenuItem
                      onClick={() => {
                        window.location.href = "/request-log-Page";
                      }}
                    >
                      <FolderArchive className="mr-2 h-4 w-4" />
                      <span>Request Logs</span>
                      <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Switch Account</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={handleLogin}>
                          <Key className="mr-2 h-4 w-4" />
                          <span>Admin</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogin}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Employee</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}
