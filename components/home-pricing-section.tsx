"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, fetcher } from "@/lib/utils";
import useSWR from "swr";

export function HomePricingSection() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/pages?slug=pricing`,
    fetcher
  );

  const pricingPlans = data?.acf.cards?.map((plan: any) => ({
    name: plan.title,
    price: plan.price,
    description: plan.subtitle,
    features: plan.features,
    popular: plan.isPopular,
    cta_url: plan.cta_url,
    cta_text: plan.action_button,
    lines: plan.lines,
  }));

  return (
    <section className="py-16 px-4 bg-gray-50" id="prestation">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {data?.acf.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {data?.acf.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {pricingPlans?.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md",
                plan.popular
                  ? "border-teal-200 shadow-teal-100"
                  : "border-gray-200"
              )}
            >
              {plan.popular && (
                <div className="absolute right-0 top-0 z-10">
                  <div className="bg-teal-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Populaire
                  </div>
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-3xl font-bold tracking-tight text-gray-900">
                    {plan.price}€
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    / séance
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.lines?.map((line: any) => (
                    <li key={line.text} className="flex items-start gap-2">
                      <Check className="h-4 w-4 flex-shrink-0 text-teal-500 mt-0.5" />
                      <span className="text-sm text-gray-700">{line.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Button
                    asChild
                    className={cn(
                      "w-full",
                      plan.popular
                        ? "bg-teal-600 hover:bg-teal-700 text-white"
                        : "bg-white border-teal-600 text-teal-600 hover:bg-teal-50"
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    size="sm"
                  >
                    <Link href={plan.cta_url}>{plan.cta_text}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {data?.acf.action_button_link && (
          <div className="text-center">
            <Button
              asChild
              variant="ghost"
              className="group text-teal-700 hover:text-teal-800"
            >
              <Link
                href={data?.acf.action_button_link}
                className="flex items-center gap-2"
              >
                {data?.acf.action_button}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
