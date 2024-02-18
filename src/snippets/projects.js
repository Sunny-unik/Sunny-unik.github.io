import { updateHtml } from "../scripts/addDynamicContent";

export default function addProjects() {
  const projectSnippet = `<div class="row">
  <div class="col-lg-4 col-sm-12">
    <div class="project-wrapper__text load-hidden">
      <h3 class="project-wrapper__text-title">{{title}}</h3>
      <div>
        <p class="mb-4">{{description}}</p>
      </div>
      <a
        rel="noreferrer"
        target="_blank"
        class="cta-btn cta-btn--hero"
        href="{{link}}"
      >
        See Live
      </a>
      <a
        rel="noreferrer"
        target="_blank"
        class="cta-btn text-color-main"
        href="{{sourceLink}}"
      >
        Source Code
      </a>
    </div>
  </div>
  <div class="col-lg-8 col-sm-12">
    <div class="project-wrapper__image load-hidden">
      <a rel="noreferrer" href="{{link}}" target="_blank">
        <div
          data-tilt
          data-tilt-max="4"
          data-tilt-glare="true"
          data-tilt-max-glare="0.5"
          class="thumbnail rounded js-tilt"
        >
          <img alt="Project Image" class="img-fluid" src="{{imgSource}}" />
        </div>
      </a>
    </div>
  </div>
</div>
`;
  const projects = [
    {
      title: "Urlbit: A Url Shortener",
      description:
        "A URL shortener web-app ready for Open Source contribution. This app is using Express as server, Ejs as templating language, MongoDB for database. This service is deployed on free tier of <a href='http://render.com' target='_blank' rel='noopener noreferrer'>render.com</a>.",
      link: "https://urlbit.onrender.com/",
      sourceLink: "https://github.com/Sunny-unik/Urlbit",
      imgSource:
        "https://raw.githubusercontent.com/Sunny-unik/Urlbit/master/screenshots/homeScreen.png",
    },
    {
      title: "Classic Restaurant",
      description:
        "This repo contains source code of classic restaurant website and solutions of a course named HTML5, CSS3, and Javascript for Web Developers. This course is listed on Coursera by The Johns Hopkins University. This website is built by using HTML5, CSS3, Bootstrap4, Ajax and Javascript. To deploy this site uses <a href='https://pages.github.com/' target='_blank' rel='noopener noreferrer'>github-pages </a>.",
      link: "https://Sunny-unik.github.io/classic-restaurant",
      sourceLink: "https://github.com/Sunny-unik/classic-restaurant",
      imgSource:
        "https://Sunny-unik.github.io/classic-restaurant/images/homeScreen.png",
    },
    {
      title: "Glimpse: A Quick view to my portfolio",
      description:
        "A minimalistic view of my profile. Built using HTML5, CSS3 and Javascript. To deploy this site uses <a href='https://pages.github.com/' target='_blank'  rel='noopener noreferrer'> github-pages </a>.",
      link: "https://Sunny-unik.github.io/glimpse",
      sourceLink: "https://github.com/Sunny-unik/glimpse",
      imgSource:
        "https://sunny-unik.github.io/glimpse/screenshots/homeScreen.png",
    },
  ];
  const finalProjects = projects.map((project) =>
    updateHtml(project, projectSnippet)
  );
  document
    .querySelector(".project-wrapper")
    .insertAdjacentHTML("beforeend", finalProjects.join(""));
}
