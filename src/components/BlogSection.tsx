import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    title: "You're on The Guest List",
    description: "Partiful is launching a blog. Here's why, and what to expect.",
    author: {
      name: "Shreya Murthy",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    title: "How to Make New (real) Friends in a New (fake) City",
    description: "A helpful, insightful, and universal guide on how to trap people into your life. From a well-adjusted person with a healthy relationship to external validation.",
    author: {
      name: "Nathan Heffernan",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    }
  },
  {
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    title: "Why We Need Community",
    description: "I actually think building real connections helps society.",
    author: {
      name: "Neighborhood Watch",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef"
    }
  }
];

export function BlogSection() {
  return (
    <div className="w-full bg-gradient-to-b from-white to-purple-50/50 py-16 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-4">
            psst...fresh off the press 😏
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">
                    {post.author.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="font-medium">
            Read more on our blog
          </Button>
        </div>
      </div>
    </div>
  );
}