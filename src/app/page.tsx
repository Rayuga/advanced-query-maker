"use client";

import Query from "@/query";

export default function Home() {
  return (
    <main className="p-8">
      <Query
        // optionsList={optionsList}
        categoryList={categoryList}
        onSubmit={(query: any, where: any) => {
          console.log(query, where);
        }}
      />
    </main>
  );
}

const categoryList = [
  {
    categoryId: 3,
    categoryName: "Organization Country",
    categoryColor: "#b60205",
    tags: [
      {
        tagId: 121,
        tagName: "india",
      },
      {
        tagId: 241,
        tagName: "nepal",
      },
      {
        tagId: 301,
        tagName: "africa",
      },
      {
        tagId: 281,
        tagName: "west_indies",
      },
      {
        tagId: 321,
        tagName: "germany",
      },
      {
        tagId: 181,
        tagName: "america",
      },
    ],
  },
  {
    categoryId: 7,
    categoryName: "Status of technology",
    categoryColor: "#fec1c1",
    tags: [
      {
        tagId: 167,
        tagName: "current",
      },
      {
        tagId: 123,
        tagName: "upcoming",
      },
    ],
  },
  {
    categoryId: 8,
    categoryName: "Keyword",
    categoryColor: "#215cea",
    tags: [
      {
        tagId: 182,
        tagName: "desalination",
      },
      {
        tagId: 163,
        tagName: "cooling",
      },
      {
        tagId: 125,
        tagName: "global_warming",
      },
      {
        tagId: 162,
        tagName: "data_center",
      },
    ],
  },
  {
    categoryId: 2,
    categoryName: "Organization Name",
    categoryColor: "#008672",
    tags: [
      {
        tagId: 208,
        tagName: "acer",
      },
      {
        tagId: 209,
        tagName: "apple",
      },
      {
        tagId: 322,
        tagName: "nielson",
      },
      {
        tagId: 129,
        tagName: "reliance",
      },
      {
        tagId: 202,
        tagName: "iocl",
      },
      {
        tagId: 205,
        tagName: "godrej",
      },
      {
        tagId: 261,
        tagName: "philips",
      },
      {
        tagId: 262,
        tagName: "tcs",
      },
      {
        tagId: 206,
        tagName: "orient",
      },
      {
        tagId: 203,
        tagName: "ongc",
      },
      {
        tagId: 204,
        tagName: "voltas",
      },
      {
        tagId: 207,
        tagName: "hp",
      },
      {
        tagId: 221,
        tagName: "google",
      },
    ],
  },
  {
    categoryId: 4,
    categoryName: "Area",
    categoryColor: "#d93f0b",
    tags: [
      {
        tagId: 130,
        tagName: "lithium",
      },
      {
        tagId: 183,
        tagName: "refinery",
      },
      {
        tagId: 127,
        tagName: "biofuel",
      },
      {
        tagId: 164,
        tagName: "lubricants",
      },
      {
        tagId: 201,
        tagName: "coolant",
      },
    ],
  },
  {
    categoryId: 5,
    categoryName: "Sub Area",
    categoryColor: "#0e8a16",
    tags: [
      {
        tagId: 128,
        tagName: "sustainable_avaition_fuel",
      },
      {
        tagId: 165,
        tagName: "synthetic_lubricant",
      },
    ],
  },
  {
    categoryId: 6,
    categoryName: "Source of infromation",
    categoryColor: "#fbca04",
    tags: [
      {
        tagId: 166,
        tagName: "open_domain",
      },
      {
        tagId: 122,
        tagName: "india_today",
      },
      {
        tagId: 124,
        tagName: "the_hindu",
      },
    ],
  },
  {
    categoryId: 9,
    categoryName: "Organization Size",
    categoryColor: "#232345",
    tags: [
      {
        tagId: 282,
        tagName: "small",
      },
    ],
  },
];

