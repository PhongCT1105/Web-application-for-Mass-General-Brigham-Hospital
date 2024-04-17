import React, { useState } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

interface AboutInfo {
  Name: string;
  role?: string;
  devrole?: string;
  ClassYear: string;
  Major: string;
  Email: string;
  Github?: string;
  Linkdin?: string;
  Imagepath: string;
  FunFact: string;
}

const AboutBlock = ({
  Name,
  role,
  devrole,
  ClassYear,
  Major,
  Email,
  Github,
  Linkdin,
  Imagepath,
  FunFact,
}: AboutInfo) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: 700,
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "#e9e8e9",
      }}
    >
      <img
        src={Imagepath}
        alt={Name}
        style={{ height: 250, width: 250, objectFit: "cover" }}
        onClick={handleOpen}
      />

      {open && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            backgroundColor: "white",
            border: "0px solid #000 !important",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
        >
          <h2>Favorite Quote:</h2>
          <p>{FunFact}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}

      <div>
        <h5>{Name}</h5>
        {role && <p>Role: {role}</p>}
        {devrole && <p>Software Role: {devrole}</p>}
        <p>Class Year: {ClassYear}</p>
        <p>Major: {Major}</p>
        <p>Email: {Email}</p>
      </div>

      <div style={{ display: "flex", alignItems: "end" }}>
        {Github && <GitHubLogoIcon />}
        {Linkdin && <LinkedInLogoIcon />}
      </div>
    </div>
  );
};

export default AboutBlock;
