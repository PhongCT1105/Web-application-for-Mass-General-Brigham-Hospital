// import "../styles/example.route.css";
// import "../styles/globals.css";
import { Header } from "@/components/blocks/header.tsx";
import { LoginBlock } from "@/components/blocks/loginBlock.tsx";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import wongDesk from "@/assets/wongdesk.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="container relative hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 w-full gap-5">
        <div className="relative hidden h-full flex-col text-white lg:flex dark:border-r">
          <div className="absolute inset-0" />
          <div className="relative z-20 flex items-center text-2xl font-medium">
            <div className="w-[50vw] h-[750px] -mt-2">
              <AspectRatio ratio={16 / 9}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-wong mt-wongoffset">
                    Need Directions?
                  </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-wong2 mt-wongoffset2">
                    Enter a username and password to login!
                  </p>
                </div>
                <img
                  src={wongDesk}
                  alt="Wong Desk"
                  className={"ml-2 rounded"}
                />
              </AspectRatio>
            </div>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <LoginBlock />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// HENRY'S OLD CODE

// return (
//   <div className="page">
//     <Header />
//     <div className="flex">
//       <div className="w-[50vw] h-[750px]">
//         <AspectRatio ratio={16 / 9}>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <p className="text-white text-wong mt-wongoffset">
//               Need Directions?
//             </p>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <p className="text-white text-wong2 mt-wongoffset2">
//               Enter a username and password to login!
//             </p>
//           </div>
//           <img src={wongDesk} alt="Wong Desk" />
//         </AspectRatio>
//       </div>
//       <div className={"login"} style={{ marginLeft: "14vw" }}>
//         <LoginBlock />
//       </div>
//     </div>
//   </div>
