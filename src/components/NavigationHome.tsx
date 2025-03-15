import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const menuItems = [
  { name: "Birthday", slug: "birthday" },
  { name: "Engagement", slug: "engagement" },
  { name: "Dinner Party", slug: "dinner-party" },
  { name: "Blog", slug: "blog" }
];

export function NavigationHome() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (slug: string) => {
    navigate(`/templates/${slug}`);
    setIsOpen(false);
  };

  return (
    <nav className="top-0 w-full bg-white/80 backdrop-blur-sm z-50">
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="https://pasas001.blob.core.windows.net/micontenedor-logo/logonegro.png" 
              alt="Pasas Logo" 
              className="h-8 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-8">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.slug}>
                  <NavigationMenuLink 
                    className="text-[15px] font-medium text-neutral-600 hover:text-black transition-colors cursor-pointer" 
                    onClick={() => handleMenuClick(item.slug)}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="font-medium"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-[#7226ff] to-[#f042ff] text-white hover:opacity-90 font-medium">
              Create
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Button className="bg-black text-white hover:bg-black/90 font-medium">
              Create
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <img 
                      src="https://pasas001.blob.core.windows.net/micontenedor-logo/logonegro.png" 
                      alt="Pasas Logo" 
                      className="h-8 w-auto"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
           
                    </Button>
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="flex-1 overflow-auto py-4">
                    <div className="space-y-1 px-2">
                      {menuItems.map((item) => (
                        <Button
                          key={item.slug}
                          variant="ghost"
                          className="w-full justify-start text-lg font-medium"
                          onClick={() => handleMenuClick(item.slug)}
                        >
                          {item.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="border-t p-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/login');
                      }}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}