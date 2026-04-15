import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { testimonials } from "@/src/data/travelData";

export default function Testimonials() {
  return (
    <section className="py-24 bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/3">
            <span className="text-white/50 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              What Our <br />
              <span className="italic font-normal text-white/60">Explorers Say</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              We take pride in delivering exceptional experiences that stay with 
              our travelers for a lifetime.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-xl font-bold">50k+</span>
              </div>
              <div className="text-sm text-white/40">
                Happy travelers <br /> worldwide
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[2.5rem] relative"
              >
                <Quote className="absolute top-8 right-8 w-10 h-10 text-white/10" />
                <p className="text-lg text-white/80 leading-relaxed mb-8 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/40">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
