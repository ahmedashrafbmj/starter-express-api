import fetch from "node-fetch";
import dotenv from "dotenv";


dotenv.config();

const email = process.env.EMAIL;
const apiToken = process.env.Token;

const authorizationHeader = `Basic ${Buffer.from(
  `${email}:${apiToken}`
).toString("base64")}`;

const fetchOptions = {
  method: "GET",
  headers: {
    Authorization: authorizationHeader,
    Accept: "application/json",
  },
};

const func = async (req, res) => {
  try {
    const arr = [
      { name: "BPDOT" },
      { name: "CEOD" },
      { name: "CEW" },
      { name: "DV" },
      { name: "HIRE" },
    ];

    // const projectsResponse = await fetch(
    //   "https://proprint.atlassian.net/rest/api/3/project",
    //   fetchOptions
    // );
    // const projectsData = await projectsResponse.json();

    const requests = arr.map(async (project) => {
      const projectResponsePromise = fetch(
        `https://proprint.atlassian.net/rest/api/3/search?jql=project=${project.name}`,
        fetchOptions
      ).then((response) => response.json());

      const [projectDetails] = await Promise.all([projectResponsePromise]);

      return { projectDetails };
      // return { projectDetails };
    });

    const results = await Promise.all(requests);

    res.json({
      projectDetails: results.map((result) => result.projectDetails),
    });
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ error: "Error fetching project details" });
  }
};
const func2 = async (req, res) => {
  try {
    const projectsResponse = await fetch(
      "https://proprint.atlassian.net/rest/api/3/project",
      fetchOptions
    );
    const projectsData = await projectsResponse.json();
    const arr = [
      { name: "BPDOT" },
      { name: "CEOD" },
      { name: "CEW" },
      { name: "DV" },
      { name: "HIRE" },
    ];
    const projectsDatas = projectsData.filter(
      (eee) => !arr.some((e) => eee?.key === e?.name)
    );

    // Now, projectsDatas will contain objects from projectsData that do not have a key matching any name in arr.

    console.log(projectsDatas, "projectsDatas");
    const requests = projectsDatas?.map(async (project) => {
      const projectResponsePromise = fetch(
        `https://proprint.atlassian.net/rest/api/3/search?jql=project=${project.key}`,
        fetchOptions
      ).then((response) => response.json());

      const assignableUsersResponsePromise = fetch(
        `https://proprint.atlassian.net/rest/api/2/user/assignable/search?project=${project.key}`,
        fetchOptions
      ).then((response) => response.json());

      const [projectDetails, assignableUsers] = await Promise.all([
        projectResponsePromise,
        assignableUsersResponsePromise,
      ]);

      return { projectDetails, assignableUsers };
      // return { projectDetails };
    });

    const results = await Promise.all(requests);

    res.json({
      projectDetails: results.map((result) => result.projectDetails),
      allAsignee: results.map((result) => result.assignableUsers),
    });
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).json({ error: "Error fetching project details" });
  }
};

