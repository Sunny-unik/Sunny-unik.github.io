import { updateHtml } from "../scripts/addDynamicContent";
import experiences from "../data/experience.json";

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
      <i class="fa fa-flag"></i>{{company}} – {{jobType}} 
    </h4>
    <h5>  
      {{location}} - {{locationType}}
    </h5>
        <p class="experienceDetails">
      {{description}}
    </p>
  </div>
</li>
`;
  const finalizedExp = experiences.map((experience) =>
    updateHtml(experience, expSnippet)
  );
  document
    .querySelector(".exp-timeline")
    .insertAdjacentHTML("beforeend", finalizedExp.join(""));
}
