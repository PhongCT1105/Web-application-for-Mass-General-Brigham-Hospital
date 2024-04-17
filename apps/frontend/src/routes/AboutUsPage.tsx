import "../styles/example.route.css";
import "../styles/globals.css";
import AboutBlock from "@/components/blocks/AboutBlock.tsx";
import AboutBlockFaculty from "@/components/blocks/AboutFacultyBlock.tsx";
import Ari from "@/assets/headshots/Ari.jpg";
import Katy from "@/assets/headshots/Katy.jpg";
import Phong from "@/assets/headshots/Phong.png";
import Lap from "@/assets/headshots/Lap.jpg";
import Trang from "@/assets/headshots/Trang.jpg";
import Mina from "@/assets/headshots/Mina.jpg";
import Henry from "@/assets/headshots/Henry.jpg";
import June from "@/assets/headshots/June.jpg";
import Tracy from "@/assets/headshots/Tracy.jpg";
import Sandi from "@/assets/headshots/Sandi.png";
import Kraemling from "@/assets/headshots/Kraemling.jpg";
import Shettler from "@/assets/headshots/Shettler.png";
import Owen from "@/assets/headshots/Owen.jpg";
import WPI_Logo from "@/assets/WPI_Logo.png";
import Wong from "@/assets/headshots/Wong.png";

// import wongAsters from "@/assets/wongSunFlower.png";
// import wongSunflower from "@/assets/wongAsters.png";