const optionsList: any[] = [
  {
    categoryId: 4,
    tagId: 127,
    categoryColor: "#d93f0b",
    tagName: "biofuel",
    categoryName: "Area",
  },
  {
    categoryId: 4,
    tagId: 201,
    categoryColor: "#d93f0b",
    tagName: "coolant",
    categoryName: "Area",
  },
  {
    categoryId: 4,
    tagId: 130,
    categoryColor: "#d93f0b",
    tagName: "lithium",
    categoryName: "Area",
  },
  {
    categoryId: 4,
    tagId: 164,
    categoryColor: "#d93f0b",
    tagName: "lubricants",
    categoryName: "Area",
  },
  {
    categoryId: 4,
    tagId: 183,
    categoryColor: "#d93f0b",
    tagName: "refinery",
    categoryName: "Area",
  },
  {
    categoryId: 8,
    tagId: 163,
    categoryColor: "#215cea",
    tagName: "cooling",
    categoryName: "Keyword",
  },
  {
    categoryId: 8,
    tagId: 162,
    categoryColor: "#215cea",
    tagName: "data_center",
    categoryName: "Keyword",
  },
  {
    categoryId: 8,
    tagId: 182,
    categoryColor: "#215cea",
    tagName: "desalination",
    categoryName: "Keyword",
  },
  {
    categoryId: 8,
    tagId: 125,
    categoryColor: "#215cea",
    tagName: "global_warming",
    categoryName: "Keyword",
  },
  {
    categoryId: 3,
    tagId: 301,
    categoryColor: "#b60205",
    tagName: "africa",
    categoryName: "Organization Country",
  },
  {
    categoryId: 3,
    tagId: 181,
    categoryColor: "#b60205",
    tagName: "america",
    categoryName: "Organization Country",
  },
  {
    categoryId: 3,
    tagId: 321,
    categoryColor: "#b60205",
    tagName: "germany",
    categoryName: "Organization Country",
  },
  {
    categoryId: 3,
    tagId: 121,
    categoryColor: "#b60205",
    tagName: "india",
    categoryName: "Organization Country",
  },
  {
    categoryId: 3,
    tagId: 241,
    categoryColor: "#b60205",
    tagName: "nepal",
    categoryName: "Organization Country",
  },
  {
    categoryId: 3,
    tagId: 281,
    categoryColor: "#b60205",
    tagName: "west_indies",
    categoryName: "Organization Country",
  },
  {
    categoryId: 2,
    tagId: 208,
    categoryColor: "#008672",
    tagName: "acer",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 209,
    categoryColor: "#008672",
    tagName: "apple",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 205,
    categoryColor: "#008672",
    tagName: "godrej",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 221,
    categoryColor: "#008672",
    tagName: "google",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 207,
    categoryColor: "#008672",
    tagName: "hp",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 202,
    categoryColor: "#008672",
    tagName: "iocl",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 322,
    categoryColor: "#008672",
    tagName: "nielson",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 203,
    categoryColor: "#008672",
    tagName: "ongc",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 206,
    categoryColor: "#008672",
    tagName: "orient",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 261,
    categoryColor: "#008672",
    tagName: "philips",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 129,
    categoryColor: "#008672",
    tagName: "reliance",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 262,
    categoryColor: "#008672",
    tagName: "tcs",
    categoryName: "Organization Name",
  },
  {
    categoryId: 2,
    tagId: 204,
    categoryColor: "#008672",
    tagName: "voltas",
    categoryName: "Organization Name",
  },
  {
    categoryId: 9,
    tagId: 282,
    categoryColor: "#232345",
    tagName: "small",
    categoryName: "Organization Size",
  },
  {
    categoryId: 1,
    tagId: 101,
    categoryColor: "#7057ff",
    tagName: "alternative_energy",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 2,
    categoryColor: "#7057ff",
    tagName: "analytical_department",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 102,
    categoryColor: "#7057ff",
    tagName: "applied_metallurgy",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 126,
    categoryColor: "#7057ff",
    tagName: "hse",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 5,
    categoryColor: "#7057ff",
    tagName: "human_resources",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 103,
    categoryColor: "#7057ff",
    tagName: "hydrotreating",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 1,
    categoryColor: "#7057ff",
    tagName: "information_systems",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 161,
    categoryColor: "#7057ff",
    tagName: "lubricants",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 107,
    categoryColor: "#7057ff",
    tagName: "nanotechnology",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 104,
    categoryColor: "#7057ff",
    tagName: "seperation_process",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 1,
    tagId: 100,
    categoryColor: "#7057ff",
    tagName: "technology_prediction_and_forecasting",
    categoryName: "RND Domain Name",
  },
  {
    categoryId: 6,
    tagId: 122,
    categoryColor: "#fbca04",
    tagName: "india_today",
    categoryName: "Source of infromation",
  },
  {
    categoryId: 6,
    tagId: 166,
    categoryColor: "#fbca04",
    tagName: "open_domain",
    categoryName: "Source of infromation",
  },
  {
    categoryId: 6,
    tagId: 124,
    categoryColor: "#fbca04",
    tagName: "the_hindu",
    categoryName: "Source of infromation",
  },
  {
    categoryId: 7,
    tagId: 167,
    categoryColor: "#fec1c1",
    tagName: "current",
    categoryName: "Status of technology",
  },
  {
    categoryId: 7,
    tagId: 123,
    categoryColor: "#fec1c1",
    tagName: "upcoming",
    categoryName: "Status of technology",
  },
  {
    categoryId: 5,
    tagId: 128,
    categoryColor: "#0e8a16",
    tagName: "sustainable_avaition_fuel",
    categoryName: "Sub Area",
  },
  {
    categoryId: 5,
    tagId: 165,
    categoryColor: "#0e8a16",
    tagName: "synthetic_lubricant",
    categoryName: "Sub Area",
  },
];
