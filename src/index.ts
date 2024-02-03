import { CrossmintAPI } from "./factory";
import { ChallengeSolver } from "./challengeSolver";
import dotenv from "dotenv";

dotenv.config();

const baseURL = "https://challenge.crossmint.io/api/";

async function main() {
  const candidateId: string = process.env.CANDIDATE_ID || "";
  const fetcher = new CrossmintAPI(baseURL, candidateId);
  const solution = new ChallengeSolver(fetcher);

  const args = process.argv.slice(2);

  if (args.length === 0) {
    throw new Error("Parameter [challenge] is required. Should be 1 or 2");
  }
  try {
    switch (args[0]) {
      case "1": {
        await solution.challenge1();
        break;
      }
      case "2": {
        await solution.challenge2;
        break;
      }
      default:
        throw new Error("Parameter [challenge] is required. Should be 1 or 2");
    }
  } catch (error) {
    console.error(error);
  }
}
main();
