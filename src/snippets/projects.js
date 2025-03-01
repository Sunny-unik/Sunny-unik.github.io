import { updateHtml } from "../scripts/addDynamicContent";
import imagesLoaded from "imagesloaded";
import projects from "../data/projects.json";

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
