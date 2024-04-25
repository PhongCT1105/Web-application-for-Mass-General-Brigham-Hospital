import "../styles/example.route.css";
import "../styles/globals.css";
import WPI_Logo from "@/assets/WPI_Logo.png";
import Figma from "@/assets/figma.png";
import ShadCN from "@/assets/shadcn.png";
import Tailwind from "@/assets/tailwindcss.png";
import Yarn from "@/assets/yarn.png";
import NodeJS from "@/assets/nodejs.png";
import Prisma from "@/assets/prisma.png";
import PostgreSQL from "@/assets/postgresql.png";
import Auth0 from "@/assets/auth0.png";
import WebStorm from "@/assets/webstorm.png";
import Taiga from "@/assets/taiga.png";
import GitHub from "@/assets/github.png";
import { Separator } from "@/components/ui/separator.tsx";
import CreditBlock from "@/components/blocks/CreditBlock.tsx";

// import wongAsters from "@/assets/wongSunFlower.png";
// import wongSunflower from "@/assets/wongAsters.png";

const CreditsPage = () => {
  return (
    <div>
      <div className=" w-5/6 pt-2 pb-5 gap-5 m-auto">
        <h1 className="text-2xl font-bold my-2 text-center">
          Tools and Libraries Used
        </h1>

        <Separator></Separator>
        <CreditBlock
          Tool={"Figma"}
          Link={"https://www.figma.com/"}
          Imagepath={Figma}
        >
          Figma was used to design the color scheme and initial page layouts for
          the site. We designed most pages and got a first look at the component
          design on Figma so that making the pages would be easier and require
          less trial and error.
        </CreditBlock>
        <CreditBlock
          Tool={"ShadCN"}
          Link={"https://ui.shadcn.com/"}
          Imagepath={ShadCN}
        >
          ShadCN is the UI framework we used for all of our basic components. We
          used this to avoid spending hours creating custom components and
          taking time away from the functionality.
        </CreditBlock>
        <CreditBlock
          Tool={"TailwindCSS"}
          Link={"https://tailwindcss.com/"}
          Imagepath={Tailwind}
        >
          TailwindCSS is the CSS style framework used with ShadCN to style
          components. It allowed us to use a library of styles, simplying the
          CSS side of designing the site and saving time.
        </CreditBlock>
        <CreditBlock
          Tool={"Yarn"}
          Link={"https://yarnpkg.com/"}
          Imagepath={Yarn}
        >
          Yarn is the package manager we used to compile and run our project.
        </CreditBlock>
        <CreditBlock
          Tool={"NodeJS"}
          Link={"https://nodejs.org/en"}
          Imagepath={NodeJS}
        >
          Node JS is the runtime environment we used.
        </CreditBlock>
        <CreditBlock
          Tool={"PrismaORM"}
          Link={"https://www.prisma.io/"}
          Imagepath={Prisma}
        >
          Prisma ORM is the database interface we use to work with the database.
        </CreditBlock>
        <CreditBlock
          Tool={"PostgreSQL"}
          Link={"https://www.postgresql.org/"}
          Imagepath={PostgreSQL}
        >
          PostgreSQL is the database provider we use for the backend database.
        </CreditBlock>
        <CreditBlock
          Tool={"Auth0"}
          Link={"https://auth0.com/"}
          Imagepath={Auth0}
        >
          Auth0 is the login interface we use. It outsources the security
          requirements and allows us to have a secure login without extra
          effort.
        </CreditBlock>
        <CreditBlock
          Tool={"WebStorm"}
          Link={"https://www.jetbrains.com/webstorm/"}
          Imagepath={WebStorm}
        >
          WebStorm is the IDE we use to write and run code. It allows easy
          software development and testing with access to relevant plugins and
          easy git integration for version control.
        </CreditBlock>
        <CreditBlock
          Tool={"Taiga"}
          Link={"https://tree.taiga.io/"}
          Imagepath={Taiga}
        >
          Taiga is the project tracking software we use.
        </CreditBlock>
        <CreditBlock
          Tool={"GitHub"}
          Link={"https://github.com"}
          Imagepath={GitHub}
        >
          GitHub is the version control software we are using. It allows us to
          simultaneously work on different branches and merge work together with
          minimal effort.
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
