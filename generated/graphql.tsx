import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type AddTechInput = {
  projTitle: Scalars['String'];
  techProps?: Maybe<TechnologyProperties>;
};

export type ErrorField = {
  __typename?: 'ErrorField';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<ProjResponse>;
  addOrRemoveTechnologies?: Maybe<ProjResponse>;
  setProjectHighlight: ProjResponse;
  deleteAllProjects: Scalars['String'];
  deleteProject: Scalars['Boolean'];
  createTechnology?: Maybe<TechnologyEntity>;
  deleteAllTechnologies: Scalars['String'];
  deleteTechnolgy: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  projectData: ProjectCreationInput;
};


export type MutationAddOrRemoveTechnologiesArgs = {
  operation: Scalars['Boolean'];
  projectData: AddTechInput;
};


export type MutationSetProjectHighlightArgs = {
  operation: Scalars['Boolean'];
  title: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};


export type MutationCreateTechnologyArgs = {
  title: Scalars['String'];
};


export type MutationDeleteTechnolgyArgs = {
  title: Scalars['String'];
};

export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  projects: Array<ProjectEntity>;
  isFirstQuery: Scalars['Boolean'];
  isLastQuery: Scalars['Boolean'];
};

export type PaginatedProjectsInput = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  search?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  sortBy?: Maybe<Scalars['String']>;
  getAll?: Maybe<Scalars['Boolean']>;
};

export type ProjectCreationInput = {
  startDate: Scalars['String'];
  endDate?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  description: Scalars['String'];
  shortDescription: Scalars['String'];
  githubLink: Scalars['String'];
  websiteLink?: Maybe<Scalars['String']>;
  imgLink?: Maybe<Scalars['String']>;
  tinyImgLink?: Maybe<Scalars['String']>;
  techProps?: Maybe<TechnologyProperties>;
  isHighlight?: Maybe<Scalars['Boolean']>;
};

export type ProjectEntity = {
  __typename?: 'ProjectEntity';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  shortDescription: Scalars['String'];
  githubLink: Scalars['String'];
  websiteLink?: Maybe<Scalars['String']>;
  imgLink?: Maybe<Scalars['String']>;
  tinyImgLink?: Maybe<Scalars['String']>;
  frontEndTechnologies?: Maybe<Array<TechnologyEntity>>;
  backEndTechnologies?: Maybe<Array<TechnologyEntity>>;
  languages?: Maybe<Array<TechnologyEntity>>;
  hostingServices?: Maybe<Array<TechnologyEntity>>;
  startDate: Scalars['String'];
  endDate?: Maybe<Scalars['String']>;
  isHighlight?: Maybe<Scalars['Boolean']>;
};

export type ProjResponse = {
  __typename?: 'ProjResponse';
  errors?: Maybe<Array<ErrorField>>;
  proj?: Maybe<ProjectEntity>;
};

export type Query = {
  __typename?: 'Query';
  projects: PaginatedProjects;
  allProjectsNotPaginated: Array<ProjectEntity>;
  getSingleProjectByTitle: ProjResponse;
  getHighlightedProjects: Array<ProjectEntity>;
  technologies: Array<TechnologyEntity>;
  getTechnologiesAssignedToRole: TechAsSeparateFields;
};


export type QueryProjectsArgs = {
  input: PaginatedProjectsInput;
};


export type QueryGetSingleProjectByTitleArgs = {
  title: Scalars['String'];
};

export type TechAsSeparateFields = {
  __typename?: 'TechAsSeparateFields';
  front?: Maybe<Array<TechnologyEntity>>;
  back?: Maybe<Array<TechnologyEntity>>;
  lang?: Maybe<Array<TechnologyEntity>>;
  hosting?: Maybe<Array<TechnologyEntity>>;
};

