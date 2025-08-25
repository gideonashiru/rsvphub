"use client";

import React from "react";

const ContactPage = () => {
  return (
    <section className="min-h-screen dark:bg-gray-950 text-neutral-800 dark:text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl font-sans w-full bg-card rounded-2xl shadow-xl p-10 border border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl font-bold  mb-6 text-center">Get in Touch</h1>

        <p className="text-lg mb-8 text-center">
          Have questions, feedback, or want to collaborate? Feel free to reach out!
        </p>

        <div className="space-y-6 text-base">
          <div>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:your-email@example.com"
              className="text-blue-600 hover:underline"
            >
              gideonashiru@gmail.com
            </a>
          </div>

          <div>
            <span className="font-semibold">Phone:</span>{" "}
            <a
               href="tel:+4313357390"
              className="text-blue-600 hover:underline"
            >
              431-335-7390
            </a>
          </div>

          <div>
            <span className="font-semibold">Portfolio:</span>{" "}
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              dont have one yet
            </a>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          We typically respond within 1–2 business days.
        </div>
      </div>
      
    </section>
  );
};

export default ContactPage;
