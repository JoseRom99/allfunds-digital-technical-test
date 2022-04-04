export class News{
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public content: string,
        public author: string,
        public date: Date,
        public archiveDate: Date,
    ){}
}