export type TechnologyEntity = {
  __typename?: 'TechnologyEntity';
  id: Scalars['Float'];
  title: Scalars['String'];
  frontEndIn?: Maybe<Array<ProjectEntity>>;
  backEndIn?: Maybe<Array<ProjectEntity>>;
  languageOf?: Maybe<Array<ProjectEntity>>;
  hosting?: Maybe<Array<ProjectEntity>>;
};

export type TechnologyProperties = {
  frontEndNames?: Maybe<Array<Scalars['String']>>;
  backEndNames?: Maybe<Array<Scalars['String']>>;
  languagesNames?: Maybe<Array<Scalars['String']>>;
  hostingServiceNames?: Maybe<Array<Scalars['String']>>;
};

export type ProjectFieldsFragment = (
  { __typename?: 'ProjectEntity' }
  & Pick<ProjectEntity, 'id' | 'title' | 'isHighlight' | 'endDate' | 'startDate' | 'description' | 'githubLink' | 'websiteLink' | 'imgLink' | 'tinyImgLink' | 'shortDescription'>
  & { frontEndTechnologies?: Maybe<Array<(
    { __typename?: 'TechnologyEntity' }
    & Pick<TechnologyEntity, 'title' | 'id'>
  )>>, backEndTechnologies?: Maybe<Array<(
    { __typename?: 'TechnologyEntity' }
    & Pick<TechnologyEntity, 'title' | 'id'>
  )>>, languages?: Maybe<Array<(
    { __typename?: 'TechnologyEntity' }
    & Pick<TechnologyEntity, 'title' | 'id'>
  )>>, hostingServices?: Maybe<Array<(
    { __typename?: 'TechnologyEntity' }
    & Pick<TechnologyEntity, 'title' | 'id'>
  )>> }
);

export type AllProjectsNotPaginatedQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsNotPaginatedQuery = (
  { __typename?: 'Query' }
  & { allProjectsNotPaginated: Array<(
    { __typename?: 'ProjectEntity' }
    & ProjectFieldsFragment
  )> }
);

export type GetTechnologiesAssignedToRoleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTechnologiesAssignedToRoleQuery = (
  { __typename?: 'Query' }
  & { getTechnologiesAssignedToRole: (
    { __typename?: 'TechAsSeparateFields' }
    & { front?: Maybe<Array<(
      { __typename?: 'TechnologyEntity' }
      & Pick<TechnologyEntity, 'title'>
    )>>, back?: Maybe<Array<(
      { __typename?: 'TechnologyEntity' }
      & Pick<TechnologyEntity, 'title'>
    )>>, hosting?: Maybe<Array<(
      { __typename?: 'TechnologyEntity' }
      & Pick<TechnologyEntity, 'title'>
    )>>, lang?: Maybe<Array<(
      { __typename?: 'TechnologyEntity' }
      & Pick<TechnologyEntity, 'title'>
    )>> }
  ) }
);

export type GetHighlightedProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHighlightedProjectsQuery = (
  { __typename?: 'Query' }
  & { getHighlightedProjects: Array<(
    { __typename?: 'ProjectEntity' }
    & ProjectFieldsFragment
  )> }
);

export type ProjectsQueryVariables = Exact<{
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  sortBy?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  getAll?: Maybe<Scalars['Boolean']>;
}>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'PaginatedProjects' }
    & Pick<PaginatedProjects, 'isFirstQuery' | 'isLastQuery'>
    & { projects: Array<(
      { __typename?: 'ProjectEntity' }
      & ProjectFieldsFragment
    )> }
  ) }
);

export type GetSingleProjectByTitleQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type GetSingleProjectByTitleQuery = (
  { __typename?: 'Query' }
  & { getSingleProjectByTitle: (
    { __typename?: 'ProjResponse' }
    & { proj?: Maybe<(
      { __typename?: 'ProjectEntity' }
      & ProjectFieldsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'message'>
    )>> }
  ) }
);

export type TechnologiesQueryVariables = Exact<{ [key: string]: never; }>;


