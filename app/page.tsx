import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPosts } from "@/lib/utils"
import parse from "html-react-parser"
import { HomePricingSection } from "@/components/home-pricing-section"
import { QualificationsSection } from "@/components/qualifications-sections"
import { ContactSection } from "@/components/contact-section"

export default async function Home() {
  const headerbanner = await getPosts("headerbanner")
  const about = await getPosts("about")
  const therapies = await getPosts("proposed_therapies")
  const myOffice = await getPosts("my_office")

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[100vh] w-full" id="home">
        <Image
          src={headerbanner.acf.background_img.url}
          alt="Vue de Châtelaillon-Plage"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 md:p-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">{headerbanner.acf.principal_title}</h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
            {parse(headerbanner.acf.subtitle)}
          </p>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl">
            {parse(headerbanner.acf.details)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
              <Link href="#contact">{headerbanner.acf.cta_btn_left}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              <Link href="#about">{headerbanner.acf.cta_btn_right}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4 bg-white" id="about">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{about.acf.title}</h2>
              <div className="text-gray-600 mb-4 leading-relaxed line-clamp-10 overflow-hidden">
                {parse(about.acf.text)}
              </div>
          
         {about.acf.action_button_link && <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link href={about.acf.action_button_link}>{about.acf.action_button.text}</Link>
              </Button>}
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-square relative rounded-full overflow-hidden w-72 h-72 mx-auto border-4 border-teal-100 shadow-xl">
                <Image
                  src={about.acf.therapeute_img.url}
                  alt={about.acf.therapeute_img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 288px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapies Section */}
      <section className="py-20 px-4 bg-gray-50" id="therapies">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">{therapies.acf.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapies.acf.liste_des_therapies_proposees.map((therapy, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{therapy.therapy_elements.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{therapy.therapy_elements.description_title}</h3>
                <div className="text-gray-600 line-clamp-5">{parse(therapy.therapy_elements.description)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cabinet Section */}
      <section className="py-20 px-4 bg-white" id="cabinet">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{myOffice.acf.titre}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {parse(myOffice.acf.sous_titre)}
              </p>
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-teal-600 h-5 w-5" />
                  <span className="text-gray-700">{myOffice.acf.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-teal-600 h-5 w-5" />
                  <span className="text-gray-700">{myOffice.acf.phone_number}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-teal-600 h-5 w-5" />
                  <span className="text-gray-700">{myOffice.acf.email}</span>
                </div>
              </div>
              <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link href={myOffice.acf.button.link}>{myOffice.acf.button.text}</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {myOffice.acf.images.map((image, index) => (
                  <div key={index} className="aspect-[4/3] relative rounded-lg overflow-hidden">
                    <Image
                      src={image.image.url}
                      alt={image.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>
                ))}
           
              </div>
            </div>
          </div>
        </div>
      </section>
      <QualificationsSection />
      <HomePricingSection />
      <ContactSection />
    </div>
  )
}


