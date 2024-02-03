abstract class AbstractAstralObjectFactory {
  public abstract factoryMethod(
    row: number,
    column: number,
    spec: string
  ): TAstralObject;
}

export class AstralObjectFactory implements AbstractAstralObjectFactory {
  public factoryMethod(
    row: number,
    column: number,
    spec: string
  ): TAstralObject {
    if (Polyanet.isPolyanet(spec)) {
      return new Polyanet(row, column);
    }

    if (Cometh.isCometh(spec)) {
      return new Cometh(row, column, spec);
    }

    if (Soloon.isSoloons(spec)) {
      return new Soloon(row, column, spec);
    }
    return new Space(row, column);
  }
}

export type TAstralObject = Polyanet | Cometh | Soloon | Space;

export enum AstralObjectType {
  Space = "space",
  Polyanets = "polyanets",
  Soloons = "soloons",
  Cometh = "comeths",
}

interface IAstralObject {
  row: number;
  column: number;
  type: AstralObjectType;
  buildCreateBody: (candidateId: string) => object;
}

class Space implements IAstralObject {
  row: number;
  column: number;
  type = AstralObjectType.Space;
  buildCreateBody = () => ({});

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
  static isSpace(spec: string) {
    return spec === "SPACE";
  }
}

export class Polyanet implements IAstralObject {
  type = AstralObjectType.Polyanets;
  row: number;
  column: number;
  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
  buildCreateBody = (candidateId: string) => ({
    candidateId,
    row: this.row,
    column: this.column,
  });
  static isPolyanet(spec: string) {
    return spec === "POLYANET";
  }
}

class Soloon implements IAstralObject {
  type = AstralObjectType.Soloons;
  row: number;
  column: number;
  color: "blue" | "red" | "purple" | "white";

  constructor(row: number, column: number, spec: string) {
    this.row = row;
    this.column = column;
    const parts = spec.split("_");
    if (parts.length !== 2) {
      throw new Error(`Invalid spec ${spec}`);
    }
    const color1 = parts[0].toLowerCase();
    this.color =
      color1 === "blue"
        ? "blue"
        : color1 === "red"
        ? "red"
        : color1 === "purple"
        ? "purple"
        : "white";
  }
  buildCreateBody = (candidateId: string) => ({
    candidateId,
    row: this.row,
    column: this.column,
    color: this.color,
  });

  static isSoloons(spec: string) {
    return spec.indexOf("SOLOON") >= 0;
  }
}

class Cometh implements IAstralObject {
  type = AstralObjectType.Cometh;
  row: number;
  column: number;
  direction: "up" | "down" | "right" | "left";
  constructor(row: number, column: number, spec: string) {
    this.row = row;
    this.column = column;
    const parts = spec.split("_");
    const dir = parts[0].toLowerCase();
    this.direction =
      dir === "up"
        ? "up"
        : dir === "left"
        ? "left"
        : dir === "down"
        ? "down"
        : "right";
  }
  buildCreateBody = (candidateId: string) => ({
    candidateId,
    row: this.row,
    column: this.column,
    direction: this.direction,
  });
  static isCometh(spec: string) {
    return spec.indexOf("COMETH") >= 0;
  }
}

export interface IGoalData {
  goal: string[][];
}
