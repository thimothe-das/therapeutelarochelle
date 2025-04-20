"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, MapPin, ExternalLink, ChevronDown, Check, Copy, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetcher, formatPhoneNumber } from "@/lib/utils"
import { cn } from "@/lib/utils"
import useSWR from "swr"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "motion/react"

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/pages?slug=headerbanner`, fetcher)
  const [showContactDropdown, setShowContactDropdown] = useState(false)
  const [copiedState, setCopiedState] = useState<{ [key: string]: boolean }>({
    phone: false,
    email: false,
    address: false,
  })
  const contactDropdownRef = useRef<HTMLDivElement>(null)
  const contactButtonRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "#about", label: "À propos" },
    { href: "#cabinet", label: "Mon cabinet" },
    { href: "#therapies", label: "Les thérapies" },
    { href: "#qualifications", label: "Mes qualifications" },
    { href: "#prestation", label: "Prestation" },
    { href: "#contact", label: "Contact" },
  ]


  const toggleContactDropdown = () => {
    setShowContactDropdown(!showContactDropdown)
  }

  const copyToClipboard = (text: string, type: "phone" | "email" | "address") => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedState((prev) => ({ ...prev, [type]: true }))
    })
  }

  if (!data) return null

  const contactInfo = {
    phone: data.acf.phone,
    email: data.acf.mail,
    address: data.acf.address,
    city: data.acf.city,
  }


  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md py-2" 
          : isMenuOpen 
            ? "bg-white/95 backdrop-blur-sm shadow-md py-4 md:bg-white/0 md:shadow-none" 
            : "bg-white/0 backdrop-blur-sm py-4",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-all duration-300 group-hover:shadow-md">
              <Image src={data.acf.logo.url} className="object-contain" alt="Logo" fill sizes="40px" priority />
            </div>
            <span className={cn(
              "font-medium text-lg hidden md:inline-block font-bold",
              scrolled ? "text-gray-600" : "text-white",
              "group-hover:text-teal-600 transition-colors duration-300"
            )}>
              {data.acf.principal_title} 
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3 py-2 text-sm lg:text-base rounded-full transition-all duration-300",
                pathname === link.href
                  ? "text-teal-700 font-medium"
                  : "text-gray-600 hover:text-teal-600 hover:bg-teal-50",
                scrolled ? "" : "text-white",
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-teal-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
        <div ref={contactButtonRef} className="relative">
              <motion.div
                className="flex items-center"
                onClick={toggleContactDropdown}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "rounded-full transition-all duration-300",
                    scrolled
                      ? "border-teal-200 text-teal-700 hover:bg-teal-50/80 hover:text-teal-800 hover:border-teal-300"
                      : "text-teal-600 hover:bg-teal-50/80 hover:text-teal-800 hover:border-teal-300 bg-teal-50/80",
                    showContactDropdown && (scrolled ? "bg-teal-50/80 border-teal-300" : "border-teal-300 bg-teal-50/80 text-teal-800 border-teal-300"),
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    <span className="hidden lg:inline-block">{data.acf.contact_cta}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        showContactDropdown && "transform rotate-180",
                      )}
                    />
                  </div>
                </Button>
              </motion.div>

              {/* Contact Dropdown */}
              <AnimatePresence>
                {showContactDropdown && (
                  <motion.div
                    ref={contactDropdownRef}
                    className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/80 overflow-hidden z-50"
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Contactez-moi</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors group">
                          <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-3">
                            <div className="bg-teal-100 p-2 rounded-full group-hover:bg-teal-200 transition-colors">
                              <Phone className="h-4 w-4 text-teal-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{contactInfo.phone}</p>
                              <p className="text-xs text-gray-500">{data.acf.phone_subtitle}</p>
                            </div>
                          </a>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-teal-100 transition-colors"
                                onClick={() => copyToClipboard(contactInfo.phone, "phone")}
                              >
                                {copiedState.phone ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4 text-gray-500" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copiedState.phone ? "Copié !" : "Copier le numéro"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors group">
                          <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3">
                            <div className="bg-teal-100 p-2 rounded-full group-hover:bg-teal-200 transition-colors">
                              <Mail className="h-4 w-4 text-teal-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800 break-all pr-2">{contactInfo.email}</p>
                              <p className="text-xs text-gray-500">{data.acf.mail_subtitle}</p>
                            </div>
                          </a>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-teal-100 transition-colors flex-shrink-0"
                                onClick={() => copyToClipboard(contactInfo.email, "email")}
                              >
                                {copiedState.email ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4 text-gray-500" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copiedState.email ? "Copié !" : "Copier l'email"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 transition-colors group">
                          <a
                            href="https://maps.google.com/?q=14+rue+du+Château+d'Alon,+Châtelaillon-Plage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3"
                          >
                            <div className="bg-teal-100 p-2 rounded-full group-hover:bg-teal-200 transition-colors">
                              <MapPin className="h-4 w-4 text-teal-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{contactInfo.address}</p>
                              <p className="text-xs text-gray-500">{contactInfo.city}</p>
                            </div>
                          </a>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-teal-100 transition-colors"
                                onClick={() => copyToClipboard(contactInfo.address, "address")}
                              >
                                {copiedState.address ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4 text-gray-500" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copiedState.address ? "Copié !" : "Copier l'adresse"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50/80 p-3 border-t border-gray-100/80">
                      <div className="flex justify-between items-center">
                        <a
                          href={`https://wa.me/${formatPhoneNumber(contactInfo.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-gray-600 hover:text-teal-600 transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href="https://maps.google.com/?q=14+rue+du+Château+d'Alon,+Châtelaillon-Plage"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-gray-600 hover:text-teal-600 transition-colors"
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          <span>Itinéraire</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>    
          <Button
            asChild
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 rounded-full shadow-sm hover:shadow transition-all duration-300"
          >
            <Link href="#contact">{data.acf.rdv_cta}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-full"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[57px] bg-white/95 backdrop-blur-sm shadow-lg z-40 h-[calc(100vh-57px)] overflow-y-auto transform transition-transform duration-300 ease-in-out md:hidden ",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col p-6 ">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center py-3 px-4 rounded-lg text-lg transition-all duration-200",
                pathname === link.href ? "bg-teal-50 text-teal-700 font-medium" : "text-gray-700 hover:bg-gray-50",
              )}
            >
              {link.label}
              {pathname === link.href && <span className="ml-2 w-1.5 h-1.5 bg-teal-500 rounded-full" />}
            </Link>
          ))}

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col gap-4 text-gray-600">
              <div className="flex items-center gap-3 px-4 py-2">
                <Phone className="h-5 w-5 text-teal-500" />
                <span>{data.acf.phone}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2">
                <Mail className="h-5 w-5 text-teal-500" />
                <span className="break-all">{data.acf.mail}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2">
                <MapPin className="h-5 w-5 text-teal-500" />
                <span>{data.acf.address}</span>
              </div>
            </div>

            <Button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm">
              {data.acf.rdv_cta}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
