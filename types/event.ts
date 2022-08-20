export interface IEvent{
    _id: string;
    date: string;
    amount: number;
    imageName: string;
}

export interface ModifiedEvent extends IEvent{
    minAmount: number,
    daysFromPrev: number
}