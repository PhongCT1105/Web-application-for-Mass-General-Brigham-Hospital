// //import React, { useEffect, useState } from "react";
//
// import AboutBlock from "@/components/blocks/AboutBlock.tsx";
// import AboutFacultyBlock from "@/components/blocks/AboutFacultyBlock.tsx";
// import Wong from "../assets/Wong.png";
// import Joe from "../assets/Joseph-SA.png";
// import Aish from "../../src/assets/Aishwarya.png";
// import Ajay from "../../src/assets/Ajay.png";
// import Ethan from "../../src/assets/Ethan.png";
// import Justin from "../../src/assets/Justin.png";
// import Leo from "../../src/assets/Leo.png";
// import Mahit from "../../src/assets/Mahit.png";
// import Max from "../../src/assets/Max.png";
// import Shawn from "../../src/assets/Shawnpng.png";
// import Zane from "../../src/assets/Zane.png";
// import Vaanch from "../../src/assets/Vannch.png";
// import WPI_Logo from "../../src/assets/WPI_Logo.jpg";
//
// const AboutMe = () => {
//     return (
//         <div
//             className="about-the-team"
//             style={{
//                 width: "85%",
//                 paddingTop: "20px",
//                 paddingBottom: "10px",
//                 gap: "10px",
//             }}
//         >
//             <h4 style={{ textAlign: "center" }}>
//                 Our sincerest gratitude towards Brigham and Women’s Hospital and their
//                 representative, Mr. Andrew Shinn.
//             </h4>
//             <h1 style={{ textAlign: "center", paddingTop: "70px" }}>Faculty</h1>
//             <div className="faculty-flex">
//                 <div
//                     style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         paddingTop: "20px",
//                         justifyContent: "space-evenly",
//                         alignItems: "center",
//                         margin: "auto",
//                     }}
//                 >
//                     <AboutFacultyBlock
//                         Name={"Wilson Wong"}
//                         role={"Professor"}
//                         Email={"wwong2@wpi.edu"}
//                         Github={"https://github.com/wwong2"}
//                         Linkdin={"https://www.linkedin.com/in/wilson-wong-wpi/"}
//                         Imagepath={Wong}
//                     />
//                     <AboutFacultyBlock
//                         Name={"Joseph Cardarelli"}
//                         role={"Team Coach"}
//                         ClassYear={"2024"}
//                         Major={"Computer Science and Robotics Engineering"}
//                         Email={"jrcardarelli@wpi.edu"}
//                         Github={"https://github.com/jrcardarelli"}
//                         Linkdin={"https://www.linkedin.com/in/joseph-cardarelli-3a12a1254/"}
//                         Imagepath={Joe}
//                     />
//                 </div>
//                 <h1 style={{ textAlign: "center", paddingTop: "100px" }}>Our Team</h1>
//                 <div className="team-members-flex">
//                     <div
//                         style={{
//                             display: "flex",
//                             flexDirection: "row",
//                             paddingTop: "20px",
//                             justifyContent: "space-between",
//                         }}
//                     >
//                         <AboutCard
//                             Name={"Ajay Bhagavatula"}
//                             role={"Team Lead"}
//                             devrole={"Full-Stack Engineer"}
//                             ClassYear={"2026"}
//                             Major={"Computer Science"}
//                             Email={"abhagavatula@wpi.edu"}
//                             Github={"https://github.com/ajay-bhagava"}
//                             Linkdin={"https://www.linkedin.com/in/ajaywpi/"}
//                             Imagepath={Ajay}
//                             Favorite_quote={
//                                 "'You miss 100% of the shots you don't take.' - Wayne Gretzky' - Michael Scott"
//                             }
//                         />
//
//                         <AboutCard
//                             Name={"Leo Hirano"}
//                             role={"Frontend Lead"}
//                             devrole={"Full-Stack Engineer"}
//                             ClassYear={"2025"}
//                             Major={"Computer Science"}
//                             Email={"lkhirano@wpi.edu"}
//                             Github={"https://github.com/notLeoHirano"}
//                             //Linkdin={"asdf.com"}
//                             Imagepath={Leo}
//                             Favorite_quote={"'One million billion marbles' - Leo"}
//                         />
//                         <AboutCard
//                             Name={"Vaansh Mansharamani"}
//                             role={"Assistant Lead"}
//                             devrole={"Full-Stack Engineer"}
//                             ClassYear={"2026"}
//                             Major={"Computer Science"}
//                             Email={" vmansharamani@wpi.edu"}
//                             Github={"https://github.com/JustSomeOrdinaryCardboardBox"}
//                             Linkdin={
//                                 "https://www.linkedin.com/in/vaansh-mansharamani-30a6b7227/"
//                             }
//                             Imagepath={Vaanch}
//                             Favorite_quote={"Cool Beans ~ Vaansh"}
//                         />
//                         <AboutCard
//                             Name={"Ethan Zhong"}
//                             role={"Product Manager"}
//                             devrole={"Full-Stack Engineer"}
//                             ClassYear={"2025"}
//                             Major={"Computer Science and Robotics Engineering"}
//                             Email={"ezhong@wpi.edu"}
//                             Github={"https://github.com/Ethan-Z8"}
//                             Linkdin={"https://www.linkedin.com/in/ethan-zhong-76886a21a/"}
//                             Imagepath={Ethan}
//                             Favorite_quote={
//                                 "'Success is not final, failure is not fatal: it is the courage to continue that counts.' - Winston Churchill"
//                             }
//                         />
//                         <AboutCard
//                             Name={"Mahit Verma"}
//                             role={"Asst. Lead & Product Owner"}
//                             //devrole={"Full-Stack Engineer"}
//                             ClassYear={"2026"}
//                             Major={"Computer Science and Data Science"}
//                             Email={"mverma@wpi.edu"}
//                             Github={"https://github.com/MaVeryo"}
//                             Linkdin={"https://www.linkedin.com/in/mahit-verma/"}
//                             Imagepath={Mahit}
//                             Favorite_quote={
//                                 "'Now, water can flow or it can crash. Be water, my friend.' - Bruce Lee"
//                             }
//                         />
//                     </div>
//                     <div
//                         style={{
//                             display: "flex",
//                             flexDirection: "row",
//                             paddingTop: "20px",
//                             paddingBottom: "10px",
//                             justifyContent: "space-between",
//                         }}
//                     >
//                         <AboutCard
//                             Name={"Zane Altheimer"}
//                             role={"Document Analyst"}
//                             devrole={"Full-Stack Engineer"}
//                             ClassYear={"2024"}
//                             Major={"Robotics Engineering"}
//                             Email={"zaaltheimer@wpi.edu"}
//                             Github={"https://github.com/z-altheimer"}
//                             Linkdin={"https://www.linkedin.com/in/zaltheimer/"}
//                             Imagepath={Zane}
//                             Favorite_quote={
//                                 "'The machine does not isolate man from the great problems of nature but plunges him more deeply into them.' - Antoine de Saint-Exupéry, The Little Prince"
//                             }
//                         />
//                         <AboutCard
//                             Name={"Justin Smith"}
//                             role={"Full-time Developer"}
//                             devrole={"Full-Stack Engineer"}
//                             ClassYear={"2025"}
//                             Major={"Computer Science and Game Development"}
//                             Email={"jmsmith2@wpi.edu"}
//                             Github={"https://github.com/JustinS-23"}
//                             Linkdin={"https://www.linkedin.com/in/justin-smith-b61647215/"}
//                             Imagepath={Justin}
//                             Favorite_quote={
//                                 "'Float like a butterfly, sting like a bee.' - Muhammad Ali"
//                             }
//                         />
//                         <AboutCard
//                             Name={"Maxwell Friedman"}
//                             role={"Scrum Master"}
//                             devrole={"Full-Stack Engineer"}
//                             ClassYear={"2025"}
//                             Major={"Robotics Engineering"}
//                             Email={"mlfriedman@wpi.edu"}
//                             Github={" https://github.com/Steelplate"}
//                             Linkdin={" https://www.linkedin.com/in/friedman-maxwell/"}
//                             Imagepath={Max}
//                             Favorite_quote={
//                                 "'That's something that could have been brought to my attention YESTERDAY!' - Adam Sandler"
//                             }
//                         />
//                         <AboutCard
//                             Name={"Shawn Patel"}
//                             role={"Senior Developer"}
//                             devrole={"Full-Stack Engineer"}
//                             ClassYear={"2026"}
//                             Major={"Computer Science"}
//                             Email={"snpatel@wpi.edu"}
//                             Github={"https://github.com/shawnp221"}
//                             Linkdin={"https://www.linkedin.com/in/shawn-patel-359a562a7/"}
//                             Imagepath={Shawn}
//                             Favorite_quote={
//                                 "'Every man must do two things alone; he must do his own believing and his own dying.' - Martin Luther King Jr"
//                             }
//                         />
//
//                         <AboutCard
//                             Name={"Aishwarya Silam"}
//                             // role={""}
//                             // devrole={"Backend Engineer"}
//                             ClassYear={"2026"}
//                             Major={"Computer Science"}
//                             Email={"arsilam@wpi.edu"}
//                             // Github={"google.com"}
//                             // Linkdin={"asdf.com"}
//                             Imagepath={Aish}
//                             Favorite_quote={
//                                 "'Spread love everywhere you go. Let no one ever come to you without leaving happier.' -Mother Teresa"
//                             }
//                         />
//                     </div>
//                 </div>
//                 <h6 style={{ textAlign: "center", marginTop: "75px" }}>
//                     WPI Computer Science Department, CS3733-C24 Software Engineering
//                 </h6>
//                 <h6 style={{ textAlign: "center", marginTop: "20px" }}>
//                     ©The Brigham & Women’s Hospital maps and data used in this
//                     application are copyrighted and provided for the sole use of
//                     educational purposes.
//                 </h6>
//                 <div style={{ textAlign: "center" }}>
//                     <img src={WPI_Logo} alt="WPI Logo" style={{ maxWidth: "150px" }} />
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default AboutMe;
