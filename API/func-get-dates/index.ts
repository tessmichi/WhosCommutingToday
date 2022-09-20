import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as db from "../lib/azure-cosmosdb-mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  let response = null;

  try {
    context.log("HTTP trigger function processed a request.");

    // create 1 db connection for all functions
    await db.init();
      
    if (req?.body?.name) {
      const items = await db.findItems({
        name: req.body.name,
      })

      response = {
        documentResponse: items,
      };
    } else {
      throw Error("No name found");
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