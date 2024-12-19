"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Lila",
    avatar: "L",
    title: "Freelance Illustrator",
    description:
      "WebForge is my go-to tool for brainstorming creative ideas—it’s a game-changer for my workflow!",
  },
  {
    name: "Carlos",
    avatar: "C",
    title: "Marketing Specialist",
    description:
      "This app has streamlined our content creation process, saving hours each week!",
  },
  {
    name: "Ava",
    avatar: "A",
    title: "Art Director",
    description:
      "The AI-generated assets are so polished that my team uses them directly in client pitches.",
  },
  {
    name: "James",
    avatar: "J",
    title: "Product Manager",
    description:
      "WebForge transformed the way we produce visuals for our SaaS platform. Absolutely fantastic!",
  },
  {
    name: "Sophia",
    avatar: "S",
    title: "Graphic Designer",
    description:
      "I’ve tried other tools, but nothing matches the quality and creativity WebForge offers!",
  },
  {
    name: "Elena",
    avatar: "E",
    title: "Content Strategist",
    description:
      "WebForge has completely transformed how we generate visuals for our campaigns. It’s like having a designer on demand!",
  },
  {
    name: "Raj",
    avatar: "R",
    title: "Small Business Owner",
    description:
      "This app has been a lifesaver for creating professional-looking content without hiring a full-time designer.",
  },
  {
    name: "Hannah",
    avatar: "H",
    title: "Social Media Manager",
    description:
      "I’ve seen our engagement rates soar thanks to the stunning assets I can create with WebForge in minutes!",
  },
];


export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}