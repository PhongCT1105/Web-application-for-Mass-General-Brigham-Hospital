import { Card, CardHeader, CardContent } from "@/components/ui/card.tsx";

interface CreditInfo {
  Imagepath: string;
  children?: string;
  Tool: string;
  Link?: string;
}

const CreditBlock = ({ Imagepath, children, Tool, Link }: CreditInfo) => {
  return (
    <Card className={"flex flex-col justify-space-between mw-700 p-2 my-4"}>
      <CardHeader className={"text-2xl font-bold"}>
        <a
          href={Link}
          target="_blank"
          rel="noreferrer noopener"
          className={" flex flex-row"}
        >
          <img
            src={Imagepath}
            alt={Tool}
            style={{ height: 40, maxWidth: 70, objectFit: "cover" }}
            className={"object-fit-cover mr-4"}
          />
          {Tool}
        </a>
      </CardHeader>
      <CardContent>
        <div className={"text-md"}>{children}</div>
      </CardContent>
    </Card>
  );
};

export default CreditBlock;
