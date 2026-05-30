"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: "📋",
    title: "Express RFQ Posting",
    description:
      "Post your material requirements in under 60 seconds — plain text or photo. Our AI parses item, quantity, and specs automatically.",
    tag: "Contractor",
  },
  {
    icon: "🎯",
    title: "Smart Lead Routing",
    description:
      "RFQs are automatically routed to relevant manufacturers based on category, location, and capacity. No manual search needed.",
    tag: "Platform",
  },
  {
    icon: "⚡",
    title: "Live Bidding Room",
    description:
      "Manufacturers quote Base Rate + Freight in a transparent bidding environment. Real-time updates, no hidden margins.",
    tag: "Manufacturer",
  },
  {
    icon: "📊",
    title: "L1/L2 Ranked Bids",
    description:
      "All bids ranked by Total Landed Cost. Clear L1, L2, L3 positioning so you always see the best deal at a glance.",
    tag: "Contractor",
  },
  {
    icon: "✅",
    title: "Verified Manufacturers",
    description:
      "Every manufacturer is GSTIN & Udyam verified. No traders, no distributors — only direct factory connections.",
    tag: "Trust",
  },
  {
    icon: "🔒",
    title: "Accept L1 & Connect",
    description:
      "Accept the lowest bid to unlock direct manufacturer contact. Execute deals offline with full transparency.",
    tag: "Platform",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

function Features() {
  return (
    <section className="py-24 lg:py-32 bg-bg-primary" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            From RFQ to L1 Bid in{" "}
            <span className="gradient-accent-text">48 Hours</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            A streamlined procurement workflow that eliminates middlemen and
            brings factory-gate transparency to every transaction.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card
                variant="default"
                hover={true}
                padding="lg"
                className="h-full group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-text-primary">
                        {feature.title}
                      </h3>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider
                      bg-accent-subtle text-accent mb-3">
                      {feature.tag}
                    </span>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { Features };
