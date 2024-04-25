import { Card, CardHeader, CardContent } from "@/components/ui/card.tsx";

interface CreditInfo {
  children?: string;
  Tool: string;
  Link?: string;
}

const CreditBlock = ({ children, Tool, Link }: CreditInfo) => {
  return (
    <Card className={"flex flex-col justify-space-between mw-700 p-2 my-4"}>
      <CardHeader className={"text-2xl font-bold"}>
        <a href={Link} target="_blank" rel="noreferrer noopener">
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
