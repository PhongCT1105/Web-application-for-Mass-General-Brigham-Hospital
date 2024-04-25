import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover.tsx";

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
  quote?: string;
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
  quote,
}: AboutInfo) => {
  return (
    <Card
      className={
        "flex flex-col justify-space-between mw-700 p-5 bg-secondary shadow-lg"
      }
    >
      <Popover>
        <PopoverTrigger>
          <img
            src={Imagepath}
            alt={Name}
            style={{ height: 250, width: 250, objectFit: "cover" }}
            className={"object-fit-cover rounded-md"}
          />
        </PopoverTrigger>
        {quote && (
          <PopoverContent>
            <div className={""}>Quote: {quote}</div>
          </PopoverContent>
        )}
      </Popover>
      <div>
        <h4 className={"text-center font-bold"}>{Name}</h4>
        {role && <p>Role: {role}</p>}
        {devrole && <p>Software Role: {devrole}</p>}
        {ClassYear && <p>Class Year: {ClassYear}</p>}
        {major && <p>Major: {major}</p>}
        <p>
          Email: <a href={"mailto:" + Email}>{Email}</a>
        </p>
      </div>
      <div className={"mx-auto w-1/2"}>
        <div className={"flex justify-between"}>
          <Button variant={"invisible"}>
            <a href={Github} target="_blank" rel="noreferrer noopener">
              {Github && <GitHubLogoIcon />}
            </a>
          </Button>
          <Button variant={"invisible"}>
            <a href={Linkdin} target="_blank" rel="noreferrer noopener">
              {Linkdin && <LinkedInLogoIcon />}
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AboutBlock;
