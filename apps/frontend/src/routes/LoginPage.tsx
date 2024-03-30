import "../styles/example.route.css";
import "../styles/globals.css";
// import { ExampleComponent } from "../components/ExampleComponent.tsx";
import { Header } from "@/components/blocks/header.tsx";
import { LoginBlock } from "@/components/blocks/loginBlock.tsx";

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className={"login"}>
        <LoginBlock />
      </div>
    </>
  );
}
