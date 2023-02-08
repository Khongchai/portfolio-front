import { useEffect } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { setSelectedProjectAndUpdateUrlParamAndLocalStorage } from "../../utils/SetSelectedProjectAndUpdateUrlParam";

/**
 * Set selected project on first entry randomly.
 * If previous selection has already been made, select that.
 *
 * Expected behavior: on first visit, if selection not provided in url, load a random project as selection.
 * For subsequent visit, given localStorage hasn't been cleared,
 * and the user didn't select any project on last visit, the same project
 * selected by random should still be selected.
 *
 * Selection checking hierarchy => URL? set : >> PreviouslySelected? set : >> set(randomProj)
 */
export default function useAutoSelection(
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectEntity | null>>,
  unpaginatedProjects: ProjectEntity[],
) {
  useEffect(() => {
    if (unpaginatedProjects?.length > 0) {
      const params = new URLSearchParams(document.location.search.substring(1));
      const projectTitleFromUrl: string | null = params.get("selection");
      const previouslySelectedProjectTitle:
        | string
        | null = localStorage.getItem("selectedProject");
      //URL
      if (projectTitleFromUrl) {
        setProjectLoadedFromQueryParam(
          setSelectedProject,
          unpaginatedProjects,
          projectTitleFromUrl,
          previouslySelectedProjectTitle!
        );
      }
      //PreviouslySelected
      else if (previouslySelectedProjectTitle) {
        setProjectFromPreviouslySelected(
          setSelectedProject,
          unpaginatedProjects,
          previouslySelectedProjectTitle
        );
      }
      //Ramdom
      else {
        setSelectedProjectRandomly(setSelectedProject, unpaginatedProjects);
      }
    }
  }, [unpaginatedProjects]);
}

function setProjectLoadedFromQueryParam(
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectEntity | null>>,
  allProjects: ProjectEntity[],
  projectTitleFromUrl: string,
  fallbackProjectTitle: string,
) {
  const projectFromUrl = allProjects.filter(
    (project) =>
      project.title.toUpperCase() === projectTitleFromUrl.toUpperCase()
  );
  if (projectFromUrl.length === 0) {
    console.log(
      "project specified in url not found, delegating to next fallback"
    );
    setProjectFromPreviouslySelected(
      setSelectedProject,
      allProjects,
      fallbackProjectTitle
    );
  } else {
    setSelectedProjectAndUpdateUrlParamAndLocalStorage(
      setSelectedProject,
      projectFromUrl[0]
    );
  }
}

function setProjectFromPreviouslySelected(
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectEntity | null>>,
  allProjects: ProjectEntity[],
  projectTitleFromLocalStorage: string
) {
  //Check if project still exist in data loaded from database
  const projectsFromPreviouslySelected = allProjects.filter(
    (project) =>
      project.title.toUpperCase() === projectTitleFromLocalStorage.toUpperCase()
  );
  if (projectsFromPreviouslySelected.length === 0) {
    console.log(
      "project specified in localStorage not found in database, delegating to next fallback"
    );
    setSelectedProjectRandomly(setSelectedProject, allProjects);
  } else {
    setSelectedProjectAndUpdateUrlParamAndLocalStorage(
      setSelectedProject,
      projectsFromPreviouslySelected[0]
    );
  }
}

function setSelectedProjectRandomly(
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectEntity | null>>,
  paginatedProjects: ProjectEntity[]
) {
  const length = paginatedProjects.length;
  const randomIndex = Math.ceil(Math.random() * (length - 1));
  localStorage.setItem(
    "defaultSelection",
    JSON.stringify(paginatedProjects[randomIndex])
  );
  setSelectedProjectAndUpdateUrlParamAndLocalStorage(
    setSelectedProject,
    paginatedProjects[randomIndex]
  );
}
