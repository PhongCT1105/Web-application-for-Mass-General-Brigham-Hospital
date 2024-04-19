import React from "react";
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
}: AboutInfo) => {
  return (
    <Card
      className={"flex flex-col justify-space-between mw-700 p-5 bg-gray-200"}
    >
      <img
        src={Imagepath}
        alt={Name}
        style={{ height: 250, width: 250, objectFit: "cover" }}
        className={"object-fit-cover rounded-md"}
      />
      <div>
        <h4 className={"text-center font-bold"}>{Name}</h4>
        {role && <p>Role: {role}</p>}
        {devrole && <p>Software Role: {devrole}</p>}
        <p>Class Year: {ClassYear}</p>
        {major && <p>Major: {major}</p>}
        <p>Email: {Email}</p>
      </div>
      <div className={"mx-auto w-1/2"}>
        <div className={"flex justify-between"}>
          <Button variant={"invisible"}>{Github && <GitHubLogoIcon />}</Button>
          <Button variant={"invisible"}>
            {Linkdin && <LinkedInLogoIcon />}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AboutBlock;
