import React, { useEffect } from "react"; // Import useEffect and useState
import { useAuth0 } from "@auth0/auth0-react";
import { NavigationMenu } from "@/components/ui/navigation-menu";

export function Navigation() {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

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

  // const handleProfileMenuClose = () => {
  //     setProfileMenuAnchor(null);
  // };

  return <NavigationMenu></NavigationMenu>;
}
