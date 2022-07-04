import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const token = process.env.NOTION_KEY || "";
const databaseId = process.env.DATABASE_ID || "";
const client = new Client({ auth: token });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!token || !databaseId) {
    res.status(500).send("Notion tokens not set");
    return;
  }

  console.log(req.body);
  const { name, phone, bloodGroup, lastDonated, address } = JSON.parse(
    req.body
  );

  const queryResult = await client.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Donor Name",
          rich_text: {
            equals: name,
          },
        },
        {
          property: "Blood Group",
          select: {
            equals: bloodGroup,
          },
        },
        {
          property: "Contact",
          phone_number: {
            equals: phone,
          },
        },
      ],
    },
  });

  if (queryResult.results.length > 0) {
    res.status(200).send({ message: "Already Registered" });
    return;
  }

  const response = await client.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      "Donor Name": {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      "Blood Group": {
        select: {
          name: bloodGroup,
        },
      },
      Contact: {
        phone_number: phone,
      },
      Address: {
        rich_text: [
          {
            type: "text",
            text: {
              content: address,
            },
          },
        ],
      },
      ...(lastDonated
        ? {
            "Last Donated": {
              date: {
                start: lastDonated || "",
              },
            },
          }
        : {}),
    },
  });
  if (response.object === "page") {
    res.status(200).json({
      status: "success",
    });
  } else {
    res.status(500).json(response);
  }
};

export default handler;
