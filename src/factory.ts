import { AstralObjectType, IGoalData, TAstralObject } from "./types";

export class CrossmintAPI {
  baseUrl: string;
  candidateId: string;
  constructor(baseUrl: string, candidateId: string) {
    this.baseUrl = baseUrl;
    this.candidateId = candidateId;
  }

  async getGoal(): Promise<IGoalData> {
    return fetch(`${this.baseUrl}map/${this.candidateId}/goal`)
      .then((res) => res.json())
      .then((res) => res as IGoalData);
  }

  async createMultipleSpaceObject(objects: TAstralObject[]) {
    let astralPromises: (() => Promise<boolean>)[] = [];

    for (const obj of objects) {
      if (obj.type === AstralObjectType.Space) {
        continue;
      }

      astralPromises.push(async () => {
        try {
          const response = await fetch(`${this.baseUrl}${obj.type}`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(obj.buildCreateBody(this.candidateId)),
          });
          return response.ok;
        } catch (error) {
          console.error(error);
          return false;
        }
      });
    }

    return throttledPromises(astralPromises, 1000);
  }
}
