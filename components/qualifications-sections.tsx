"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion"
import { Calendar, Award, BookOpen, GraduationCap, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, fetcher } from "@/lib/utils"
import useSWR from "swr"

interface Certification {
  id: string
  name: string
  institution: string
  year: string
  description: string
  logo: string
  category: "diploma" | "certification" | "membership"
  link?: string
}

export function QualificationsSection() {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState("all")
  const carouselRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const isInView = useInView(carouselRef, { once: false, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    // Reset active index when category changes
    setActiveIndex(0)
  }, [activeCategory])


  const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/pages?slug=mybackground`, fetcher)

  const certifications: Certification[] = data?.acf.formations.map((formation: any, index: number) => ({
    id: index,
    name: formation.title,
    institution: formation.subtitle,
    year: formation.date,
    description: formation.description,
    logo: formation.logo.url,
    category: formation.category,
    link: formation.link,
  }))
  
  
  

  const filteredCertifications =
    activeCategory === "all" ? certifications : certifications.filter((cert) => cert.category === activeCategory)


  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % filteredCertifications.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + filteredCertifications.length) % filteredCertifications.length)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="py-20 px-4 bg-white overflow-hidden" id="qualifications">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold mb-4 text-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            {data?.acf.title}
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {data?.acf.subtitle}
          </motion.p>
        </div>

        <Tabs defaultValue="all" className="mb-12" value={activeCategory} onValueChange={setActiveCategory}>
          <div className="flex justify-center mb-12 px-2 md:px-0">
            <TabsList className="bg-gray-100 p-1 rounded-full flex-nowrap min-w-fit">
              <TabsTrigger
                value="all"
                className="rounded-full px-3 md:px-6 text-sm whitespace-nowrap data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Toutes
              </TabsTrigger>
              <TabsTrigger
                value="diploma"
                className="rounded-full px-3 md:px-6 text-sm whitespace-nowrap data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Diplômes
              </TabsTrigger>
              <TabsTrigger
                value="certification"
                className="rounded-full px-3 md:px-6 text-sm whitespace-nowrap data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Certifications
              </TabsTrigger>
              <TabsTrigger
                value="membership"
                className="rounded-full px-3 md:px-6 text-sm whitespace-nowrap data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                Affiliations
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Featured Carousel */}
          <div className="relative mb-16" ref={carouselRef}>
            <motion.div
              className="flex justify-center items-center"
              initial="hidden"
              animate={controls}
              variants={staggerContainer}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-3xl"
                >
                  <FeaturedCertificationCard
                    certification={filteredCertifications?.[activeIndex]}
                    onClick={() => setSelectedCertification(filteredCertifications[activeIndex])}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Carousel Controls */}
            <div className="absolute top-1/2 left-0 right-0 -mt-6 flex justify-between pointer-events-none px-4 md:px-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm border-gray-200 shadow-md pointer-events-auto hover:bg-white"
                onClick={prevSlide}
                aria-label="Certification précédente"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm border-gray-200 shadow-md pointer-events-auto hover:bg-white"
                onClick={nextSlide}
                aria-label="Certification suivante"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mb-12">
            {filteredCertifications?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-teal-600 w-8" : "bg-gray-300 hover:bg-gray-400",
                )}
                aria-label={`Aller à la certification ${index + 1}`}
              />
            ))}
          </div>

          {/* Grid View */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {filteredCertifications?.map((cert, index) => (
              <CertificationCard
                key={cert.id}
                certification={cert}
                index={index}
                onClick={() => setSelectedCertification(cert)}
              />
            ))}
          </motion.div>
        </Tabs>

        <div className="text-center mt-16">
          <motion.p
            className="text-gray-600 italic mb-6 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            "{data?.acf.citation}"
          </motion.p>
          {data?.acf.end_button_link && <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              asChild
              variant="outline"
              className="border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300"
            >
              <Link href={data?.acf.action_button_link}>{data?.acf.end_button}</Link>
            </Button>
          </motion.div>}
        </div>
      </div>

      {/* Certification Detail Dialog */}
      <Dialog open={!!selectedCertification} onOpenChange={(open) => !open && setSelectedCertification(null)}>
        <DialogContent className="sm:max-w-lg">
          <AnimatePresence>
            {selectedCertification && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-xl">{selectedCertification.name}</DialogTitle>
                  <DialogDescription className="text-gray-500">
                    {selectedCertification.institution} • {selectedCertification.year}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <motion.div
                    className="relative w-40 h-40 bg-gray-50 rounded-lg p-4 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={selectedCertification.logo || "/placeholder.svg"}
                      alt={`Logo ${selectedCertification.institution}`}
                      fill
                      className="object-contain p-2"
                      sizes="160px"
                    />
                  </motion.div>
                  <p className="text-gray-700 text-center">{selectedCertification.description}</p>
                  {selectedCertification.link && (
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <a
                        href={selectedCertification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Visiter le site <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  )
}

interface FeaturedCertificationCardProps {
  certification: Certification
  onClick: () => void
}

function FeaturedCertificationCard({ certification, onClick }: FeaturedCertificationCardProps) {
  if (!certification) return null
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 p-8 flex items-center justify-center bg-gradient-to-br from-teal-50 to-gray-50">
          <div className="relative w-48 h-48 transition-all duration-500 group-hover:scale-105">
            <Image
              src={certification.logo || "/placeholder.svg"}
              alt={`Logo ${certification.institution}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 192px, 192px"
            />
          </div>
        </div>
        <div className="md:w-3/5 p-8">
          <div className="flex items-center gap-2 mb-4">
            {certification.category === "diploma" && (
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" /> Diplôme
              </span>
            )}
            {certification.category === "certification" && (
              <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Award className="h-3.5 w-3.5" /> Certification
              </span>
            )}
            {certification.category === "membership" && (
              <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" /> Affiliation
              </span>
            )}
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {certification.year}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
            {certification.name}
          </h3>
          <p className="text-gray-500 mb-4">{certification.institution}</p>
          <p className="text-gray-700 mb-6 line-clamp-3">{certification.description}</p>
          <div className="flex items-center text-teal-600 font-medium group-hover:text-teal-700 transition-colors">
            <span>Voir les détails</span>
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface CertificationCardProps {
  certification: Certification
  index: number
  onClick: () => void
}

function CertificationCard({ certification, index, onClick }: CertificationCardProps) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "diploma":
        return <GraduationCap className="h-4 w-4" />
      case "certification":
        return <Award className="h-4 w-4" />
      case "membership":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "diploma":
        return "Diplôme"
      case "certification":
        return "Certification"
      case "membership":
        return "Affiliation"
      default:
        return "Certification"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "diploma":
        return "bg-blue-50 text-blue-700"
      case "certification":
        return "bg-teal-50 text-teal-700"
      case "membership":
        return "bg-purple-50 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer h-full"
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="relative w-16 h-16 bg-gray-50 rounded-lg p-2 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={certification.logo || "/placeholder.svg"}
                alt={`Logo ${certification.institution}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </motion.div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(certification.category)}`}
            >
              {getCategoryIcon(certification.category)}
              <span>{getCategoryLabel(certification.category)}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
            {certification.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3">{certification.institution}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-auto">
            <Calendar className="h-4 w-4" />
            <span>{certification.year}</span>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 text-sm text-center text-gray-600 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
          <motion.span className="flex items-center justify-center gap-1" initial={{ x: 0 }} whileHover={{ x: 5 }}>
            Voir les détails
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
