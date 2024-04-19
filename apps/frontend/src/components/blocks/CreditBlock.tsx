import { Card, CardHeader, CardContent } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";

interface CreditInfo {
  children?: string;
  Tool: string;
  Link?: string;
}

const CreditBlock = ({ children, Tool, Link }: CreditInfo) => {
  return (
    <Card className={"flex flex-col justify-space-between mw-700 p-2 my-4"}>
      <CardHeader className={"text-2xl font-bold"}>{Tool}</CardHeader>
      <CardContent>
        <div className={"text-md"}>{children}</div>
        <Separator className={"my-1"}></Separator>
        <div className={"text-md"}>Link: {Link}</div>
      </CardContent>
    </Card>
  );
};

export default CreditBlock;
