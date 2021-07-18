import { useEffect } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { setSelectedProjectAndUpdateUrlParam } from "../../utils/SetSelectedProjectAndUpdateUrlParam";

/**
 * Set selected project on first entry randomly.
 * If previous selection has already been made, select that.
 *
 * Expected behavior, on first visit, load a random project as selection.
 * For subsequent visit, given localStorage hasn't been cleared,
 * and the user didn't select any project on last visit, the same project
 * selected by random should still be selected.
 */
export default function useSetDefaultSelection(
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectEntity>>,
  paginatedProjects: ProjectEntity[]
) {
  useEffect(() => {
    const previouslySelectedProject: ProjectEntity | null = JSON.parse(
      localStorage.getItem("selectedProject")
    );
    if (paginatedProjects?.length > 0 && !previouslySelectedProject) {
      const length = paginatedProjects.length;
      const randomIndex = Math.ceil(Math.random() * (length - 1));
      localStorage.setItem(
        "defaultSelection",
        JSON.stringify(paginatedProjects[randomIndex])
      );
      setSelectedProjectAndUpdateUrlParam(
        setSelectedProject,
        paginatedProjects[randomIndex]
      );
    }
  }, [paginatedProjects]);
}
