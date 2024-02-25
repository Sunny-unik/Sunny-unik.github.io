import addExperiences from "../snippets/experiences";
import addProjects from "../snippets/projects";

export default function () {
  addProjects();
  addExperiences();
}

export const updateHtml = function (object, htmlString) {
  const entires = Object.entries(object);
  for (let i = 0; i < entires.length; i++) {
    const [currentField, currentValue] = entires[i];
    htmlString = insertProperty(htmlString, currentField, currentValue);
  }

  return htmlString;
};

const insertProperty = function (string, propName, propValue) {
  const propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);

  return string;
};
