import "../styles/example.route.css";
import "../styles/globals.css";
import WPI_Logo from "@/assets/WPI_Logo.png";
import { Separator } from "@/components/ui/separator.tsx";
import CreditBlock from "@/components/blocks/CreditBlock.tsx";

// import wongAsters from "@/assets/wongSunFlower.png";
// import wongSunflower from "@/assets/wongAsters.png";

const CreditsPage = () => {
  return (
    <div>
      <div className=" w-5/6 pt-10 pb-5 gap-5 m-auto">
        <h1 className="text-2xl font-bold my-2 text-center">
          Tools and Libraries Used
        </h1>

        <Separator></Separator>
        <CreditBlock Tool={"GitHub"} Link={"github.com"}>
          This was used as the primary version control software.
        </CreditBlock>

        <h6 style={{ textAlign: "center", marginTop: "75px" }}>
          WPI Computer Science Department, CS3733-D24 Software Engineering
        </h6>
        <h4 className={"text-center text-md text-muted-foreground"}>
          This application was developed by a team of students at Worcester
          Polytechnic Institute as part of the CS3733-D24 Software Engineering
          course. The team was led by Professor Wilson Wong and Team Coach Ari
          Schechter and Katy Stuparu.
        </h4>
        <h6 style={{ textAlign: "center", marginTop: "20px" }}>
          ©The Brigham & Women’s Hospital maps and data used in this
          application are copyrighted and provided for the sole use of
          educational purposes.
        </h6>
        <div className={"logo-container"}>
          <img src={WPI_Logo} alt="WPI Logo" style={{ maxWidth: "150px" }} />
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
