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
      <div className="container relative hidden h-[700px]    flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col  text-white lg:flex dark:border-r">
          <div className="absolute inset-0 " />
          <div className="relative z-20 flex items-center text-2xl font-medium">
            <div className="w-[50vw] h-[750px] scale-y-125">
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
                <img src={wongDesk} alt="Wong Desk" className={"mt-[58px]"} />
              </AspectRatio>
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg"></p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full -mt-20 flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <h1 className="">
                Create an account
                <LoginBlock />
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our terms and policies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
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