export type TechnologiesQuery = (
  { __typename?: 'Query' }
  & { technologies: Array<(
    { __typename?: 'TechnologyEntity' }
    & Pick<TechnologyEntity, 'id' | 'title'>
    & { frontEndIn?: Maybe<Array<(
      { __typename?: 'ProjectEntity' }
      & Pick<ProjectEntity, 'title' | 'id'>
    )>>, backEndIn?: Maybe<Array<(
      { __typename?: 'ProjectEntity' }
      & Pick<ProjectEntity, 'title' | 'id'>
    )>>, languageOf?: Maybe<Array<(
      { __typename?: 'ProjectEntity' }
      & Pick<ProjectEntity, 'title' | 'id'>
    )>>, hosting?: Maybe<Array<(
      { __typename?: 'ProjectEntity' }
      & Pick<ProjectEntity, 'title' | 'id'>
    )>> }
  )> }
);

export const ProjectFieldsFragmentDoc = gql`
    fragment ProjectFields on ProjectEntity {
  id
  title
  frontEndTechnologies {
    title
    id
  }
  backEndTechnologies {
    title
    id
  }
  languages {
    title
    id
  }
  hostingServices {
    title
    id
  }
  isHighlight
  endDate
  startDate
  description
  githubLink
  websiteLink
  imgLink
  tinyImgLink
  shortDescription
}
    `;
export const AllProjectsNotPaginatedDocument = gql`
    query AllProjectsNotPaginated {
  allProjectsNotPaginated {
    ...ProjectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;

export function useAllProjectsNotPaginatedQuery(options: Omit<Urql.UseQueryArgs<AllProjectsNotPaginatedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllProjectsNotPaginatedQuery>({ query: AllProjectsNotPaginatedDocument, ...options });
};
export const GetTechnologiesAssignedToRoleDocument = gql`
    query GetTechnologiesAssignedToRole {
  getTechnologiesAssignedToRole {
    front {
      title
    }
    back {
      title
    }
    hosting {
      title
    }
    lang {
      title
    }
  }
}
    `;

export function useGetTechnologiesAssignedToRoleQuery(options: Omit<Urql.UseQueryArgs<GetTechnologiesAssignedToRoleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTechnologiesAssignedToRoleQuery>({ query: GetTechnologiesAssignedToRoleDocument, ...options });
};
export const GetHighlightedProjectsDocument = gql`
    query GetHighlightedProjects {
  getHighlightedProjects {
    ...ProjectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;

export function useGetHighlightedProjectsQuery(options: Omit<Urql.UseQueryArgs<GetHighlightedProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetHighlightedProjectsQuery>({ query: GetHighlightedProjectsDocument, ...options });
};
export const ProjectsDocument = gql`
    query Projects($skip: Int!, $limit: Int!, $sortBy: String, $order: String, $search: String, $getAll: Boolean) {
  projects(input: {skip: $skip, limit: $limit, sortBy: $sortBy, order: $order, search: $search, getAll: $getAll}) {
    projects {
      ...ProjectFields
    }
    isFirstQuery
    isLastQuery
  }
}
    ${ProjectFieldsFragmentDoc}`;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};
export const GetSingleProjectByTitleDocument = gql`
    query GetSingleProjectByTitle($title: String!) {
  getSingleProjectByTitle(title: $title) {
    proj {
      ...ProjectFields
    }
    errors {
      message
    }
  }
}
    ${ProjectFieldsFragmentDoc}`;

export function useGetSingleProjectByTitleQuery(options: Omit<Urql.UseQueryArgs<GetSingleProjectByTitleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSingleProjectByTitleQuery>({ query: GetSingleProjectByTitleDocument, ...options });
};
export const TechnologiesDocument = gql`
    query Technologies {
  technologies {
    id
    title
    frontEndIn {
      title
      id
    }
    backEndIn {
      title
      id
    }
    languageOf {
      title
      id
    }
    hosting {
      title
      id
    }
  }
}
    `;

export function useTechnologiesQuery(options: Omit<Urql.UseQueryArgs<TechnologiesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TechnologiesQuery>({ query: TechnologiesDocument, ...options });
};