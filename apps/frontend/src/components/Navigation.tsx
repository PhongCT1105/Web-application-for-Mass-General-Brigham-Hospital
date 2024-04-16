import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { useAuth0 } from "@auth0/auth0-react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Popover } from "@/components/ui/popover";
import { Avatar } from "@/components/ui/avatar";
import { ExitIcon } from "@radix-ui/react-icons"; // Assuming these are correctly imported

export function Navigation() {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    logout,
  } = useAuth0();
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const fun = async () => {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        await loginWithRedirect({
          appState: {
            returnTo: window.location.pathname,
          },
        });
      }
    };
    if (!isLoading && isAuthenticated) {
      fun();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading, loginWithRedirect]);

  const handleLogin = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
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

  const handleProfileMenuOpen = (event: React.MouseEvent<SVGElement>) => {
    setProfileMenuAnchor(event.currentTarget as unknown as HTMLElement);
  };

  // const handleProfileMenuClose = () => {
  //     setProfileMenuAnchor(null);
  // };

  return (
    <NavigationMenu
      style={{ backgroundColor: "#012D5A" }}
      className="p-2 justify-content-around"
    >
      {!isAuthenticated && (
        <NavigationMenu
          style={{ color: "white" }}
          className="ml-4"
          onClick={handleLogin}
        ></NavigationMenu>
      )}
      {isAuthenticated && (
        <>
          <ExitIcon
            color="inherit"
            onClick={handleProfileMenuOpen}
            style={{ fontSize: "0.9rem" }}
          />
          <Popover open={Boolean(profileMenuAnchor)}>
            <Avatar className="ml-2" />
            <NavigationMenu
              style={{ color: "white" }}
              className="ml-4"
              onClick={handleLogout}
            >
              Logout
            </NavigationMenu>
          </Popover>
        </>
      )}
    </NavigationMenu>
  );
}
