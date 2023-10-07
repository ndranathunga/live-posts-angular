export class Post {
  constructor(
    public title: string,
    public description: string,
    public imgUrl: string,
    public author: string,
    public datetimeCreated: Date,
    public noOfLikes: number
  ) {}
}
