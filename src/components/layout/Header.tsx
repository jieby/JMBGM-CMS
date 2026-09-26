import Link from "next/link"
import { Menu, Church, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const navLinks = [
  { href: "#cinematic-narrative", label: "Home" },
  { href: "#connect", label: "Connect" },
  { href: "#outreaches", label: "Outreaches" },
  { href: "#events", label: "Events" },
  { href: "#media", label: "Media" },
  { href: "#mission", label: "Mission" },
  { href: "#give", label: "Give" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2D9CC] bg-[#FBF6EE]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Brand */}
        <Link href="#cinematic-narrative" className="flex items-center gap-2.5 transition-opacity hover:opacity-85">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2F3E33] text-[#FBF6EE]">
            <Church className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[#2F3E33]">
              JMBGM
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#8A9A5B] font-semibold">
              Ministry & Community
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#2F3E33] transition-colors hover:text-[#C1683B]"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="terracotta" size="sm" className="font-semibold shadow-sm">
            <Link href="#connect">
              Plan a Visit
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-[#E2D9CC] text-[#2F3E33]"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-[#FBF6EE] sm:w-[320px]">
              <SheetHeader className="text-left mb-6">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2F3E33] text-[#FBF6EE]">
                    <Church className="h-4 w-4" />
                  </div>
                  <SheetTitle className="text-lg font-bold text-[#2F3E33]">
                    JMBGM
                  </SheetTitle>
                </div>
                <p className="text-xs text-[#5C6F62]">
                  Jesus the Master Builder Global Ministry
                </p>
              </SheetHeader>
              <Separator className="mb-6 bg-[#E2D9CC]" />
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-[#2F3E33] transition-colors hover:text-[#C1683B]"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Button asChild variant="terracotta" className="w-full font-semibold shadow-sm">
                    <Link href="#connect">
                      Plan a Visit
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
