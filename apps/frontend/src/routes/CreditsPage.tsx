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
        <CreditBlock Tool={"Figma"} Link={"https://www.figma.com/"}>
          Figma was used to design the color scheme and initial page layouts for
          the site.
        </CreditBlock>
        <CreditBlock Tool={"ShadCN"} Link={"https://ui.shadcn.com/"}>
          ShadCN is the UI framework we used for all of our basic components.
        </CreditBlock>
        <CreditBlock Tool={"TailwindCSS"} Link={"https://tailwindcss.com/"}>
          TailwindCSS is the CSS style framework used with ShadCN to style
          components.
        </CreditBlock>
        <CreditBlock Tool={"Yarn"} Link={"https://yarnpkg.com/"}>
          Yarn is the package manager we used to compile and run our project.
        </CreditBlock>
        <CreditBlock Tool={"NodeJS"} Link={"https://nodejs.org/en"}>
          Node JS is the runtime environment we used.
        </CreditBlock>
        <CreditBlock Tool={"PrismaORM"} Link={"https://www.prisma.io/"}>
          Prisma ORM is the database interface we use to work with the database.
        </CreditBlock>
        <CreditBlock Tool={"PostgreSQL"} Link={"https://www.postgresql.org/"}>
          PostgreSQL is the database provider we use for the backend database.
        </CreditBlock>
        <CreditBlock Tool={"Auth0"} Link={"https://auth0.com/"}>
          Auth0 is the login interface we use.
        </CreditBlock>
        <CreditBlock
          Tool={"WebStorm"}
          Link={"https://www.jetbrains.com/webstorm/"}
        >
          WebStorm is the IDE we use to write and run code.
        </CreditBlock>
        <CreditBlock Tool={"Taiga"} Link={"https://tree.taiga.io/"}>
          Taiga is the project tracking software we use.
        </CreditBlock>
        <CreditBlock Tool={"GitHub"} Link={"https://github.com"}>
          GitHub is the version control software we are using.
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
