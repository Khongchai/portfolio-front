import { useEffect } from "react";
import { Paginator } from "../../../utils/Paginator";

export function usePagination(
  paginator: Paginator,
  paginationDirection: {
    direction: "forward" | "backward" | null;
    forcer: any;
  },
  setPaginatedProjects: any,
  setPaginationPosition: any
) {
  useEffect(() => {
    if (paginator && paginationDirection) {
      if (paginationDirection.direction === "forward") {
        paginator.paginateForward();
      } else if (paginationDirection.direction === "backward") {
        paginator.paginateBackward();
      } else {
        console.log("pagination direction not set");
      }
      const paginationResult = paginator.getItemsAtCurrent();
      setPaginatedProjects(paginationResult.data);
      setPaginationPosition({
        isFirst: paginationResult.isFirst,
        isLast: paginationResult.isLast,
      });
    }
  }, [paginationDirection]);
  return null;
}
