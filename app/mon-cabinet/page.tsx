import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPosts } from "@/lib/utils"
import parse from "html-react-parser"
export default async function OfficePage() {
  const page = await getPosts("about")
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-r from-teal-900 to-teal-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.acf.title}</h1>
          <p className="text-xl max-w-3xl">{parse(page.acf.description)}</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Informations pratiques</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p>
                  J'exerce désormais uniquement à Châtelaillon-Plage au 14 rue du Château d'Alon (mon cabinet de La
                  Rochelle est désormais fermé).
                </p>
                <p>
                  N'ayant pas de salle d'attente, merci de venir à l'heure précise de votre rendez-vous et de sonner
                  (sonnette sur rue). Je viendrai vous accueillir.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Coordonnées</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-teal-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">14 rue du Château d'Alon, Châtelaillon-Plage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-teal-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">06 86 38 45 23</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-teal-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">contact@therapeutelarochelle.fr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-teal-600 h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">Consultations sur rendez-vous uniquement</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Link href="#contact">Prendre rendez-vous</Link>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href="https://maps.google.com/?q=14+rue+du+Château+d'Alon,+Châtelaillon-Plage"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir sur Google Maps
                  </a>
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 aspect-video relative rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/cabinet-3.jpg"
                    alt="Vue intérieure du cabinet"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
                    Le cabinet, à Châtelaillon-Plage
                  </div>
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/cabinet-1.jpg"
                    alt="Détail du cabinet"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/cabinet-2.jpg"
                    alt="Entrée du cabinet"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
