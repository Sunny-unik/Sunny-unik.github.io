import { updateHtml } from "../scripts/addDynamicContent";

export default function addExperiences() {
  const expSnippet = `<li>
  <div class="exp-icon">
    <i class="faPra fa-briefcase"></i>
  </div>
  <div class="exp-label">
    <h3>{{title}}</h3>
    <div class="date">
      <i class="fa fa-calendar"></i>{{date}}
    </div>
    <h4>
      <i class="fa fa-flag"></i>{{company}} – {{location}} 
    </h4>
        <p class="experienceDetails">
      {{description}}
    </p>
  </div>
</li>
`;
  const experiences = [
    {
      title: "Software Developer",
      description: `• Led code reviews and guided junior developers.
      <br>• Streamlined processes with automation tools and real-time webhooks.
      <br>• Optimized I/O operations using asynchronous programming.
      <br>• Handled third-party integrations and APIs for smooth system connectivity.
      <br>• Managed MongoDB and Redis, ensuring data integrity.`,
      date: "June 2024 - Present",
      jobType: "Full-time",
      locationType: "Onsite",
      company: "Pabbly",
      location: "Bhopal, Madhya Pradesh, India",
    },
    {
      title: "Freelance Full Stack Developer",
      description: `<b>Worked on Next.js Web Applications:</b><br>
      • Built dynamic web apps using server-side rendering (SSR) and static site generation (SSG).<br>
      • Integrated third-party APIs & CMS to developed dynamic, heavily customizable and responsive user interfaces.<br>
      <b>Developed Pdf Word Finder Chrome Extensions</b><br>
      • Developed a Chrome extension for advanced word search in PDFs using Express-PDF.<br>
      • Created efficient search algorithms and user-friendly interfaces.<br>
      <b>Developed WhatsApp Web Extension</b><br>
      • Built a WhatsApp Web extension for automated messaging using whatsapp-web.js and Baileys.<br>
      • Focused on secure data handling and enhanced user interaction.`,
      date: "Nov 2023 - April 2024",
      jobType: "Part-time",
      locationType: "Remote",
      company: "Self Employed",
      location: "Suwasra, Madhya Pradesh, India",
    },
    {
      title: "Web Developer",
      description: `• As a Web Developer in this company, my responsibility is to write scripts (Typescript) to build
        dynamic Shopify apps.<br>
        • Implemented cross-browser compatibility strategies to ensure smooth functioning of web apps
        across different browsers.<br>
        • These apps offer extensive customization options to users and seamlessly adapt to different
        themes (800+ themes).<br>
        • These apps are used by hundreds of businesses & rated 4.8+ stars on Shopify app store.
        • Also, my responsibilities include writing test cases using Jest.`,
      date: "Jan 2022 - July 2023",
      jobType: "Full-time",
      locationType: "Onsite",
      company: "Spicetech IT Solutions PVT LTD",
      location: "Kota, Rajasthan, India",
    },
    {
      title: "Full-stack Developer",
      description:
        "During my tenure at Grras Solutions, I gained valuable expertise in creating single-page applications using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This comprehensive training empowered me to develop dynamic and interactive web applications with seamless frontend and backend integration. Additionally, I learned how to deploy these applications on cloud services, ensuring scalability and accessibility. This hands-on experience has equipped me to tackle real-world web development challenges and deliver cutting-edge solutions that align with industry best practices.",
      date: "May 2021 - Aug 2021",
      jobType: "Apprenticeship",
      locationType: "Remote",
      company: "Grras Solutions PVT LTD",
      location: "Jaipur, Rajasthan, India",
    },
  ];
  const finalizedExp = experiences.map((experience) =>
    updateHtml(experience, expSnippet)
  );
  document
    .querySelector(".exp-timeline")
    .insertAdjacentHTML("beforeend", finalizedExp.join(""));
}
