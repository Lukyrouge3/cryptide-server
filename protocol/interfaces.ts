export class Message implements Serializable {
    type: string;
    data: any;

    constructor(type: string, data: any) {
        this.type = type;
        this.data = data;
    }

    public toString() {
        return JSON.stringify(this);
    }

    public static parse(str: string) {
        const msg = JSON.parse(str);
        return new Message(msg.type, msg.data);
    }
}

export interface Serializable {
    toString(): string;
}