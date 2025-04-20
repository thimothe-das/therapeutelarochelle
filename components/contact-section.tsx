"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn, fetcher } from "@/lib/utils"
import useSWR from "swr"
import parse from "html-react-parser"
import axios from "axios"

interface TimeSlot {
  id: string
  label: string
  active: boolean
}

interface DayAvailability {
  day: string
  dayLabel: string
  active: boolean
  selected: boolean
  timeSlots: TimeSlot[]
  selectedTimeSlots: string[]
}

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  availability: DayAvailability[]
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  message?: string
  availability?: string
}

export function ContactSection() {
  const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/pages?slug=contact`, fetcher)

  const timeSlots: TimeSlot[] = data?.acf.availabilities_hours.map((hour: any) => ({
    id: hour.hour,
    label: hour.hour,
    active: hour.active
  }))
  
  const days = data?.acf.days
  const initialAvailability: DayAvailability[] =  days?.map((day: any) => ({
    day: day.day,
    dayLabel: day.day,
    active: day.active,
    selected: false,
    timeSlots,
    selectedTimeSlots: []
  })) || []

  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    availability: initialAvailability,
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [expandedDays, setExpandedDays] = useState<string[]>([])

  const formRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 })
  const isMapInView = useInView(mapRef, { once: true, amount: 0.2 })
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 })

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setFormState({
      ...formState,
      availability: initialAvailability
    })
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const toggleDaySelection = (dayIndex: number) => {
    // Get the current state of the day being toggled
    const currentDay = formState.availability[dayIndex];
    const willBeSelected = !currentDay.selected;
    const dayId = currentDay.day;
    
    
    // Create a new availability array with the updated selection
    const newAvailability = formState.availability.map((day, idx) => {
      if (idx === dayIndex) {
        // If we're deselecting, also clear the time slots
        const newSelectedTimeSlots = willBeSelected ? day.selectedTimeSlots : [];
        return { 
          ...day, 
          selected: willBeSelected,
          selectedTimeSlots: newSelectedTimeSlots

        };
      }
      return day;
    });
    
    // Update the form state
    setFormState(prev => ({
      ...prev,
      availability: newAvailability
    }));
    
    // Handle expanded days based on new selection state
    if (willBeSelected) {
      // If selecting the day, add it to expanded days
      setExpandedDays(prev => {
        if (!prev.includes(dayId)) {
          return [...prev, dayId];
        }
        return prev;
      });
    } else {
      // If deselecting, remove it from expanded days
      setExpandedDays(prev => {
        if (prev.includes(dayId)) {
          return prev.filter(d => d !== dayId);
        }
        return prev;
      });
    }
  };

  const toggleTimeSlot = (dayIndex: number, timeSlotId: string) => {
    
    // Get current state
    const currentDay = formState.availability[dayIndex];
    const isTimeSlotSelected = currentDay.selectedTimeSlots.includes(timeSlotId);
    
    // Create a completely new availability array to avoid mutation issues
    const newAvailability = formState.availability.map((day, idx) => {
      if (idx === dayIndex) {
        // Create a new selectedTimeSlots array
        let newSelectedTimeSlots;
        if (isTimeSlotSelected) {
          // Remove the time slot if it's already selected
          newSelectedTimeSlots = day.selectedTimeSlots.filter(id => id !== timeSlotId);
        } else {
          // Add the time slot if it's not already selected
          newSelectedTimeSlots = [...day.selectedTimeSlots, timeSlotId];
        }
        
        // Ensure the day is marked as selected if we're adding a time slot
        const needsToBeSelected = !isTimeSlotSelected && !day.selected;
        if (needsToBeSelected) {
          // Also expand the day if we're selecting it
          if (!expandedDays.includes(day.day)) {
            setExpandedDays(prev => [...prev, day.day]);
          }
        }
        
        // Return a new day object with the updated selectedTimeSlots
        return {
          ...day,
          selected: needsToBeSelected ? true : day.selected,
          selectedTimeSlots: newSelectedTimeSlots
        };
      }
      // Return unchanged days
      return day;
    });
    
    // Update the form state with the new availability
    setFormState(prev => ({
      ...prev,
      availability: newAvailability
    }));
  };

  const toggleDayExpansion = (day: string) => {
    setExpandedDays((prev) => {
      const isExpanded = prev.includes(day)
      
      let newExpandedDays;
      if (isExpanded) {
        newExpandedDays = prev.filter((d) => d !== day)
      } else {
        newExpandedDays = [...prev, day]
      }
      
      return newExpandedDays
    })
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formState.firstName.trim()) {
      errors.firstName = "Le prénom est requis"
    }

    if (!formState.lastName.trim()) {
      errors.lastName = "Le nom est requis"
    }

    if (!formState.email.trim()) {
      errors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "Format d'email invalide"
    }

    if (!formState.message.trim()) {
      errors.message = "Veuillez écrire un message"
    }

    // Check if at least one day and time slot is selected
    const hasAvailability = formState.availability.some((day) => day.selected && day.selectedTimeSlots.length > 0)

    if (!hasAvailability) {
      errors.availability = "Veuillez sélectionner au moins un jour et un créneau horaire"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const formatAvailabilityForEmail = (availability: DayAvailability[]): string => {
    // Filter to only include days that are selected and have time slots
    const selectedDays = availability.filter(day => 
      day.selected && day.selectedTimeSlots.length > 0
    );
    
    if (selectedDays.length === 0) {
      return "Aucune disponibilité sélectionnée";
    }
    
    // Format each day and its time slots
    return selectedDays.map(day => {
      const timeSlots = day.selectedTimeSlots
        .map(timeId => day.timeSlots.find(t => t.id === timeId)?.label)
        .filter(Boolean)
        .join(", ");
      
      return `${day.dayLabel}: ${timeSlots}`;
    }).join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      var bodyFormData = new FormData();
      bodyFormData.append("first_name", formState.firstName);
      bodyFormData.append("last_name", formState.lastName);
      bodyFormData.append("email", formState.email);
      bodyFormData.append("phone", formState.phone);
      bodyFormData.append("message", formState.message);
      // Format availability for email
      bodyFormData.append("availability", formatAvailabilityForEmail(formState.availability));
      await axios({
        method: "post",
        url: "https://administration.therapeutelarochelle.fr/wp-json/contact-form-7/v1/contact-forms/128/feedback",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Success
      setSubmitStatus("success")
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        availability: initialAvailability,
      })
      setExpandedDays([])

      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error")

      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSelectedAvailabilityText = () => {
    const selectedDays = formState.availability.filter((day) => day.selected && day.selectedTimeSlots.length > 0)

    if (selectedDays.length === 0) return "Aucune disponibilité sélectionnée"

    return selectedDays
      .map((day) => {
        const timeLabels = day.selectedTimeSlots
          .map((timeId) => day.timeSlots.find((t) => t.id === timeId)?.label)
          .join(", ")

        return `${day.dayLabel}: ${timeLabels}`
      })
      .join(" • ")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      id="contact"
      style={{
        backgroundImage: "url('/serene-teal-flow.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
            {data?.acf.title}
          </h2>
          <div className="text-lg text-gray-600 max-w-3xl mx-auto">
            {parse(data?.acf.subtitle || "")}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden"
            variants={fadeIn}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-teal-200 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-teal-200 rounded-br-2xl"></div>

            <h3 className="text-2xl font-semibold mb-6 text-gray-800 relative z-10">{data?.acf.form_title}</h3>

            {submitStatus === "success" ? (
              <motion.div
                className="bg-green-50 border border-green-100 rounded-xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h4 className="text-2xl font-medium text-green-800 mb-3">Message envoyé avec succès !</h4>
                <p className="text-green-700 mb-6">
                  Merci pour votre message. Je vous répondrai dans les meilleurs délais, généralement sous 24-48h.
                </p>
                <Button onClick={() => setSubmitStatus("idle")} className="bg-green-600 hover:bg-green-700 text-white">
                  Envoyer un autre message
                </Button>
              </motion.div>
            ) : submitStatus === "error" ? (
              <motion.div
                className="bg-red-50 border border-red-100 rounded-xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                </motion.div>
                <h4 className="text-2xl font-medium text-red-800 mb-3">Une erreur est survenue</h4>
                <p className="text-red-700 mb-6">
                  Veuillez réessayer ou me contacter directement par téléphone au 06 86 38 45 23.
                </p>
                <Button onClick={() => setSubmitStatus("idle")} className="bg-red-600 hover:bg-red-700 text-white">
                  Réessayer
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="firstName" className="text-gray-700">
                      Prénom
                    </Label>
                    <div className="relative">
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        className={cn(
                          "border-gray-200 focus:border-teal-500 focus:ring-teal-500 pl-3 transition-all duration-300 h-12",
                          formErrors.firstName && "border-red-300 focus:border-red-500 focus:ring-red-500",
                          formState.firstName && "border-teal-200",
                        )}
                        placeholder="Votre prénom"
                      />
                      {formState.firstName && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </motion.div>
                      )}
                    </div>
                    {formErrors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {formErrors.firstName}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="lastName" className="text-gray-700">
                      Nom
                    </Label>
                    <div className="relative">
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                        className={cn(
                          "border-gray-200 focus:border-teal-500 focus:ring-teal-500 pl-3 transition-all duration-300 h-12",
                          formErrors.lastName && "border-red-300 focus:border-red-500 focus:ring-red-500",
                          formState.lastName && "border-teal-200",
                        )}
                        placeholder="Votre nom"
                      />
                      {formState.lastName && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </motion.div>
                      )}
                    </div>
                    {formErrors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {formErrors.lastName}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={cn(
                        "border-gray-200 focus:border-teal-500 focus:ring-teal-500 pl-3 transition-all duration-300 h-12",
                        formErrors.email && "border-red-300 focus:border-red-500 focus:ring-red-500",
                        formState.email && "border-teal-200",
                      )}
                      placeholder="votre.email@exemple.com"
                    />
                    {formState.email && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </motion.div>
                    )}
                  </div>
                  {formErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="phone" className="text-gray-700">
                    Téléphone (optionnel)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    className="border-gray-200 focus:border-teal-500 focus:ring-teal-500 pl-3 transition-all duration-300 h-12"
                    placeholder="06 XX XX XX XX"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="message" className="text-gray-700">
                    Votre message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    className={cn(
                      "min-h-[150px] border-gray-200 focus:border-teal-500 focus:ring-teal-500 transition-all duration-300",
                      formErrors.message && "border-red-300 focus:border-red-500 focus:ring-red-500",
                    )}
                    placeholder="Décrivez votre demande, vos disponibilités ou vos questions..."
                  />
                  {formErrors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {formErrors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Advanced Availability Selection */}
                <motion.div
                  className="space-y-4 pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-teal-600" />
                      Vos disponibilités
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Sélectionnez les jours et horaires qui vous conviendraient pour un rendez-vous.
                    </p>
                  </div>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                    {formState.availability.map((day, dayIndex) => (
                      <div key={day.day} className="rounded-lg overflow-hidden border border-gray-200 bg-white">
                        <div
                          className={cn(
                            "flex items-center justify-between p-3 cursor-pointer transition-colors",
                            day.selected && day.active && "bg-teal-50 border-b border-teal-100",
                            !day.active && "opacity-50 cursor-not-allowed",
                            day.active && !day.selected && "hover:border-teal-200 hover:bg-teal-50/50" 
                          )}
                          onClick={(e) => {
                            if (day.active) {
                              toggleDaySelection(dayIndex)
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full mr-3 flex items-center justify-center border",
                                day.selected ? "bg-teal-500 border-teal-500" : "border-gray-300",
                              )}
                            >
                              {day.selected && <CheckCircle className="h-4 w-4 text-white" />}
                            </div>
                            <span className="font-medium">{day.dayLabel}</span>
                          </div>

                          {day.selected && (
                            <Button
                              type="button"
                              disabled={!day.active}
                              variant="ghost"
                              size="sm"
                              className={cn("h-8 w-8 p-0 rounded-full", !day.active && "opacity-50 cursor-not-allowed")}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDayExpansion(day.day);
                              }}
                            >
                              {expandedDays.includes(day.day) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>

                        <AnimatePresence>
                          {day.selected && expandedDays.includes(day.day) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-3 bg-white">
                                <p className="text-sm text-gray-500 mb-2">Sélectionnez vos créneaux horaires :</p>
                                <div className="grid grid-cols-2 gap-2">
                                  {day.timeSlots.map((timeSlot) => (
                                    <motion.div
                                      key={timeSlot.id}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={cn(
                                        "flex items-center justify-center p-2 rounded-lg border cursor-pointer transition-all duration-200",
                                        day.selectedTimeSlots.includes(timeSlot.id)
                                          ? "bg-teal-50 border-teal-300 text-teal-700"
                                          : "bg-white border-gray-200 text-gray-700",
                                        !timeSlot.active && "opacity-50 cursor-not-allowed",
                                        timeSlot.active && !day.selectedTimeSlots.includes(timeSlot.id) && "hover:border-teal-200 hover:bg-teal-50/50"
                                      )}

                                      onClick={(e) => {
                                        if (timeSlot.active) {
                                          e.stopPropagation();
                                          toggleTimeSlot(dayIndex, timeSlot.id);
                                        }
                                      }}
                                    >
                                      <Clock className="mr-2 h-4 w-4" />
                                      <span className="text-sm">{timeSlot.label}</span>
                                      {day.selectedTimeSlots.includes(timeSlot.id) && (
                                        <CheckCircle className="ml-2 h-4 w-4 text-teal-600" />
                                      )}
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}

                    {/* Selected availability summary */}
                    <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-100">
                      <h5 className="text-sm font-medium text-teal-800 mb-1">Disponibilités sélectionnées :</h5>
                      <p className="text-sm text-teal-700">{getSelectedAvailabilityText()}</p>
                    </div>

                    {formErrors.availability && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {formErrors.availability}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="mr-2 h-5 w-5" /> Envoyer ma demande
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Map and Contact Info */}
          <motion.div
            ref={mapRef}
            variants={fadeIn}
            initial="hidden"
            animate={isMapInView ? "visible" : "hidden"}
            className="flex flex-col gap-8"
          >
            {/* Contact Info Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-teal-50 rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-teal-50 rounded-full"></div>

              <h3 className="text-2xl font-semibold mb-6 text-gray-800 relative z-10">{data?.acf.contact_title}</h3>

              <div className="space-y-6 relative z-10">
                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-teal-50 p-3 rounded-full group-hover:bg-teal-100 transition-colors duration-300">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{data?.acf.contact_infos.address.title}</h4>
                    <p className="text-gray-600">{data?.acf.contact_infos.address.subtitle}</p>
                    <p className="text-gray-500 text-sm mt-1">{data?.acf.contact_infos.address.last_subtitle}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-teal-50 p-3 rounded-full group-hover:bg-teal-100 transition-colors duration-300">
                    <Phone className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{data?.acf.contact_infos.phone.title}</h4>
                    <p className="text-gray-600">{data?.acf.contact_infos.phone.subtitle}</p>
                    <p className="text-gray-500 text-sm mt-1">{data?.acf.contact_infos.phone.last_subtitle}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-teal-50 p-3 rounded-full group-hover:bg-teal-100 transition-colors duration-300">
                    <Mail className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{data?.acf.contact_infos.email.title}</h4>
                    <p className="text-gray-600">{data?.acf.contact_infos.email.subtitle}</p>
                    <p className="text-gray-500 text-sm mt-1">{data?.acf.contact_infos.email.last_subtitle}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-teal-50 p-3 rounded-full group-hover:bg-teal-100 transition-colors duration-300">
                    <Calendar className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{data?.acf.contact_infos.schedule.title}</h4>
                    <p className="text-gray-600">{data?.acf.contact_infos.schedule.subtitle}</p>
                    <p className="text-gray-500 text-sm mt-1">{data?.acf.contact_infos.schedule.last_subtitle}</p>
                  </div>
                </motion.div>
              </div>

              {data?.acf.note && (
                <div className="mt-8 pt-6 border-t border-gray-100 relative z-10">
                  <div className="p-4 bg-teal-50 rounded-xl">
                    <div className="text-teal-800 text-sm">{parse(data?.acf.note)}</div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white h-[400px] relative">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.0408509284473!2d-1.0923908233508682!3d45.9983835710249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48015c3b3b0d7e7d%3A0x405d39260ee9640!2s14%20Rue%20du%20Ch%C3%A2teau%20d&#39;Alon%2C%2017340%20Ch%C3%A2telaillon-Plage!5e0!3m2!1sfr!2sfr!4v1713456789012!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cabinet de Jean-Philippe DAS"
                className={cn("w-full h-full transition-opacity duration-500", mapLoaded ? "opacity-100" : "opacity-0")}
                onLoad={() => setMapLoaded(true)}
              ></iframe>

              {/* Custom map overlay */}
              {mapLoaded && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-teal-600" />
                    <span className="text-sm font-medium text-gray-800">Cabinet de Jean-Philippe DAS</span>
                  </div>
                </div>
              )}
            </div>

            {/* Testimonial */}
            <motion.div
              className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute -top-10 -left-10 text-teal-400 opacity-20 text-9xl">"</div>
              <div className="relative z-10">
                <p className="italic mb-6 text-lg">
                  {data?.acf.citation}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold">JD</span>
                  </div>
                  <div>
                    <p className="font-medium">Jean-Philippe DAS</p>
                    <p className="text-sm text-teal-100">Psychothérapeute</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
