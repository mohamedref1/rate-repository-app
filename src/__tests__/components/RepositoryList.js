import { render, within } from "@testing-library/react-native";

import MockedNavigator from "../testHelpers/MockedNavigator";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { getAllByTestId } = render(
        <MockedNavigator
          component={() => (
            <RepositoryListContainer repositories={repositories} />
          )}
        />
      );

      // Items
      const items = getAllByTestId("repositoryItem");
      expect(items).toHaveLength(2);

      // Item 1
      const item1 = within(items[0]);
      expect(item1.getByText("jaredpalmer/formik")).toBeDefined();
      expect(item1.getByText("TypeScript")).toBeDefined();
      expect(item1.getByText("1.6k")).toBeDefined();
      expect(item1.getByText("21.9k")).toBeDefined();
      expect(item1.getByText("88")).toBeDefined();
      expect(item1.getByText("3")).toBeDefined();
      expect(
        item1.getByText("Build forms in React, without the tears")
      ).toBeDefined();

      // Item 2
      const item2 = within(items[1]);
      expect(item2.getByText("async-library/react-async")).toBeDefined();
      expect(item2.getByText("JavaScript")).toBeDefined();
      expect(item2.getByText("69")).toBeDefined();
      expect(item2.getByText("1.8k")).toBeDefined();
      expect(item2.getByText("72")).toBeDefined();
      expect(item2.getByText("3")).toBeDefined();
      expect(
        item2.getByText("Flexible promise-based React data loader")
      ).toBeDefined();
    });
  });
});
