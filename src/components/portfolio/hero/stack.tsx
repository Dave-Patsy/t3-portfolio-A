import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FaDocker, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  SiPython,
  SiTypescript,
  SiJest,
  SiStripe,
  SiShopify,
  SiPosthog,
  SiSanity,
  SiSentry,
  SiPuppeteer,
  SiFlask,
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
} from "react-icons/si";

import { DiRedis } from "react-icons/di";

export default function Stack() {
  return (
    <div>
      <Label>Stack</Label>
      <div className="relative flex flex-wrap gap-2 py-2">
        <HoverCard>
          <HoverCardTrigger>
            <Badge variant="outline" className="gap-2 bg-card/30 py-2 text-xl">
              <FaNodeJs />
              <SiTypescript />
              <SiPython />
              <Label>Language</Label>
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
              <Label>E-Commerce</Label>
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
              <SiPuppeteer />
              <Label>Testing</Label>
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
            <Badge variant="outline" className="bg-card/30 py-2 gap-2 text-xl">
              <SiNextdotjs />
              <SiFlask />
              <SiExpress />
              <Label>Frameworks</Label>
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
