import { updateHtml } from "../scripts/addDynamicContent";
import imagesLoaded from "imagesloaded";

export default function addProjects() {
  const projectSnippet = `<div class="row">
  <div class="col-lg-4 col-sm-12">
    <div class="project-wrapper__text">
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
    <div class="project-wrapper__image">
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
      title: "Eu-country-check: Npm package",
      description:
        "This package is to check if the given country-code/country-name is part of the EU (European Union) or EEA (European Economic Area).",
      link: "https://npmjs.com/package/eu-country-check",
      sourceLink: "https://github.com/Sunny-unik/eu-country-check",
      imgSource:
        "https://raw.githubusercontent.com/Sunny-unik/docs-eu-country-check/master/public/npmjsPage.png",
    },
    {
      title: "Docs-eu-country-check",
      description: "Official Documentations for `eu-country-check` npm-package",
      link: "https://euc-check-docs.vercel.app/",
      sourceLink: "https://github.com/Sunny-unik/docs-eu-country-check",
      imgSource:
        "https://raw.githubusercontent.com/Sunny-unik/docs-eu-country-check/master/public/homeScreen.png",
    },
    {
      title: "Medical-Marketing",
      description: "A website built on next.js with prismic legacy builder",
      link: "https://medical-marketing.vercel.app/",
      sourceLink: "https://github.com/Sunny-unik/medical-marketing",
      imgSource:
        "https://raw.githubusercontent.com/Sunny-unik/Medical-marketing/master/public/homeScreen.png",
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
    {
      title: "React-Template",
      description: "Boilerplate to built single page applications using react",
      link: "https://sunny-unik.github.io/React-template",
      sourceLink: "https://github.com/Sunny-unik/React-Template",
      imgSource:
        "https://raw.githubusercontent.com/Sunny-unik/React-Template/master/public/homeScreen.png",
    },
    {
      title: "SSR-with-routing",
      description:
        "Build to learn server routing in Server-Side-Rendered node-react app.",
      link: "https://star-repos.vercel.app/",
      sourceLink: "https://github.com/Sunny-unik/SSR-with-routing",
      imgSource:
        "https://raw.githubusercontent.com/Sunny-unik/SSR-with-routing/master/public/homeScreen.png",
    },
    {
      title: "Gatsby-blog-tutorial",
      description: "A blog website made to become familiar with gatsby.js",
      link: "http://sunny-unik.github.io/gatsby-blog-tutorial/",
      sourceLink: "https://github.com/Sunny-unik/gatsby-blog-tutorial",
      imgSource:
        "https://raw.githubusercontent.com/Sunny-unik/gatsby-blog-tutorial/master/src/images/hacktoberfestBlog.png",
    },
  ];

  initProjectSliders(projectSnippet, projects);
}

function initProjectSliders(projectSnippet, projects) {
  const notOnPhone = window.innerWidth > 600;
  let projectDots = notOnPhone ? "<div class='projects-nav'>" : undefined;
  const finalProjects = projects.map((project) => {
    if (projectDots)
      projectDots += `<img src='${project.imgSource}' alt='${project.title}' class='project-nav-icons' height='120px' width='240px'>`;
    return updateHtml(project, projectSnippet);
  });

  const primarySliderOptions = notOnPhone
    ? { pageDots: false }
    : { adaptiveHeight: true };
  const projectWrapper = document.querySelector(".project-wrapper");
  projectWrapper.insertAdjacentHTML("beforeend", finalProjects.join(""));
  const flkty = new Flickity(projectWrapper, primarySliderOptions);
  !onresize &&
    imagesLoaded(projectWrapper, function () {
      flkty.resize();
      flkty.reposition();
    });
  if (!notOnPhone) return false;

  projectWrapper.insertAdjacentHTML("afterend", (projectDots += "</div>"));
  const secondarySliderOptions = {
    asNavFor: ".project-wrapper",
    contain: true,
    pageDots: false,
    wrapAround: true,
  };
  const projectNavWrapper = document.querySelector(".projects-nav");
  const flktyNav = new Flickity(projectNavWrapper, secondarySliderOptions);
  !onresize &&
    imagesLoaded(projectNavWrapper, function () {
      flktyNav.resize();
      flktyNav.reposition();
    });
}
