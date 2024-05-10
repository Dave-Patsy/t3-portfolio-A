
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const workoutCategories = {
  workoutCategories: [
    {
      category: "Cardiovascular exercises",
      tip: "Engage in activities like running, cycling, or swimming to improve cardiovascular fitness and endurance.",
    },
    {
      category: "Strength training",
      tip: "Incorporate weightlifting or resistance exercises to build muscle strength and promote overall fitness.",
    },
    {
      category: "High-intensity interval training (HIIT)",
      tip: "Try alternating between intense bursts of exercise and short rest periods to maximize calorie burn and cardiovascular benefits.",
    },
    {
      category: "Flexibility and stretching",
      tip: "Include activities like yoga or Pilates to improve flexibility, joint range of motion, and muscle elasticity.",
    },
    {
      category: "Core workouts",
      tip: "Perform exercises like planks, crunches, or leg raises to strengthen the core muscles and enhance stability.",
    },
    {
      category: "Balance and stability training",
      tip: "Engage in exercises that challenge balance, such as single-leg stands or yoga poses, to improve stability and coordination.",
    },
    {
      category: "Functional training",
      tip: "Incorporate exercises that mimic real-life movements, such as squats or kettlebell swings, to enhance strength and coordination for daily activities.",
    },
    {
      category: "Sports-specific training",
      tip: "Tailor your workouts to focus on drills and exercises that improve performance in your chosen sport.",
    },
    {
      category: "Group fitness classes",
      tip: "Join group classes like spinning, Zumba, or boot camps to add variety, motivation, and a sense of community to your workouts.",
    },
    {
      category: "Mind-body exercises",
      tip: "Explore practices like meditation, tai chi, or yoga to promote mental well-being, relaxation, and mind-body connection.",
    },
  ],
};

export default function Core() {
  return (
    <>

      <div className="text-center text-6xl font-extrabold">Core</div>
      <div className="mx-auto grid w-11/12 grid-cols-1 md:grid-cols-2 lg:grid-cols-5  items-center justify-items-center gap-2">
        {workoutCategories.workoutCategories.map((ele, idx) => {
          return (
            <div className="relative w-full" key={idx}>
              <AspectRatio ratio={1}>
                <div className="h-full w-full">
                  <div className="absolute flex h-full w-full items-center justify-center bg-black/40 text-center z-10">
                    <h1 className="text-4xl font-extrabold text-white">
                      {ele.category}
                    </h1>
                  </div>

                  <Image
                    className="h-full w-full object-cover"
                    src="https://source.unsplash.com/random/?fitness&1"
                    alt="asdasd"
                    fill={true}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                </div>
              </AspectRatio>
            </div>
          );
        })}
      </div>
    </>
  );
}
