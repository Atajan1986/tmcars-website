const Airtable = require("airtable");

const base = new Airtable({
  apiKey: process.env.AIRTABLE_TOKEN,
}).base(process.env.AIRTABLE_BASE_ID);

exports.handler = async function () {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        maxRecords: 50,
        view: "Grid view",
      })
      .all();

    return {
      statusCode: 200,
      body: JSON.stringify({ records }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
