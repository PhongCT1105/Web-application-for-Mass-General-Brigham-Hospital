import "../../styles/globals.css";
import Logo from "@/assets/brighamJlogo.png";
import { ChevronRight } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { InstructionsLink } from "@/routes/InstructionsPage.tsx";
export function Footer() {
  const {
    // loginWithRedirect,
    isAuthenticated,
    isLoading,
    // getAccessTokenSilently,
    // logout,
  } = useAuth0();
  return (
    <>
      <footer className=" text-black  w-full" style={{ background: "#F1F1F1" }}>
        <InstructionsLink className=" absolute right-0 " location={""} />
        <div className=" mx-4 flex flex-col lg:flex-row items-start justify-between text-lg font-medium py-4">
          <div className="flex items-end mb-4 lg:mb-0">
            <a href="" className="flex items-center gap-2 md:text-base">
              <img src={Logo} alt={"brigham logo"} className={"w-10"} />
            </a>

            {/*<p className="ml-2 text-sm">*/}
            {/*  © 2024 Company Name. All rights reserved.*/}
            {/*</p>*/}
          </div>
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap- md:text-md lg:gap-6 text-nowrap">
            {/*className="hidden flex-col gap-4 text-base font-medium md:flex md:flex-row md:items-center md:gap- md:text-md lg:gap-6 text-nowrap">*/}
            <div
              className={
                "flex w-min items-left justify-end gap-16 pr-4 text-nowrap"
              }
            >
              {!isLoading && isAuthenticated && (
                <>
                  <a
                    href="/home"
                    className={`transition-colors hover:text-blue-900  ${location.pathname === "/home" ? "text-yellow-500 " : "text-black"}`}
                  >
                    Navigation
                  </a>
                  <div className={"flex flex-col"}>
                    <div
                      className={`transition-colors ${location.pathname === "/service-requests" ? "text-yellow-500" : "text-black"}`}
                    >
                      Map Editor
                    </div>
                    <a
                      href="/map-editor/map"
                      className={`transition-colors hover:text-blue-900 flex ${location.pathname === "/insight" ? "text-yellow-500" : "text-black"}`}
                    >
                      <ChevronRight className={" h-auto "} />
                      Map View
                    </a>
                    <a
                      href="/map-editor/table"
                      className={`transition-colors hover:text-blue-900 flex ${location.pathname === "/request-log-Page" ? "text-yellow-500" : "text-black"}`}
                    >
                      <ChevronRight className={" h-auto "} />
                      Table View
                    </a>
                  </div>
                  <div className={"flex flex-col"}>
                    <a
                      href="/service-requests"
                      className={`transition-colors hover:text-blue-900  ${location.pathname === "/service-requests" ? "text-yellow-500" : "text-black"}`}
                    >
                      Service Requests
                    </a>
                    <a
                      href="/insight"
                      className={`transition-colors hover:text-blue-900 flex ${location.pathname === "/insight" ? "text-yellow-500" : "text-black"}`}
                    >
                      <ChevronRight className={" h-auto "} />
                      Insight
                    </a>
                    <a
                      href="/request-log-Page"
                      className={`transition-colors hover:text-blue-900 flex ${location.pathname === "/request-log-Page" ? "text-yellow-500" : "text-black"}`}
                    >
                      <ChevronRight className={" h-auto "} />
                      Request Logs
                    </a>
                  </div>
                  <a
                    href="/csv-table"
                    className={`transition-colors hover:text-blue-900  ${location.pathname === "/csv-table" ? "text-yellow-500" : "text-black"}`}
                  >
                    CSV Table
                  </a>
                </>
              )}
            </div>
          </nav>
          {/*<nav>*/}
          {/*    <a*/}
          {/*        href="/home"*/}
          {/*        className={"transition-colors hover:text-blue text-black "}*/}
          {/*    >*/}
          {/*        Home*/}
          {/*    </a>*/}
          {/*    <a*/}
          {/*        href="/service-requests"*/}
          {/*        className={"transition-colors hover:text-blue-900 text-black "}*/}
          {/*    >*/}
          {/*        Service Requests*/}
          {/*    </a>*/}
          {/*    <a*/}
          {/*        href="/csv-table"*/}
          {/*        className={"transition-colors hover:text-blue-900 text-black "}*/}
          {/*    >*/}
          {/*        CSV Table*/}
          {/*    </a>*/}
          {/*    <a*/}
          {/*        href="/map-editor"*/}
          {/*        className={"transition-colors hover:text-blue-900 text-black "}*/}
          {/*    >*/}
          {/*        Map Editor*/}
          {/*    </a>*/}
          {/*    <a*/}
          {/*        href="/about-us"*/}
          {/*        className={"transition-colors hover:text-blue-900 text-black "}*/}
          {/*    >*/}
          {/*        About Us*/}
          {/*    </a>*/}
          {/*</nav>*/}
          <div className="">
            <p>About the developers</p>
            <ul className="flex space-x-4 mt-2">
              <li className={"flex flex-col"}>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Phong Cao
                </a>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Alexander Kraemling
                </a>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Henry Solomon
                </a>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Mina Boktor
                </a>
              </li>
              <li className={"flex flex-col"}>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Trang Tran
                </a>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Alexander Shettler
                </a>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Alexsandra Antoski
                </a>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Tracy Yang
                </a>
              </li>
              <li className={"flex flex-col"}>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Alexander Lap
                </a>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  June Whittall
                </a>
                <a
                  href="/about-us"
                  className="text-gray-500 hover:text-blue-900"
                >
                  Owen Lacey
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
