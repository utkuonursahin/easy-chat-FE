import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ContactData} from "@/dto/ContactData";
import {Separator} from "@/components/ui/separator";

export default function ContactCard({data}: {data: ContactData}) {
  return (
      <Card className="rounded flex flex-col gap-4 px-6 py-4">
          <CardHeader className="flex flex-row gap-4 items-center p-0">
              <CardTitle className="font-thin block p-0">{data.roomName}</CardTitle>
              <CardDescription className="font-semibold">{data.roomId}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
              <p>{data.lastMessage}</p>
          </CardContent>
      </Card>

  );
}