import "../styles/example.route.css";
import "../styles/globals.css";
import { Header } from "@/components/blocks/header.tsx";
import { LoginBlock } from "@/components/blocks/loginBlock.tsx";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import wongDesk from "@/assets/wongdesk.png";

export default function LoginPage() {
  return (
    <div className="page">
      <Header />
      <div className="flex">
        <div className="w-[960px] h-[750px]">
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
            <img src={wongDesk} alt="Wong Desk" />
          </AspectRatio>
        </div>
        <div className={"login"} style={{ marginLeft: "180px" }}>
          <LoginBlock />
        </div>
      </div>
    </div>
  );
}