const AboutMePage = () => {
  return (
    <div>
      <div
        className="about-the-team"
        style={{
          width: "85%",
          paddingTop: "20px",
          paddingBottom: "10px",
          gap: "10px",
          margin: "auto",
        }}
      >
        <h4 style={{ textAlign: "center" }}>
          This application was developed by a team of students at Worcester
          Polytechnic Institute as part of the CS3733-D24 Software Engineering
          course. The team was led by Professor Wilson Wong and Team Coach Ari
          Schechter and Katy Stuparu.
        </h4>
        <h1 style={{ textAlign: "center", paddingTop: "70px" }}>Faculty</h1>
        <div className="faculty-flex">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "20px",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <AboutBlockFaculty
              Name={"Wilson Wong"}
              role={"Professor"}
              Email={"wwong2@wpi.edu"}
              Github={"https://github.com/wwong2"}
              Linkdin={"https://www.linkedin.com/in/wilson-wong-wpi/"}
              Imagepath={Wong}
            />
            <AboutBlockFaculty
              Name={"Ari Schechter"}
              role={"Team Coach"}
              ClassYear={"2025"}
              Major={"CS"}
              Email={"aschechter@wpi.edu"}
              Github={"https://github.com/aschechter10"}
              Linkdin={"https://www.linkedin.com/in/ari-schechter/"}
              Imagepath={Ari}
            />
            <AboutBlockFaculty
              Name={"Katy Stuparu"}
              role={"Team Coach"}
              ClassYear={"2025"}
              Major={"CS"}
              Email={"kstuparu@wpi.edu"}
              Github={"https://github.com/kastuparu"}
              Linkdin={"https://www.linkedin.com/in/kastuparu/"}
              Imagepath={Katy}
            />
          </div>
          <h1 style={{ textAlign: "center", paddingTop: "100px" }}>Our Team</h1>
          <div className="team-members-flex">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "20px",
                justifyContent: "space-between",
              }}
            >
              <AboutBlock
                Name={"Phong Cao"}
                role={"Team Lead"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2027"}
                Major={"CS & DS"}
                Email={"pcao@wpi.edu"}
                Github={"https://github.com/PhongCT1105"}
                Linkdin={"https://www.linkedin.com/in/phong-cao/"}
                Imagepath={Phong}
                FunFact={""}
              />

              <AboutBlock
                Name={"Alexander Lap"}
                role={"Frontend Lead"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2026"}
                Major={"CS"}
                Email={"ajlap@wpi.edu"}
                Github={"https://github.com/alexanderjlap"}
                Linkdin={"https://www.linkedin.com/in/alexanderlap/"}
                Imagepath={Lap}
                FunFact={""}
              />
              <AboutBlock
                Name={"Trang Tran"}
                role={"Backend Lead"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2026"}
                Major={"CS & IMGD"}
                Email={"tntran@wpi.edu"}
                Github={"https://github.com/tsnhim"}
                Linkdin={"https://www.linkedin.com/in/tntran03/"}
                Imagepath={Trang}
                FunFact={""}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                  justifyContent: "space-between",
                }}
              >
                <AboutBlock
                  Name={"Mina Boktor"}
                  role={"Frontend Engineer"}
                  devrole={"Full-Stack Engineer"}
                  ClassYear={"2026"}
                  Major={"CS"}
                  Email={"mboktor@wpi.edu"}
                  Github={"https://github.com/minaboktor2628"}
                  Linkdin={"https://www.linkedin.com/in/mina-boktor-108126211/"}
                  Imagepath={Mina}
                  FunFact={""}
                />
                <AboutBlock
                  Name={"Henry Solomon"}
                  role={"Frontend Engineer"}
                  devrole={"Full-Stack Engineer"}
                  ClassYear={"2026"}
                  Major={"CS"}
                  Email={"hjsolomon@wpi.edu"}
                  Github={"https://github.com/hjsolomon"}
                  Linkdin={"https://www.linkedin.com/in/hjsolomon/"}
                  Imagepath={Henry}
                  FunFact={""}
                />
                <AboutBlock
                  Name={"June Whittall"}
                  role={"Backend Engineer"}
                  devrole={"Full-Stack Engineer"}
                  ClassYear={"2026"}
                  Major={"CS & IMGD"}
                  Email={"jwhittall@wpi.edu"}
                  Github={"https://github.com/jwwhittall"}
                  Linkdin={""}
                  Imagepath={June}
                  FunFact={""}
                />
              </div>
              <div />
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <AboutBlock
                    Name={"Tracy Yang"}
                    role={"Algorithms Enginner"}
                    devrole={"Full-Stack Engineer"}
                    ClassYear={"2025"}
                    Major={"RBE"}
                    Email={"tdyang@wpi.edu"}
                    Github={"https://github.com/tdyang"}
                    Linkdin={
                      "https://www.linkedin.com/in/tracy-yang-b61b72211/"
                    }
                    Imagepath={Tracy}
                    FunFact={""}
                  />
                  <AboutBlock
                    Name={"Alexsandra Antoski"}
                    role={"Product Manager"}
                    devrole={"Full-Stack Engineer"}
                    ClassYear={"2025"}
                    Major={"CS"}
                    Email={"aantoski@wpi.edu"}
                    Github={"https://github.com/aantoski"}
                    Linkdin={
                      "https://www.linkedin.com/in/alexsandra-antoski-9b7a242a4/"
                    }
                    Imagepath={Sandi}
                    FunFact={""}
                  />
                  <AboutBlock
                    Name={"Alexander Kraemling"}
                    role={"Product Owner"}
                    devrole={"Full-Stack Engineer"}
                    ClassYear={"2026"}
                    Major={"CS & RBE"}
                    Email={"ajkraemling@wpi.edu"}
                    Github={"https://github.com/ajkraemling"}
                    Linkdin={
                      "https://www.linkedin.com/in/alexander-kraemling-aa9b42214/"
                    }
                    Imagepath={Kraemling}
                    FunFact={""}
                  />
                </div>
                <div />
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: "20px",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <AboutBlock
                      Name={"Alexander Shettler"}
                      role={"Scrum Master"}
                      devrole={"Full-Stack Engineer"}
                      ClassYear={"2026"}
                      Major={"CS"}
                      Email={"aeshettler@wpi.edu"}
                      Github={"https://github.com/alexshettler"}
                      Linkdin={""}
                      Imagepath={Shettler}
                      FunFact={""}
                    />
                    <AboutBlock
                      Name={"Owen Lacey"}
                      role={"Documentation Analyst"}
                      devrole={"Full-Stack Engineer"}
                      ClassYear={"2026"}
                      Major={"IMGD"}
                      Email={"oelacey@wpi.edu"}
                      Github={"https://github.com/echoct21"}
                      Linkdin={
                        "https://www.linkedin.com/in/owen-lacey-721205250/"
                      }
                      Imagepath={Owen}
                      FunFact={""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h6 style={{ textAlign: "center", marginTop: "75px" }}>
            WPI Computer Science Department, CS3733-D24 Software Engineering
          </h6>
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
    </div>
  );
};

export default AboutMePage;