const search = async (req, res) => {
  try {
    const { query } = req.query;
    let jqlQuery = `text ~ "${query}"`; // Use the ~ operator for 'contains' in text field

    const searchResponse = await fetch(
      `https://proprint.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
        jqlQuery
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeader,
          Accept: "application/json",
        },
      }
    );

    const searchData = await searchResponse.json();
    if (searchData.issues?.length === 0) {
      const issueKeyRegex = /^[A-Z]+-\d+$/;
      if (issueKeyRegex.test(query)) {
        jqlQuery = `key = "${query}"`;
      } else {
        jqlQuery = `project = "${query}"`; // Fix the syntax for project search
      }
      const searchResponse = await fetch(
        `https://proprint.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
          jqlQuery
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationHeader,
            Accept: "application/json",
          },
        }
      );
      const searchData = await searchResponse.json();
      return res.json(searchData);
    }
    return res.json(searchData);
  } catch (error) {
    console.error("Error searching Jira:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Search by Project Name API
const searchByProject = async (req, res) => {
  try {
    const { query } = req.query;
    let jqlQuery = `project = "${query}"`;
    const searchResponse = await fetch(
      `https://proprint.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
        jqlQuery
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeader,
          Accept: "application/json",
        },
      }
    );

    const projectData = await searchResponse.json();

    return res.json(projectData);
  } catch (error) {
    console.error("Error searching Jira:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//serach by assignee Name API
const searchByAssigneeName = async (req, res) => {
  try {
    const { query } = req.query;
    let jqlQuery = `text ~ "${query}"`;

    const searchResponse = await fetch(
      `https://proprint.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
        jqlQuery
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeader,
          Accept: "application/json",
        },
      }
    );
    const projectData = await searchResponse.json();

    return res.json(projectData);
  } catch (error) {
    console.error("Error searching Jira:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//search by Project key API
const searchByProjectKey = async (req, res) => {
  try {
    let jqlQuery;
    const { query } = req.query;
    const issueKeyRegex = /^[A-Z]+-\d+$/;

    // Check if the query matches the expected issue key pattern
    if (issueKeyRegex.test(query)) {
      // Search by issue key
      jqlQuery = `key = "${query}"`;
    } else {
      // Handle other types of queries if needed
      return res.status(400).json({ error: "Invalid query format" });
    }

    // Set up the Jira API request
    const apiUrl = `https://proprint.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
      jqlQuery
    )}`;

    const searchResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: authorizationHeader,
        Accept: "application/json",
      },
    });

    // Check if the API call was successful
    if (!searchResponse.ok) {
      throw new Error(
        `Error: ${searchResponse.status} - ${searchResponse.statusText}`
      );
    }

    // Parse the JSON response from the Jira API
    const searchDataProjectKey = await searchResponse.json();

    // Return the search results
    return res.json(searchDataProjectKey);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// const searchByProjectKey = async (req, res) => {
//   try {
//     let jqlQuery;
//     const { query } = req.query;
//     const issueKeyRegex = /^[A-Z]+-\d+$/;
//     if (issueKeyRegex.test(query)) {
//       jqlQuery = `text ~ "${query}"`;
//     }

//     // Format the query parameter to be a valid JQL query for assignee
//     //jqlQuery = `key = "${query}"`;

//     const searchResponse = await fetch(
//       `https://proprint.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(
//         jqlQuery
//       )}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: authorizationHeader,
//           Accept: "application/json",
//         },
//       }
//     );

//     const searchDataProjectKey = await searchResponse.json();

//     return res.json(searchDataProjectKey);
//   } catch (error) {
//     console.error("Error searching Jira:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

//Avatar Select by Asssignee API
const searchByAssignee = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query, "query");

    // Format the query parameter to be a valid JQL query for assignee
    const jqlQuery = `assignee = "${query}"`;

    const searchResponse = await fetch(
      `https://proprint.atlassian.net/rest/api/2/search?jql=${encodeURIComponent(
        jqlQuery
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeader,
          Accept: "application/json",
        },
      }
    );

    const searchData = await searchResponse.json();

    return res.json(searchData);
  } catch (error) {
    console.error("Error searching Jira:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const groupByFilters = async (req, res) => {
  try {
    const { query } = req.query;
    const jqlQuery = `issuetype = "${query}"`;
    const searchResponse = await fetch(
      `https://proprint.atlassian.net/rest/api/2/search?jql=${encodeURIComponent(
        jqlQuery
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeader,
          Accept: "application/json",
        },
      }
    );

    const FilteredData = await searchResponse.json();

    return res.json(FilteredData);
  } catch (error) {
    console.error("Error searching Jira:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const groupByStatus = async (req, res) => {
  try {
    const { query } = req.query;
    const jqlQuery = `status = "${query}"`;
    const searchResponse = await fetch(
      `https://proprint.atlassian.net/rest/api/2/search?jql=${encodeURIComponent(
        jqlQuery
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeader,
          Accept: "application/json",
        },
      }
    );

    const FilteredData = await searchResponse.json();

    return res.json(FilteredData);
  } catch (error) {
    console.error("Error searching Jira:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// const groupByFilters = async (req, res) => {
//   try {
//     const { query } = req.query;
//     let startAt = 0;
//     const maxResults = 50; // Set your desired maxResults value

//     let allFilteredData = [];

//     while (true) {
//       const jqlQuery = `issuetype = "${query}"`;
//       const searchResponse = await fetch(
//         `https://proprint.atlassian.net/rest/api/2/search?jql=${encodeURIComponent(
//           jqlQuery
//         )}&startAt=${startAt}&maxResults=${maxResults}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: authorizationHeader,
//             Accept: "application/json",
//           },
//         }
//       );

//       if (!searchResponse.ok) {
//         const errorText = await searchResponse.text();
//         console.error(
//           "Error searching Jira:",
//           searchResponse.status,
//           errorText
//         );
//         return res.status(searchResponse.status).json({ error: errorText });
//       }

//       const filteredData = await searchResponse.json();

//       if (filteredData.issues.length === 0) {
//         // No more issues, break the loop
//         break;
//       }

//       // Concatenate the current page of issues to the result array
//       allFilteredData = allFilteredData.concat(filteredData.issues);

//       // Update the startAt for the next page
//       startAt += maxResults;
//     }

//     return res.json(allFilteredData);
//   } catch (error) {
//     console.error("Error searching Jira:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

export {
  func,
  search,
  searchByAssignee,
  groupByFilters,
  searchByProject,
  func2,
  searchByProjectKey,
  searchByAssigneeName,
  groupByStatus,
};
