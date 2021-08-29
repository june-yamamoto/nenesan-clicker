export type BuildItemType = {
    id: string;
    name: string;
    basePrice: number;
    baseNenesanPerSeconds: number;
    itemHas?: number;
};

const PRICE_INCREASE_MAG = 1.12;

export class BuildItem {
    id: string;
    /** アイテム名 */
    name: string;
    /** アイテムの基底価格 */
    basePrice: number;
    /** アイテムの所持数 */
    itemHas: number;
    /** 秒間何ねねさん？ */
    baseNenesanPerSeconds: number;

    constructor(props: BuildItemType) {
        this.id = props.id;
        this.name = props.name;
        this.basePrice = props.basePrice;
        this.baseNenesanPerSeconds = props.baseNenesanPerSeconds;
        this.itemHas = props.itemHas || 0;
    }

    purchase(): void {
        this.itemHas += 1;
    }

    get currentNenesanPerSeconds(): number {
        return this.baseNenesanPerSeconds;
    }

    get currentPrice(): number {
        return Math.ceil(this.basePrice * (PRICE_INCREASE_MAG ** this.itemHas));
    }
}

export const DefaultBuildItems: BuildItemType[] = [{
    id: 'komine',
    name: 'こみねえ',
    basePrice: 20,
    baseNenesanPerSeconds: 0.1,
},{
    id: 'amami',
    name: 'あまみ',
    basePrice: 150,
    baseNenesanPerSeconds: 2,
}, {
    id: 'miyahara',
    name: 'さっぴ',
    basePrice: 1000,
    baseNenesanPerSeconds: 15,
}, {
    id: 'suzushiro',
    name: 'おさゆ',
    basePrice: 10000,
    baseNenesanPerSeconds: 200,
}]