"use client"

import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { fetcher } from "@/lib/utils"
import useSWR from "swr"

export  function SiteFooter() {
  const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/pages?slug=footer`, fetcher)
  if (!data) return null

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">{data?.acf.left.title}</h3>
            <p className="mb-4">{data?.acf.left.description}</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-400" />
                <span>{data?.acf.left.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-400" />
                <span>{data?.acf.left.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-teal-400" />
                <span>{data?.acf.left.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">{data?.acf.middle.title}</h3>
            <ul className="space-y-2">
              {data?.acf.middle.lines.map((line: any, index: number) => (
                <li key={index}>
                  <Link href={line.link} className="hover:text-teal-400 transition-colors">
                    {line.text}
                  </Link>
                </li>
              ))}
                </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">{data?.acf.right.title}</h3>
            <ul className="space-y-2">
              {data?.acf.right.lines.map((line: any, index: number) => (
                <li key={index}>
                  <Link href={line.link} className="hover:text-teal-400 transition-colors">
                    {line.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Jean-Philippe DAS. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
