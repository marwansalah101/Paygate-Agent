"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { RevealText } from "@/components/shared/RevealText";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import type { DemoRequestFieldErrors, DemoRequestPayload } from "@/types/demoRequest";

const initialForm: DemoRequestPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function DemoRequest() {
  const [form, setForm] = useState<DemoRequestPayload>(initialForm);
  const [errors, setErrors] = useState<DemoRequestFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update = (field: keyof DemoRequestPayload) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="demo" className="relative px-4 pt-28 md:px-8 md:pt-40">
      <div className="relative mx-auto grid max-w-6xl gap-14 pb-28 md:grid-cols-2 md:pb-36">
        <RevealText as="div" x={-56} y={0}>
          <EyebrowLabel>See PayGate in Action</EyebrowLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[var(--color-gray-900)] md:text-5xl">
            Request a <span className="text-[var(--color-blue-primary)]">pilot demo.</span>
          </h2>
          <p className="mt-6 max-w-md text-[var(--color-gray-500)]">
            Tell us about your platform and we&apos;ll walk you through onboarding a live
            merchant in under 3 minutes.
          </p>
        </RevealText>

        <RevealText as="div" delay={0.1} x={56} y={0}>
          <div className="relative rounded-2xl border border-[var(--color-gray-200)] bg-white p-8 shadow-[0_40px_100px_-40px_rgba(17,19,24,0.25)]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <CheckCircle2 size={40} className="text-[var(--color-success-check)]" />
                  <p className="text-lg font-semibold text-[var(--color-gray-900)]">
                    Request received.
                  </p>
                  <p className="max-w-xs text-sm text-[var(--color-gray-500)]">
                    Our team will reach out within one business day to schedule your pilot demo.
                  </p>
                  <Button variant="ghost" className="mt-2" onClick={() => setStatus("idle")}>
                    Send another request
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Full name" htmlFor="name" error={errors.name}>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Sara Al-Faraj"
                        error={errors.name}
                        required
                      />
                    </FormField>
                    <FormField label="Company" htmlFor="company" error={errors.company}>
                      <Input
                        id="company"
                        value={form.company}
                        onChange={update("company")}
                        placeholder="Riyadh Coffee Co."
                        error={errors.company}
                        required
                      />
                    </FormField>
                  </div>

                  <FormField label="Work email" htmlFor="email" error={errors.email}>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="sara@company.sa"
                      error={errors.email}
                      required
                    />
                  </FormField>

                  <FormField label="Phone (optional)" htmlFor="phone">
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+966 5xxxxxxxx"
                    />
                  </FormField>

                  <FormField label="What are you looking to solve? (optional)" htmlFor="message">
                    <TextArea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="We onboard 200+ merchants a month and need this faster..."
                    />
                  </FormField>

                  {status === "error" && Object.keys(errors).length === 0 && (
                    <p className="text-sm font-medium text-red-500">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "submitting"}
                    className="mt-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      "Request a pilot demo"
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
