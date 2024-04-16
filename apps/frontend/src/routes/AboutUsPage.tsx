import "../styles/example.route.css";
import "../styles/globals.css";
import { Header } from "@/components/blocks/header.tsx";
import AboutBlock from "@/components/blocks/AboutBlock.tsx";
import AboutBlockFaculty from "@/components/blocks/AboutFacultyBlock.tsx";

// import wongAsters from "@/assets/wongSunFlower.png";
// import wongSunflower from "@/assets/wongAsters.png";

const AboutMePage = () => {
  return (
    <div>
      <Header />
      <div
        className="about-the-team"
        style={{
          width: "85%",
          paddingTop: "20px",
          paddingBottom: "10px",
          gap: "10px",
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
              Imagepath={"Wong"}
            />
            <AboutBlockFaculty
              Name={"Ari Schechter"}
              role={"Team Coach"}
              ClassYear={"2025"}
              Major={"Computer Science"}
              Email={"aschechter@wpi.edu"}
              Github={""}
              Linkdin={""}
              Imagepath={"Ari"}
            />
            <AboutBlockFaculty
              Name={"Katy Stuparu"}
              role={"Team Coach"}
              ClassYear={"2025"}
              Major={"Computer Science"}
              Email={"kstuparu@wpi.edu"}
              Github={""}
              Linkdin={""}
              Imagepath={"Katy"}
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
                Major={"Computer Science and Data Science"}
                Email={"pcao@wpi.edu"}
                Github={""}
                Linkdin={""}
                Imagepath={"Phong"}
                FunFact={""}
              />

              <AboutBlock
                Name={"Alexander Lap"}
                role={"Frontend Lead"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2026"}
                Major={"Computer Science"}
                Email={"ajlap@wpi.edu"}
                Github={""}
                Linkdin={""}
                Imagepath={"Lap"}
                FunFact={""}
              />
              <AboutBlock
                Name={"Trang Tran"}
                role={"Backend Lead"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2026"}
                Major={"Computer Science and IMGD"}
                Email={""}
                Github={""}
                Linkdin={""}
                Imagepath={"Trang"}
                FunFact={""}
              />
            </div>
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
                Major={"Computer Science"}
                Email={""}
                Github={""}
                Linkdin={""}
                Imagepath={"Mina"}
                FunFact={""}
              />
              <AboutBlock
                Name={"Henry Solomon"}
                role={"Frontend Engineer"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2026"}
                Major={"Computer Science"}
                Email={""}
                Github={""}
                Linkdin={""}
                Imagepath={"Henry"}
                FunFact={""}
              />
              <AboutBlock
                Name={"June Whittall"}
                role={"Backend Engineer"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2026"}
                Major={"Computer Science and IMGD"}
                Email={""}
                Github={""}
                Linkdin={""}
                Imagepath={"June"}
                FunFact={""}
              />
              <AboutBlock
                Name={"Tracy Yang"}
                role={"Algorithms Enginner"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2025"}
                Major={"Robotics Engineering"}
                Email={""}
                Github={""}
                Linkdin={""}
                Imagepath={"Tracy"}
                FunFact={""}
              />
              <AboutBlock
                Name={"Alexsandra Antoski"}
                role={"Product Manager"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2025"}
                Major={"Computer Science"}
                Email={""}
                Github={""}
                Linkdin={""}
                Imagepath={"Antoski"}
                FunFact={""}
              />
              <AboutBlock
                Name={"Alexander Kraemling"}
                role={"Product Owner"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2026"}
                Major={"Computer Science and Robotics Engineering"}
                Email={""}
                Github={""}
                Linkdin={""}
                Imagepath={"Kraemling"}
                FunFact={""}
              />
              <AboutBlock
                Name={"Alexander Shettler"}
                role={"Scrum Master"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2026"}
                Major={"Computer Science"}
                Email={""}
                Github={""}
                Linkdin={""}
                Imagepath={"Shettler"}
                FunFact={""}
              />
              <AboutBlock
                Name={"Owen Lacey"}
                role={"Documentation Analyst"}
                devrole={"Full-Stack Engineer"}
                ClassYear={"2026"}
                Major={"Computer Science"}
                Email={""}
                Github={""}
                Linkdin={""}
                Imagepath={"Owen"}
                FunFact={""}
              />
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
          <div style={{ textAlign: "center" }}>
            <img
              src={"WPI_Logo"}
              alt="WPI Logo"
              style={{ maxWidth: "150px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
