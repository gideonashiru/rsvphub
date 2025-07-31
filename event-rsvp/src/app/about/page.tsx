const AboutPage = () => {
  return (
    <>
      <div className="mt-40 mb-8 flex flex-col items-center px-4 text-center max-w-3xl mx-auto">
        <h4 className="text-4xl font-bold font-sans mb-6">About The Site</h4>
        <p className="text-lg font-sans">
          This site is a personal project designed to primarily practice &
          showcase my skills in web development. It features a variety of
          components gotten from{" "}
          <a
            href="https://ui.shadcn.com/docs/components"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            ShadCN
          </a>{" "}
          and layouts that I have created using Next.js, React, and Tailwind
          CSS. The site is mostly complete but still under construction, as I
          plan to add more features and content in the future.
          <br />
          Its functionality includes a simple RSVP system for events, which allows users to register their attendance and also create events. The site is built with a focus on performance and user experience, ensuring that it is fast and responsive across different devices.

        </p>
      </div>
    </>
  );
};

export default AboutPage;
