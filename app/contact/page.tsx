"use client";

import { useState } from "react";
import { SOCIAL_LINKS } from "@/lib/constants";

type Status =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "success" }
  | { type: "error"; message: string };

export default function ContactPage() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "sending" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Failed to send message.",
        });
        return;
      }

      setStatus({ type: "success" });
      form.reset();
    } catch {
      setStatus({ type: "error", message: "Network error. Try again." });
    }
  }

  return (
    <>
      <div className="contact-intro">
  <h1>Contact</h1>

  <p>
    If you'd like to collaborate, have questions, or just want to say hello,
    you can email me at{" "}
    <a href={`mailto:${SOCIAL_LINKS.email}`}>erol (dot) cetinok (at) gmail (dot) com</a> or use
    the form below.
  </p>
</div>

      <form onSubmit={onSubmit} className="contact-form">
        <div className="contact-grid">
          <label className="field">
            <span>First name</span>
            <input name="firstName" type="text" required />
          </label>

          <label className="field">
            <span>Last name</span>
            <input name="lastName" type="text" required />
          </label>

          <label className="field contact-full">
            <span>Email</span>
            <input name="email" type="email" required />
          </label>

          <label className="field contact-full">
            <span>Message</span>
            <textarea name="message" rows={6} required />
          </label>
        </div>

        <button
          type="submit"
          className="contact-submit"
          disabled={status.type === "sending"}
        >
          {status.type === "sending" ? "Sending…" : "SEND"}
        </button>

        {status.type === "success" && (
          <p className="contact-status contact-success">
            Your message has been sent! I'll get back to you soon.
          </p>
        )}

        {status.type === "error" && (
          <p className="contact-status contact-error">{status.message}</p>
        )}
      </form>
    </>
  );
}