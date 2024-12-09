import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FaDocker, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiTypescript, SiJest, SiStripe, SiShopify, SiPosthog, SiSanity, SiSentry } from "react-icons/si";


export default function Stack() {
  return (
    <div>
      <Label>Stack</Label>
      <div className="relative flex gap-2 py-2">
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="gap-2 bg-card/30 py-2 text-xl">
              <FaNodeJs />
              <SiTypescript />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>
              {`Node.js opened doors to server-side JavaScript. Its non-blocking
                I/O, vast package ecosystem, and scalability have been key in
                building fast and efficient backends for web applications.`}
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="gap-2 bg-card/30 py-2 text-xl">
              <SiStripe />
              <SiShopify />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>
              {`Node.js opened doors to server-side JavaScript. Its non-blocking
                I/O, vast package ecosystem, and scalability have been key in
                building fast and efficient backends for web applications.`}
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="gap-2 bg-card/30 py-2 text-xl">
              <SiJest />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>
              {`Node.js opened doors to server-side JavaScript. Its non-blocking
                I/O, vast package ecosystem, and scalability have been key in
                building fast and efficient backends for web applications.`}
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="bg-card/30 py-2 text-xl">
              <FaReact />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>
              {`React revolutionized my front-end development. Its component-based
                architecture and virtual DOM make UI development efficient and
                enjoyable. React's ecosystem empowers me to build modern web
                applications.`}
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="bg-card/30 py-2 text-xl">
              <SiPosthog />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>
              {`React revolutionized my front-end development. Its component-based
                architecture and virtual DOM make UI development efficient and
                enjoyable. React's ecosystem empowers me to build modern web
                applications.`}
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="bg-card/30 py-2 text-xl">
              <SiSanity />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>
              {`React revolutionized my front-end development. Its component-based
                architecture and virtual DOM make UI development efficient and
                enjoyable. React's ecosystem empowers me to build modern web
                applications.`}
            </p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="bg-card/30 py-2 text-xl">
              <SiSentry />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>
              {`React revolutionized my front-end development. Its component-based
                architecture and virtual DOM make UI development efficient and
                enjoyable. React's ecosystem empowers me to build modern web
                applications.`}
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="bg-card/30 py-2 text-xl">
              <FaPython />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>
              {`"Python's simplicity and vast libraries made it my first choice. 
                From web scraping to data analysis and machine learning, Python's
                versatility has powered my diverse projects effectively."`}
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="bg-card/30 py-2 text-xl">
              <FaDocker />
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>
              Working with Docker transformed my development process. It
              simplified environment management, containerization of apps, and
              deployment. Docker&apos;s efficiency is invaluable for seamless
              software delivery
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
