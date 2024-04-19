import React, { useState } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

interface AboutInfo {
  Name: string;
  role?: string;
  devrole?: string;
  ClassYear?: string;
  major?: string;
  Email: string;
  Github?: string;
  Linkdin?: string;
  Imagepath: string;
  FunFact?: string;
}

const AboutBlock = ({
  Name,
  role,
  devrole,
  ClassYear,
  major,
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
    <Card
      className={"flex flex-col justify-space-between mw-700 p-5 bg-gray-200"}
    >
      <img
        src={Imagepath}
        alt={Name}
        style={{ height: 250, width: 250, objectFit: "cover" }}
        className={"object-fit-cover rounded-md"}
        onClick={handleOpen}
      />

      {open && (
        <Card className={"position-relative mw-250 bg-white shadow-sm p-2"}>
          <h2>Favorite Quote:</h2>
          <p>{FunFact}</p>
          <Button onClick={handleClose}>Close</Button>
        </Card>
      )}

      <div>
        <h4 className={"text-center font-bold"}>{Name}</h4>
        {role && <p>Role: {role}</p>}
        {devrole && <p>Software Role: {devrole}</p>}
        <p>Class Year: {ClassYear}</p>
        {major && <p>Major: {major}</p>}
        <p>Email: {Email}</p>
      </div>

      <div className={"flex justify-content-between"}>
        <Button variant={"invisible"} className={"ml-auto"}>
          {Github && <GitHubLogoIcon />}
        </Button>
        <Button variant={"invisible"} className={"mr-auto"}>
          {Linkdin && <LinkedInLogoIcon />}
        </Button>
      </div>
    </Card>
  );
};

export default AboutBlock;
