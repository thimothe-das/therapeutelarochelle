import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getPosts } from "@/lib/utils"

export default async function AboutPage() {
  const page = await getPosts("headerbanner")

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-r from-teal-900 to-teal-700 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos</h1>
          <p className="text-xl max-w-3xl">
            Thérapieeees TIFT (Trauma Integrating Flow Therapy), ICV-LI (Intégration du Cycle de Vie), EMDR, Schémas et
            Modes
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p>
              Nous pouvons tdddddous un jour être confrontés à des problèmes voire à des traumatismes qui nous submergent,
              nous font souffrir. Qu'ils soient récents, répétitifs ou plus enfouis. La démarche d'aller consulter un
              thérapeute, pour soi, son couple ou son enfant devient alors nécessaire et fait de plus en plus partie de
              notre quotidien.
            </p>

            <p>
              Je reçois en face à face, en cabinet en toute confidentialité, les adultes, les couples, les ados, les
              enfants. Le premier entretien permettra de cerner ensemble la problématique rencontrée et de définir vos
              attentes, vos objectifs et les modalités d'intervention.
            </p>

            <p>
              Durant toutes ces années, je me suis formé à différentes approches avec le souci constant de proposer des
              méthodes innovantes et reconnues (voire évaluées) pour leur efficacité.
            </p>

            <p>
              Je me suis principalement intéressé à la question du, ou plutôt des, Traumatismes (simples, complexes,
              développementaux).
            </p>

            <div className="my-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="aspect-square relative rounded-full overflow-hidden w-64 h-64 mx-auto border-4 border-teal-100 shadow-xl">
                  <Image
                    src="/images/therapist-portrait.jpg"
                    alt="Jean-Philippe DAS, Thérapeute"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Mes approches thérapeutiques</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    Le modèle le plus récent avec lequel je me suis formé est le modèle{" "}
                    <strong className="text-teal-700">TIFT (Trauma Integrating Flow Therapy)</strong>, qui date des
                    années 2020 et après.
                  </li>
                  <li>
                    Précédemment je me suis formé à l'<strong className="text-teal-700">ICV</strong>, approche pour
                    laquelle je suis agréé par l'<strong className="text-teal-700">AFICV</strong>.
                  </li>
                  <li>
                    L'<strong className="text-teal-700">EMDR</strong> est recommandée en France par la Haute Autorité de
                    Santé et par l'Institut national de la santé et de la recherche médicale (INSERM).
                  </li>
                  <li>
                    La <strong className="text-teal-700">Thérapie des Schémas</strong> a été elle aussi reconnue
                    scientifiquement dans différentes études cliniques.
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">TIFT (Trauma Integrating Flow Therapy)</h3>
            <p>
              Commencer une thérapie du trauma est une chance pour le client mais aussi un défi en vue de sa stabilité
              fragile. Tift travaille dans la zone de confort du client avec une exposition minimale aux traumatismes,
              permettant ainsi l'intégration et créant un sentiment de sécurité.
            </p>
            <p>
              La prise en compte de la structure de survie actuelle du client est une reconnaissance des efforts, des
              restrictions et des souffrances traversés, ce qui favorise un sentiment de compréhension et de confiance
              en soi.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">ICV-LI (Intégration du Cycle de Vie)</h3>
            <p>
              L'Intégration du Cycle de Vie est une thérapie qui a débuté dans les années 2000. C'est une psychothérapie
              psycho-corporelle qui s'appuie sur les neurosciences, la théorie de l'attachement, l'anxiété et les
              traumatismes.
            </p>
            <p>
              Lorsqu'un événement trop difficile ne peut être assimilé, il est déconnecté des autres réseaux neuronaux
              et n'est pas vécu comme passé lorsque l'on se le remémore.
            </p>
            <p>L'ICV permet d'apaiser nombre de problématiques et de se reconnecter à un sentiment de sécurité.</p>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">EMDR</h3>
            <p>
              L'EMDR est recommandée en France par la Haute Autorité de Santé et par l'Institut national de la santé et
              de la recherche médicale (INSERM) ainsi que par l'Organisation Mondiale de la Santé (OMS). L'EMDR permet
              d'apaiser et de retraiter les traumatismes.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">Thérapie des Schémas</h3>
            <p>
              Depuis son développement, la Thérapie des Schémas a été elle aussi reconnue scientifiquement dans
              différentes études cliniques. Elle a fait ses preuves dans la résolution des troubles du comportement
              (violence, angoisse Elle a fait ses preuves dans la résolution des troubles du comportement (violence,
              angoisse, addictions, dépression...).
            </p>

            <p>
              Ces approches thérapeutiques sont utilisées aujourd'hui par de nombreux psychologues, psychopraticiens ou
              thérapeutes.
            </p>
            <p>
              Elles peuvent être proposées à des adultes, des ados ou des enfants confrontés par exemple à des souvenirs
              traumatiques récents ou plus anciens (accident, agression, décès, maltraitance, humiliation ou négligence
              durant l'enfance, l'adolescence ou l'âge adulte).
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
              <Link href="#contact">Prendre rendez-vous</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}



