export class Character {
  constructor(
    public id: string,
    public name: string,
    public side: string,
    public force: {
      power: string;
      midichlorian: number;
    },
    public createdTimestamp: number,
    public description: string
  ) {}
}
