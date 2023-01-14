import { Dispatch, SetStateAction } from "react";
import { ProjectEntity } from "../../generated/graphql";

export function setSelectedProjectAndUpdateUrlParamAndLocalStorage(
  setSelectedProject: Dispatch<SetStateAction<ProjectEntity>>,
  project: ProjectEntity
) {
  const newParam = `${window.location.pathname}?selection=${project.title}`;
  window.history.pushState("", "", newParam);
  setSelectedProject(project);
  localStorage.setItem("selectedProject", project.title);
}
