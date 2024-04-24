import {
  ChevronDown,
  // CircleUser,
  // CreditCard,
  EditIcon,
  // LogOut,
  // FolderArchive,
  // Key,
  // LogOut,
  MapIcon,
  Search,
  // Settings,
  // User,
  // Users,
} from "lucide-react";
import "../../styles/globals.css";

import { Button } from "@/components/ui/button";
import Logo from "@/assets/brighamJlogo.png";
import WordLogo from "@/assets/brighamLogo.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuPortal,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/modeToggle.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchList } from "@/components/blocks/searchList.ts";

export function Header() {
  const location = useLocation();

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<
    { mainTitle: string; alternativeTitles: string[]; url: string }[]
  >([]);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    const searchResults = searchList.filter(
      (item) =>
        item.mainTitle.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.alternativeTitles.some((altTitle) =>
          altTitle.toLowerCase().includes(inputValue.toLowerCase()),
        ),
    );

    setResults(searchResults);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setResults([]); // Close the dropdown
    }
  };

  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    logout,
  } = useAuth0();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
      const token = await getAccessTokenSilently();
      console.log(token);
    } catch (error) {
      console.error(error);
    }
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
      <header
        className="sticky top-0 flex flex-col items-center -gap-4 bg-blue-900"
        style={{ zIndex: 1000 }}
      >
        <div
          className="h-20 w-full flex items-center justify-center border-b-4 border-yellow-500 px-4 md:px-6 text-nowrap"
          style={{ zIndex: 1000 }}
        >
          <nav
            className="hidden flex-col gap-6 text-base font-medium md:flex md:flex-row md:items-center md:gap- md:text-md lg:gap-6 text-nowrap"
            style={{ zIndex: 1000 }}
          >
            <div className={"flex w-full items-center gap-4 pr-4 text-nowrap"}>
              {!isLoading && isAuthenticated ? (
                <>
                  <a
                    href=""
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                  >
                    <img
                      src={Logo}
                      alt={"brigham logo"}
                      className="min-w-[40px]"
                    />
                  </a>
                  <a
                    href="/home"
                    className={`transition-colors hover:text-yellow-500 text-gray-300 ${
                      location.pathname === "/home"
                        ? "text-yellow-500 "
                        : "text-gray-300"
                    }`}
                  >
                    Navigation
                  </a>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`transition-colors hover:text-yellow-500 text-gray-300 flex ${
                          location.pathname === "/map-editor/map" ||
                          location.pathname === "/map-editor/table"
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        Map Editor
                        <ChevronDown className={" h-auto translate-y-1"} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent style={{ zIndex: 1000 }}>
                      <DropdownMenuLabel>Editor View</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = "/map-editor/table")
                          }
                        >
                          <EditIcon className="mr-2 h-4 w-4" />
                          <span>Table View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = "/map-editor/map")
                          }
                        >
                          <MapIcon className="mr-2 h-4 w-4" />
                          <span>Map View</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`transition-colors hover:text-yellow-500 text-gray-300 flex ${
                          location.pathname === "/service-requests" ||
                          location.pathname === "/request-log-Page" ||
                          location.pathname === "/insight"
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        {location.pathname === "/insight" ? (
                          <>Insight</>
                        ) : location.pathname === "/request-log-Page" ? (
                          <>Request Log</>
                        ) : (
                          <>Service Requests</>
                        )}
                        <ChevronDown className={" h-auto translate-y-1"} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent style={{ zIndex: 1000 }}>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = "/service-requests")
                          }
                        >
                          <span>Service Requests</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => (window.location.href = "/insight")}
                        >
                          <span>Insight</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = "/request-log-Page")
                          }
                        >
                          <span>Request Logs</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <a
                    href="/csv-table"
                    className={`transition-colors hover:text-yellow-500 text-gray-300 ${
                      location.pathname === "/csv-table"
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    CSV Table
                  </a>
                </>
              ) : (
                <>
                  <a
                    href=""
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                  >
                    <img
                      src={WordLogo}
                      alt={"brigham logo"}
                      className="min-w-[300px] pt-[25px]"
                    />
                  </a>
                  <a
                    href="/home"
                    className={`transition-colors hover:text-yellow-500 text-gray-300 ${
                      location.pathname === "/home"
                        ? "text-yellow-500 "
                        : "text-gray-300"
                    }`}
                  >
                    Navigation
                  </a>
                </>
              )}
              <a
                href="/about-us"
                className={`transition-colors hover:text-yellow-500 text-gray-300 ${
                  location.pathname === "/about-us"
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              >
                About Us
              </a>
            </div>
          </nav>

          {/*<nav*/}
          {/*  className="hidden flex-col gap-6 text-base font-medium md:flex md:flex-row md:items-center md:gap- md:text-md lg:gap-6 text-nowrap"*/}
          {/*  style={{ zIndex: 1000 }}>*/}
          {/*    <div*/}
          {/*        className={*/}
          {/*            "flex w-full items-center gap-4 pr-4 text-nowrap"}>*/}
          {/*        {!isLoading && isAuthenticated && (*/}
          {/*            <>*/}
          {/*            <a*/}
          {/*                href=""*/}
          {/*                className="flex items-center gap-2 text-lg font-semibold md:text-base"*/}
          {/*            >*/}
          {/*                <img src={Logo} alt={"brigham logo"} className="min-w-[40px]" /></a>*/}
          {/*                <DropdownMenu>*/}
          {/*                    <DropdownMenuTrigger asChild>*/}
          {/*                        <button*/}
          {/*                            className={`transition-colors hover:text-yellow-500 text-gray-300 flex ${location.pathname === "/map-editor/map" || location.pathname === "/map-editor/table" ? "text-yellow-500" : "text-gray-300"}`}*/}
          {/*                        >*/}
          {/*                            Map Editor*/}
          {/*                            <ChevronDown className={" h-auto translate-y-1"}/>*/}
          {/*                        </button>*/}
          {/*                    </DropdownMenuTrigger>*/}
          {/*                    <DropdownMenuContent style={{zIndex: 1000}}>*/}
          {/*                        <DropdownMenuLabel>Editor View</DropdownMenuLabel>*/}
          {/*                        <DropdownMenuSeparator/>*/}
          {/*                        <DropdownMenuGroup>*/}
          {/*                            <DropdownMenuItem*/}
          {/*                                onClick={() =>*/}
          {/*                                    (window.location.href = "/map-editor/table")*/}
          {/*                                }*/}
          {/*                            >*/}
          {/*                                <EditIcon className="mr-2 h-4 w-4"/>*/}
          {/*                                <span>Table View</span>*/}
          {/*                            </DropdownMenuItem>*/}
          {/*                            <DropdownMenuItem*/}
          {/*                                onClick={() =>*/}
          {/*                                    (window.location.href = "/map-editor/map")*/}
          {/*                                }*/}
          {/*                            >*/}
          {/*                                <MapIcon className="mr-2 h-4 w-4"/>*/}
          {/*                                <span>Map View</span>*/}
          {/*                            </DropdownMenuItem>*/}
          {/*                        </DropdownMenuGroup>*/}
          {/*                    </DropdownMenuContent>*/}
          {/*                </DropdownMenu>*/}
          {/*                <DropdownMenu>*/}
          {/*                    <DropdownMenuTrigger asChild>*/}
          {/*                        <button*/}
          {/*                            className={`transition-colors hover:text-yellow-500 text-gray-300 flex ${location.pathname === "/service-requests" || location.pathname === "/request-log-Page" || location.pathname === "/insight" ? "text-yellow-500" : "text-gray-300"}`}*/}
          {/*                        >*/}
          {/*                            {location.pathname === "/insight" ? (*/}
          {/*                                <>Insight</>*/}
          {/*                            ) : location.pathname === "/request-log-Page" ? (*/}
          {/*                                <>Request Log</>*/}
          {/*                            ) : (*/}
          {/*                                <>Service Requests</>*/}
          {/*                            )}*/}
          {/*                            <ChevronDown className={" h-auto translate-y-1"}/>*/}
          {/*                        </button>*/}
          {/*                    </DropdownMenuTrigger>*/}
          {/*                    <DropdownMenuContent style={{zIndex: 1000}}>*/}
          {/*                        <DropdownMenuGroup>*/}
          {/*                            <DropdownMenuItem*/}
          {/*                                onClick={() =>*/}
          {/*                                    (window.location.href = "/service-requests")*/}
          {/*                                }*/}
          {/*                            >*/}
          {/*                                <span>Service Requests</span>*/}
          {/*                            </DropdownMenuItem>*/}
          {/*                            <DropdownMenuItem*/}
          {/*                                onClick={() => (window.location.href = "/insight")}*/}
          {/*                            >*/}
          {/*                                <span>Insight</span>*/}
          {/*                            </DropdownMenuItem>*/}
          {/*                            <DropdownMenuItem*/}
          {/*                                onClick={() =>*/}
          {/*                                    (window.location.href = "/request-log-Page")*/}
          {/*                                }*/}
          {/*                            >*/}
          {/*                                <span>Request Logs</span>*/}
          {/*                            </DropdownMenuItem>*/}
          {/*                        </DropdownMenuGroup>*/}
          {/*                    </DropdownMenuContent>*/}
          {/*                </DropdownMenu>*/}
          {/*                <a*/}
          {/*                    href="/csv-table"*/}
          {/*                    className={`transition-colors hover:text-yellow-500 text-gray-300 ${location.pathname === "/csv-table" ? "text-yellow-500" : "text-gray-300"}`}*/}
          {/*                >*/}
          {/*                    CSV Table*/}
          {/*                </a>*/}
          {/*            </>*/}
          {/*        )}*/}
          {/*        <a*/}
          {/*            href="/home"*/}
          {/*            className={`transition-colors hover:text-yellow-500 text-gray-300 ${location.pathname === "/home" ? "text-yellow-500 " : "text-gray-300"}`}*/}
          {/*        >*/}
          {/*            Navigation*/}
          {/*        </a>*/}
          {/*        <a*/}
          {/*            href="/about-us"*/}
          {/*            className={`transition-colors hover:text-yellow-500 text-gray-300 ${location.pathname === "/about-us" ? "text-yellow-500" : "text-gray-300"}`}*/}
          {/*        >*/}
          {/*            About Us*/}
          {/*        </a>*/}
          {/*    </div>*/}
          {/*</nav>*/}
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
                  href="/request-log-Page"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Request Logs
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
          <div className="flex w-full items-center gap-4">
            <form className="ml-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search ..."
                  className="pl-8 w-[300px]"
                  value={query}
                  onChange={handleSearch}
                />
              </div>
              {results.length > 0 && (
                <ul
                  className="absolute z-[1000] mt-1 w-auto bg-white border border-gray-200 rounded-lg shadow-lg"
                  ref={dropdownRef}
                >
                  {results.slice(0, 5).map(
                    (
                      result,
                      index, // Limiting to 6 results
                    ) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        <a href={result.url}>{result.mainTitle}</a>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </form>

            <ModeToggle />
            {!isLoading && isAuthenticated ? (
              <Button
                className={" w-20"}
                variant="default"
                onClick={handleLogout}
              >
                Log Out
                {/*<LogOut className="mr-2 h-4 w-4 ml-2" />*/}
              </Button>
            ) : (
              <Button
                className={" w-20"}
                variant="default"
                onClick={handleLogin}
              >
                Log In
              </Button>
            )}

            {/*<DropdownMenu>*/}
            {/*  <DropdownMenuTrigger asChild>*/}
            {/*    <Button*/}
            {/*      variant="secondary" // CHANGE THIS TO MAKE THE COLOR RIGHT?*/}
            {/*      size="icon"*/}
            {/*      className="rounded-full"*/}
            {/*    >*/}
            {/*      <CircleUser className="h-5 w-5" />*/}
            {/*      <span className="sr-only">Toggle user menu</span>*/}
            {/*    </Button>*/}
            {/*  </DropdownMenuTrigger>*/}
            {/*  <DropdownMenuContent className="w-56">*/}
            {/*    <DropdownMenuLabel>My Account</DropdownMenuLabel>*/}
            {/*    <DropdownMenuSeparator />*/}
            {/*    <DropdownMenuGroup>*/}
            {/*      <DropdownMenuItem>*/}
            {/*        <User className="mr-2 h-4 w-4" />*/}
            {/*        <span>Profile</span>*/}
            {/*        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
            {/*      </DropdownMenuItem>*/}
            {/*      <DropdownMenuItem>*/}
            {/*        <CreditCard className="mr-2 h-4 w-4" />*/}
            {/*        <span>Billing</span>*/}
            {/*        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>*/}
            {/*      </DropdownMenuItem>*/}
            {/*      <DropdownMenuItem>*/}
            {/*        <Settings className="mr-2 h-4 w-4" />*/}
            {/*        <span>Settings</span>*/}
            {/*        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
            {/*      </DropdownMenuItem>*/}
            {/*      {!isLoading && isAuthenticated && (*/}
            {/*        <DropdownMenuItem*/}
            {/*          onClick={() => {*/}
            {/*            window.location.href = "/request-log-Page";*/}
            {/*          }}*/}
            {/*        >*/}
            {/*          <FolderArchive className="mr-2 h-4 w-4" />*/}
            {/*          <span>Request Logs</span>*/}
            {/*          <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>*/}
            {/*        </DropdownMenuItem>*/}
            {/*      )}*/}
            {/*    </DropdownMenuGroup>*/}
            {/*    <DropdownMenuSeparator />*/}
            {/*    <DropdownMenuGroup>*/}
            {/*      <DropdownMenuSub>*/}
            {/*        <DropdownMenuSubTrigger>*/}
            {/*          <Users className="mr-2 h-4 w-4" />*/}
            {/*          <span>Switch Account</span>*/}
            {/*        </DropdownMenuSubTrigger>*/}
            {/*        <DropdownMenuPortal>*/}
            {/*          <DropdownMenuSubContent>*/}
            {/*            <DropdownMenuItem onClick={handleLogin}>*/}
            {/*              <Key className="mr-2 h-4 w-4" />*/}
            {/*              <span>Admin</span>*/}
            {/*            </DropdownMenuItem>*/}
            {/*            <DropdownMenuItem onClick={handleLogin}>*/}
            {/*              <User className="mr-2 h-4 w-4" />*/}
            {/*              <span>Employee</span>*/}
            {/*            </DropdownMenuItem>*/}
            {/*          </DropdownMenuSubContent>*/}
            {/*        </DropdownMenuPortal>*/}
            {/*      </DropdownMenuSub>*/}
            {/*    </DropdownMenuGroup>*/}
            {/*    <DropdownMenuSeparator />*/}
            {/*    <DropdownMenuItem onClick={handleLogout}>*/}
            {/*      <LogOut className="mr-2 h-4 w-4" />*/}
            {/*      <span>Log out</span>*/}
            {/*      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
            {/*    </DropdownMenuItem>*/}
            {/*  </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}
          </div>
        </div>
      </header>
    </div>
  );
}
