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
      title: "Web Developer",
      description:
        "As a web developer at Spicegems, my primary responsibility is to write TypeScript scripts and develop complex logic for building dynamic Shopify apps with versatile customization features. Effective collaboration with the team is essential to integrate the scripts seamlessly and ensure a high-quality user experience.",
      date: "Jan 2022 - July 2023",
      company: "Spicetech IT Solutions PVT LTD",
      location: "Kota, (Rajasthan)",
    },
    {
      title: "Full-stack Developer",
      description:
        "During my tenure at Grras Solutions, I gained valuable expertise in creating single-page applications using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This comprehensive training empowered me to develop dynamic and interactive web applications with seamless frontend and backend integration. Additionally, I learned how to deploy these applications on cloud services, ensuring scalability and accessibility. This hands-on experience has equipped me to tackle real-world web development challenges and deliver cutting-edge solutions that align with industry best practices.",
      date: "May 2021 - Aug 2021",
      company: "Grras Solutions PVT LTD",
      location: "Jaipur, (Rajasthan)",
    },
  ];
  const finalizedExp = experiences.map((experience) =>
    updateHtml(experience, expSnippet)
  );
  document
    .querySelector(".exp-timeline")
    .insertAdjacentHTML("beforeend", finalizedExp.join(""));
}
