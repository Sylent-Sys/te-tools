export default class BaseTest {
    dirname: string;
    constructor(dirname: string) {
        this.dirname = dirname;
    }
    async start() {
        throw new Error("Method not implemented.");
    }
} 