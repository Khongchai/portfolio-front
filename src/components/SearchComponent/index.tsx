import { Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectsSearchParam } from "../../sharedTypes/ProjectsSearchParam";
import setActionWithDelay from "../../utils/setActionWithDelay";
import SetActionWithDelay from "../../utils/setActionWithDelay";
import { StyledSelect } from "./StyledSelect";

interface SearchComponentProps {
  searchParams: {
    searchParams: ProjectsSearchParam;
    setSearchParams: React.Dispatch<React.SetStateAction<ProjectsSearchParam>>;
  };
}

type orderType = "ASC" | "DESC" | undefined;
type sortType = "Title" | "Date" | undefined;

export const SearchComponent: React.FC<SearchComponentProps> = ({
  searchParams,
}) => {
  function setSearch(value: string) {
    searchParams.setSearchParams({
      ...searchParams.searchParams,
      search: value,
    });
  }

  function setOrder(value: orderType) {
    searchParams.setSearchParams({
      ...searchParams.searchParams,
      order: value,
    });
  }

  function setSort(value: sortType) {
    searchParams.setSearchParams({
      ...searchParams.searchParams,
      sortBy: value,
    });
  }
  return (
    <>
      <Flex
        as={Stack}
        spacing="1rem"
        align="center"
        justifyContent="center"
        flexDir="column"
        width="15.5rem"
        marginLeft="auto !important"
        marginRight="auto !important"
      >
        <Input
          border="none"
          bgColor="#1F1F1F"
          focusBorderColor="none"
          placeholder={`Search Any`}
          width={"100%"}
          onChange={(e) => {
            e.persist();
            setActionWithDelay(() => {
              setSearch(e.target.value);
            }, 0.2);
          }}
        />
        <Flex
          align="center"
          width="100%"
          css={{ "> *": { marginLeft: "1rem" } }}
        >
          <Text>Sort</Text>
          <StyledSelect setFunction={setSort} options={["Date", "Title"]} defaultValue={searchParams.searchParams.sortBy} />
          <StyledSelect setFunction={setOrder} options={["ASC", "DESC"]} defaultValue={searchParams.searchParams.order} />
        </Flex>
      </Flex>
    </>
  );
};
