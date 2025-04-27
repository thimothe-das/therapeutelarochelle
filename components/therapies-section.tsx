"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import parse from "html-react-parser";
interface TherapyApproach {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  description: string;
  quote?: string;
  quoteAuthor?: string;
  learnMoreUrl?: string;
}

export function TherapiesSection() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/pages?slug=proposed_therapies`,
    fetcher
  );
  const [selectedTherapy, setSelectedTherapy] =
    useState<TherapyApproach | null>(null);

  const openTherapyModal = (therapy: TherapyApproach) => {
    setSelectedTherapy(therapy);
  };

  const closeTherapyModal = () => {
    setSelectedTherapy(null);
  };
  if (!data) return null;
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            {data.acf.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {parse(data.acf.subtitle)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.acf.liste_des_therapies_proposees.map(
            (therapy: any, index: number) => (
              <React.Fragment key={index}>
                <TherapyCard
                  key={index}
                  therapy={therapy}
                  index={index}
                  onClick={() => openTherapyModal(therapy)}
                />
              </React.Fragment>
            )
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedTherapy && (
          <Dialog open={!!selectedTherapy} onOpenChange={closeTherapyModal}>
            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-white">
              <div className="flex flex-col md:flex-row">
                {/* Image Section - Fixed to prevent cropping */}
                <div className="md:w-2/5 bg-gray-100 flex items-center justify-center p-4 md:p-6">
                  <div className="relative w-full h-auto aspect-square md:aspect-auto md:h-full max-h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={selectedTherapy.therapy_elements.img.url}
                      alt={selectedTherapy.therapy_elements.img.alt}
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>

                {/* Content Section - Improved layout and spacing */}
                <div className="md:w-3/5 p-6 md:p-8 max-h-[80vh] md:max-h-[600px] overflow-y-auto">
                  <div className="hidden md:block mb-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                        {selectedTherapy.therapy_elements.description_title}
                      </DialogTitle>
                      <DialogDescription className="text-base text-gray-600 mt-1">
                        {selectedTherapy.therapy_elements.subtitle}
                      </DialogDescription>
                    </DialogHeader>
                  </div>

                  <div className="space-y-6">
                    <div className="prose prose-sm max-w-none text-gray-600 text-sm">
                      <p>
                        {parse(selectedTherapy.therapy_elements.description)}
                      </p>
                    </div>

                    {selectedTherapy.therapy_elements.quote && (
                      <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-400 italic text-sm text-gray-700">
                        "{selectedTherapy.therapy_elements.quote}"
                        {selectedTherapy.therapy_elements.quoteAuthor && (
                          <div className="mt-2 text-xs text-gray-500 not-italic">
                            — {selectedTherapy.therapy_elements.quoteAuthor}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      {selectedTherapy.therapy_elements.link && (
                        <Button
                          asChild
                          variant="outline"
                          className="text-teal-600 border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                        >
                          <a
                            href={selectedTherapy.therapy_elements.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            En savoir plus{" "}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      )}

                      <DialogClose asChild>
                        <Button variant="ghost" className="text-gray-500">
                          Fermer
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}

interface TherapyCardProps {
  therapy: TherapyApproach;
  index: number;
  onClick: () => void;
}

function TherapyCard({ therapy, index, onClick }: TherapyCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={therapy.therapy_elements.img.url}
            alt={therapy.therapy_elements.img.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">
                  {therapy.therapy_elements.icon}
                </span>
                {therapy.therapy_elements.description_title}
              </h3>
              <p className="text-white/90 text-sm">
                {therapy.therapy_elements.subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="text-gray-600 text-sm line-clamp-3 flex-1">
            {parse(therapy.therapy_elements.description)}
          </div>
          <div className="mt-4 flex items-center justify-end text-teal-600 group-hover:text-teal-700 transition-colors">
            <span className="text-sm font-medium">En savoir plus</span>
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
