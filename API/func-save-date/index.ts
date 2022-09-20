import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as db from "../lib/azure-cosmosdb-mongodb";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let response = null;

  try {
    context.log("HTTP trigger function processed a request.");

    // create 1 db connection for all functions
    await db.init();

    if (req?.body?.document) {
      const insertOneResponse = await db.addItem(req.body.document);
      response = {
        documentResponse: insertOneResponse,
      };
    } else {
      throw Error("No document found");
    }

    context.res = {
      body: response,
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: "Unknown error",
    };

    if (err instanceof Error) {
      context.res.body = err.message;
    }
    context.log(`*** Error throw: ${context.res.body}`);
  }
};

export default httpTrigger;

/*
{
    "document": {
        "name": "Alex",
        "startDate": "2022-09-12",
        "endDate": "2022-09-14"
    }
}
*/
