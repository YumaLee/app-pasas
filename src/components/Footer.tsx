import { PartyPopper, Instagram,  } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Blog", href: "#" },
    { name: "Download", href: "#" },
    { name: "Shop", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Community Guidelines", href: "#" },
  ],
  support: [
    { name: "Contact", href: "#" },
    { name: "Help Center", href: "#" },
  ],
  social: [
    { name: "Instagram", href: "#", icon: Instagram },
  

  ],
};

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#5a1ec4] to-[#3a00a6] border-t">

      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <PartyPopper className="h-6 w-6" />
              <span className="logo-text text-xl text-white">PASAS</span>
            </div>
          </div>

          {/* Product Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white hover:text-neutral-900 transition-colors"
                  >
                    {link.name}
                  </a>

                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white hover:text-neutral-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white hover:text-neutral-900 transition-colors"
                  >
                    {link.name}
                  </a>

                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}