import { AzureFunction, Context } from "@azure/functions";
import * as db from "../lib/azure-cosmosdb-mongodb";

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  try {
    context.log("HTTP trigger function processed a request.");

    // create 1 db connection for all functions
    await db.init();
    await db.clearItems();
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) {
      message = err.message;
    }
    context.log(`*** Error throw: ${message}`);
  }
};

export default timerTrigger;
