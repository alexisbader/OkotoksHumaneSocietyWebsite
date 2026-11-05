import { defineField, defineType } from "sanity";

export const jobPostingType = defineType({
  name: "jobPosting",
  title: "Job posting",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "employmentType",
      title: "Employment type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Volunteer", value: "volunteer" },
          { title: "Internship", value: "internship" },
        ],
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "postedAt",
      title: "Posted at",
      type: "datetime",
    }),
    defineField({
      name: "applicationEmail",
      title: "Application email",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [
    {
      title: "Posted date, newest",
      name: "postedAtDesc",
      by: [{ field: "postedAt", direction: "desc" }],
    },
  ],
});
