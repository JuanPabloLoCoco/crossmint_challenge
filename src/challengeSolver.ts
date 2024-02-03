import { CrossmintAPI } from "./factory";
import { AstralObjectFactory, AstralObjectType, TAstralObject } from "./types";

export class ChallengeSolver {
  fetcher: CrossmintAPI;
  constructor(fetcher: CrossmintAPI) {
    this.fetcher = fetcher;
  }

  async solveGoal() {
    const goal = (await this.fetcher.getGoal()).goal;
    const factory = new AstralObjectFactory();
    const spaceObjects: TAstralObject[] = [];

    const ROWS = goal.length;
    const COLS = goal[0].length;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const newItem = factory.factoryMethod(row, col, goal[row][col]);
        if (newItem.type !== AstralObjectType.Space) {
          spaceObjects.push(newItem);
        }
      }
    }
    await this.fetcher.createMultipleSpaceObject(spaceObjects);
  }

  async challenge1() {
    console.log("Challenge 1");
    // Version 1
    // const spaceObjects: TAstralObject[] = [];
    // const N = 11;
    // const offset = 2;
    // for (let r = 0; r < N; r++) {
    //   if (r < offset || r > N - 1 - offset) {
    //     continue;
    //   }
    //   for (let c = 0; c < N; c++) {
    //     if (c === r || c === N - 1 - r) {
    //       spaceObjects.push(new Polyanet(r, c));
    //     }
    //   }
    // }

    // version 2
    await this.solveGoal();
  }

  async challenge2() {
    console.log("Challenge 2");
    await this.solveGoal();
  }
}
