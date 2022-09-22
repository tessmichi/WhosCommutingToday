import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as db from "../lib/azure-cosmosdb-mongodb";
import * as utils from "../lib/utils";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let response = null;

  try {
    context.log("HTTP trigger function processed a request.");

    await db.init();

    if (req?.body) {
      const data = req.body;

      if (typeof data.name !== "string" || 
          typeof data.startDate !== "string" ||
          typeof data.endDate !== "string") {
        throw Error("Invalid document");
      }

      const item = await db.addItem(req.body);
      response = utils.formatResult(item);
    } else {
      throw Error("Invalid document");
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
